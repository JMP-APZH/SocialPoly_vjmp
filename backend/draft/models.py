from django.db import models
from user.models import User


class Draft(models.Model):
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField()
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='drafts')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(blank=True)

    def __str__(self):
        return f'Id {self.id} -- ' \
               f'{self.title}'