from django.urls import path

from twitter.views import GetFollowers, GetAllTweets, GetMyTweets, CreateTweetOnTime, SearchTweetView

urlpatterns = [
    path('followers/', GetFollowers.as_view()),
    path('mytweets/', GetMyTweets.as_view()),
    path('tweets/', GetAllTweets.as_view()),
    path('send/', CreateTweetOnTime.as_view()),
    path('?search/<str:search_string>/', SearchTweetView.as_view())
]
