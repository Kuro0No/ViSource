from dataclasses import field
from pyexpat import model
from rest_framework.serializers import ModelSerializer,SerializerMethodField

from base.models import RepComment, ViSource, Comment
from user.serializers import UserSerializer


class VideosListSerializer(ModelSerializer):
    author =  UserSerializer(read_only=False)
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
        
class RepCommentListSerializer(ModelSerializer):
    user = UserSerializer(read_only=False)
    class Meta:
        model= RepComment
        fields = '__all__'
    

# class RelatedVideoSerializer(ModelSerializer):
#     class Meta: 
#         model= RelatedVideo
#         fields = '__all__'

