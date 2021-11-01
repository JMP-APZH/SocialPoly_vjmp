from django.urls import path

from twitter.views import GetFollowers, GetAllTweets, CreateTweetWithImage, GetMyTweets, CreateTweetOnTime, SearchTweetView

urlpatterns = [
    path('send/image/', CreateTweetWithImage.as_view()),
    path('followers/', GetFollowers.as_view()),
    path('mytweets/', GetMyTweets.as_view()),
    path('tweets/', GetAllTweets.as_view()),
    path('send/', CreateTweetOnTime.as_view()),
    path('?search/<str:search_string>/', SearchTweetView.as_view())
]
