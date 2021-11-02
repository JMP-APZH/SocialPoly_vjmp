import tweepy
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from rest_framework.generics import GenericAPIView, ListCreateAPIView, ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from twitter.serializers import TwitterSerializer
from twitter.models import Tweet
from django.contrib.auth import get_user_model
import json
from apscheduler.schedulers.background import BackgroundScheduler


User = get_user_model()


class CreateTweetOnTime(GenericAPIView):
    serializer_class = TwitterSerializer
    queryset = Tweet.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=self.request.user)
        # access_token = self.request.user.twitter_access_token
        # access_token_secret = self.request.user.twitter_access_token_secret

        auth = tweepy.OAuthHandler(settings.API_KEY, settings.API_KEY_SECRET)
        auth.set_access_token(settings.ACCESS_TOKEN, settings.ACCESS_TOKEN_SECRET)
        # auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth)
        api.verify_credentials()
        tweet = request.data['content']
        if request.data['send_time'] != "" and 'images' in request.data.keys():
            def publish_tweet(text, image):
                api.update_status(text, media_ids=[image.media_id])

            trigger = request.data['send_time']

            file = request.FILES['images']
            fs = FileSystemStorage()
            filename = fs.save(file.name, file)
            uploaded_file_path = fs.path(filename)

            media = api.media_upload(uploaded_file_path)

            scheduler = BackgroundScheduler()
            scheduler.add_job(publish_tweet, 'date', run_date=trigger, id="tweet", args=[tweet, media],
                              replace_existing=True)
            scheduler.start()
        elif request.data['send_time'] != "" and 'images' not in request.data.keys():
            def publish_tweet(text):
                api.update_status(text)

            trigger = request.data['send_time']
            scheduler = BackgroundScheduler()
            scheduler.add_job(publish_tweet, 'date', run_date=trigger, id="tweet", args=[tweet],
                              replace_existing=True)
            scheduler.start()
        elif request.data['send_time'] == "" and 'images' in request.data.keys():
            file = request.FILES['images']
            fs = FileSystemStorage()
            filename = fs.save(file.name, file)
            uploaded_file_path = fs.path(filename)

            media = api.media_upload(uploaded_file_path)
            api.update_status(tweet, media_ids=[media.media_id])
        else:
            api.update_status(tweet)
        return Response(serializer.data)


class SearchTweetView(ListCreateAPIView):
    serializer_class = TwitterSerializer
    queryset = Tweet.objects.all()

    def get_queryset(self):
        search = self.request.query_params.get('search')
        if search:
            return Tweet.objects.filter(content__contains=search)
        return Tweet.objects.all()


class GetFollowers(APIView):
    def get(self, request):
        auth = tweepy.OAuthHandler(settings.API_KEY, settings.API_KEY_SECRET)
        auth.set_access_token(settings.ACCESS_TOKEN, settings.ACCESS_TOKEN_SECRET)
        api = tweepy.API(auth)

        try:

            api.verify_credentials()
            my_followers = api.get_followers()
            parsed_followers = []
            for follower in my_followers:
                json_str = json.dumps(follower._json)
                parsed = json.loads(json_str)
                parsed_followers.append(parsed)
            return Response({'followers': parsed_followers})
        except:
            return Response({'message': 'Error during auth'})


class GetMyTweets(APIView):
    def get(self, request):
        auth = tweepy.OAuthHandler(settings.API_KEY, settings.API_KEY_SECRET)
        auth.set_access_token(settings.ACCESS_TOKEN, settings.ACCESS_TOKEN_SECRET)
        api = tweepy.API(auth)

        try:

            api.verify_credentials()
            cursor = tweepy.Cursor(api.user_timeline, tweet_mode="extended").items()
            tweets = []
            for tweet in cursor:
                json_str = json.dumps(tweet._json)
                parsed = json.loads(json_str)
                tweets.append(parsed)
            return Response({'tweets': tweets})
        except:
            return Response({'message': 'Error during auth'})


class GetAllTweets(ListAPIView):
    serializer_class = TwitterSerializer
    queryset = Tweet.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
