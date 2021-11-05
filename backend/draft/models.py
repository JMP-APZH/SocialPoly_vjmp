from django.db import models
from user.models import User


class Draft(models.Model):
    title = models.CharField(max_length=255, blank=True, required=False)
    content = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='drafts')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(blank=True)
    date_time = models.CharField(max_length=255, blank=True, null=True)
    is_twitter = models.BooleanField(blank=True)
    is_linkedin = models.BooleanField(blank=True)
    is_facebook = models.BooleanField(blank=True)
    is_tiktok = models.BooleanField(blank=True)
    is_instagram = models.BooleanField(blank=True)

    def __str__(self):
        return f'Id {self.id} -- ' \
               f'{self.title}'