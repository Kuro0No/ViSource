from dataclasses import field
from pyexpat import model

from pkg_resources import require
from rest_framework.serializers import ModelSerializer,SerializerMethodField
from rest_framework import serializers 

from base.models import RepComment, ViSource, Comment
from user.serializers import UserSerializer
from rest_framework import viewsets


class VideosListSerializer(ModelSerializer):
    # author =  UserSerializer(read_only=False)
    # title = serializers.CharField(max_length=100 , )
    # # video= serializers.FileField(upload_to='videos/', null=True)
    # # image = serializers.FileField(upload_to='images/',null=True)
    # description = serializers.CharField(allow_null=True, allow_blank=True)
    # created = serializers.DateTimeField(read_only=True)
   
    MY_CHOICES = [
       ('Music', 'Music'),
        ('Animation', 'Animation film'),
        ('Nature', 'Nature'),   
        ('VideoGame', 'Video Game')
    ]
    # category = MultiSelectField(choices=MY_CHOICES, null=True)
    class Meta:
        model= ViSource
        fields = '__all__'

    

        
class CommentsListSerializer(ModelSerializer):
    user = UserSerializer(read_only=False)
    count_rep_comments = SerializerMethodField()

    class Meta:
        model= Comment
        fields = '__all__'

    
    def get_count_rep_comments(self, obj):
            count_rep_comment = RepComment.objects.filter(comment_id=obj.id)
            total = len(count_rep_comment)
            return total
        
class RepCommentListSerializer(ModelSerializer, viewsets.ModelViewSet):
    user = UserSerializer(read_only=False)
    class Meta:
        model= RepComment
        fields = '__all__'
    

# class RelatedVideoSerializer(ModelSerializer):
#     class Meta: 
#         model= RelatedVideo
#         fields = '__all__'

