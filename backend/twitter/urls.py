from django.urls import path

from twitter.views import CreateTweet, GetFollowers

urlpatterns = [
    path('send/', CreateTweet.as_view()),
    path('followers/', GetFollowers.as_view())
    ]
