from dataclasses import field
from pyexpat import model
from rest_framework.serializers import ModelSerializer

from base.models import RepComment, ViSource, Comment



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
        model= RepComment
        fields = '__all__'
    

# class RelatedVideoSerializer(ModelSerializer):
#     class Meta: 
#         model= RelatedVideo
#         fields = '__all__'
