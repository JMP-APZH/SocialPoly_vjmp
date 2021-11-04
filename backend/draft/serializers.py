from rest_framework import serializers

from draft.models import Draft

class DraftSerializer(serializers.ModelSerializer):

    class Meta:
        model = Draft
        fields = ['id', 'title', 'content', 'created', 'updated', 'author', 'image']
        read_only_fields = ['author']