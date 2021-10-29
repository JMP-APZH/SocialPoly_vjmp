from rest_framework import serializers

from twitter.models import Tweet


class TwitterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tweet
        fields = ['id', 'title', 'content', 'created', 'updated', 'author', 'send_time']
        read_only_fields = ['author']
