from django.urls import path

from twitter.views import CreateTweet, GetFollowers, GetAllTweets

urlpatterns = [
    path('send/', CreateTweet.as_view()),
    path('followers/', GetFollowers.as_view()),
    path('tweets/', GetAllTweets.as_view())
    ]
