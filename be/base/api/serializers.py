from rest_framework.serializers import ModelSerializer,SerializerMethodField
from rest_framework import serializers 
from base.models import RepComment, ViSource, Comment, CategoryModel
from user.serializers import UserSerializer
from rest_framework import viewsets

class CategorySerializer(ModelSerializer):
    

    class Meta:
        model= CategoryModel
        fields =['id', 'genres']

class VideosListSerializer(ModelSerializer):
    author =  UserSerializer(read_only=False)
    # genres= serializers.StringRelatedField(many=True)
    genres = CategorySerializer(read_only=True, many=True)
    # genres =serializers.PrimaryKeyRelatedField(many=True, read_only=True)
   
    class Meta:
        model= ViSource
        fields = '__all__'
        
       
class SearchVideoSerializer(ModelSerializer):
    author =  UserSerializer(read_only=False)
    # genres= serializers.StringRelatedField(many=True)
    genres = CategorySerializer(read_only=True, many=True)

   
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

