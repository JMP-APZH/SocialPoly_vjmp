from django.urls import path
from .views import LinkedinAuth, LinkedinPost

urlpatterns = [
    path('auth/', LinkedinAuth.as_view()),
    path('posts/', LinkedinPost.as_view()),
    path('postslist/', LinkedinPost.as_view()),
]