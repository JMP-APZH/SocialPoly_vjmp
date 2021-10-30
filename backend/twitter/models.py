from django.db import models
from user.models import User


class Tweet(models.Model):
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='tweets')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    send_time = models.DateTimeField(blank=True, null=True)
