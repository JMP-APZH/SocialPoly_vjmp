import tweepy
from django.conf import settings
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from twitter.serializers import TwitterSerializer
from twitter.models import Tweet
from django.contrib.auth import get_user_model


User = get_user_model()


class CreateTweet(GenericAPIView):
    serializer_class = TwitterSerializer
    queryset = Tweet.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=self.request.user)

        auth = tweepy.OAuthHandler(settings.API_KEY, settings.API_KEY_SECRET)
        auth.set_access_token(settings.ACCESS_TOKEN, settings.ACCESS_TOKEN_SECRET)
        api = tweepy.API(auth)

        try:
            api.verify_credentials()
            api.update_status(request.data['content'])
        except:
            return Response({'message': 'Error while posting tweet.'})
        return Response(serializer.data)


class GetFollowers(APIView):
    def get(self, request):
        auth = tweepy.OAuthHandler(settings.API_KEY, settings.API_KEY_SECRET)
        auth.set_access_token(settings.ACCESS_TOKEN, settings.ACCESS_TOKEN_SECRET)
        api = tweepy.API(auth)

        try:
            api.verify_credentials()
            my_followers = api.get_followers()
            print(my_followers)
            return Response({'message': 'Success'})
        except:
            return Response({'message': 'Error during auth'})