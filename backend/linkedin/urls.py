from django.urls import path
from .views import LinkedinAuth

urlpatterns = [
    path('auth/', LinkedinAuth.as_view()),
]