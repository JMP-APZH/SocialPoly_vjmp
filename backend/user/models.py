from django.contrib.auth.models import AbstractUser
from django.db import models


def user_directory_path(instance, filename):
    return f'user/{instance.id}/{filename}'


class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    first_name = models.CharField(max_length=50, blank=False, null=False)
    last_name = models.CharField(max_length=50, blank=False, null=False)
    phone = models.CharField(max_length=50, blank=False, null=False)
    interests = models.TextField(blank=True, null=True)
    description = models.TextField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to=user_directory_path, blank=True, null=True)
    location = models.CharField(max_length=50, blank=True, null=True)
    about_me = models.CharField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return self.email
