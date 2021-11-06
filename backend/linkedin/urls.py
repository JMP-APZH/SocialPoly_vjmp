from django.urls import path
from .views import LinkedinAuth, LinkedinPost, ListLinkedinPosts

urlpatterns = [
    path('auth/', LinkedinAuth.as_view()),
    path('posts/', LinkedinPost.as_view()),
    path('postslist/', ListLinkedinPosts.as_view()),
]