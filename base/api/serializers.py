from dataclasses import field
from rest_framework.serializers import ModelSerializer

from base.models import ViSource, Comment



class VideosListSerializer(ModelSerializer):
    class Meta:
        model= ViSource
        fields = '__all__'
        
class CommentsListSerializer(ModelSerializer):
    class Meta:
        model= Comment
        fields = '__all__'
        
class RepCommentListSerializer(ModelSerializer):
    class Meta:
        model= Comment
        fields = '__all__'
        