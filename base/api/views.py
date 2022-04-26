from os import access
import re
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.api.pagination import CustomPageNumberPagination
from base.api.serializers import CommentsListSerializer, RepCommentListSerializer, VideosListSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from base.models import  ViSource,Comment,RepComment
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from user.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        token['avatar'] = f'{user.avatar}'
        # token['subcriber'] = f'{user.subcriber}'

        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/list-videos/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of videos'
        },
        {
            'Endpoint': '/list-videos/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single videos object'
        },
        {
            'Endpoint': '/list-videos/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new videos with data sent in post request'
        },
        {
            'Endpoint': '/list-videos/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing videos with data sent in post request'
        },
        {
            'Endpoint': '/list-videos/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting videos'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getVideos(request):

    if request.method == "GET":
    #convert sang pagination
    #custom pagination
        paginator = CustomPageNumberPagination() #1
        #hoặc pagenation mặc định
        # paginator = PageNumberPagination() #1 ( dùng mặc định của djrestframework)

        paginator.page_size = 10 #2
        videosList = ViSource.objects.all()
        result_page = paginator.paginate_queryset(videosList, request) #3
        serializers = VideosListSerializer(videosList, many=True)
     
        return paginator.get_paginated_response(serializers.data) #4

@api_view(['GET', 'DELETE'])
def getVideo(request,pk):
    if request.method == "GET":
        videos = ViSource.objects.get(uuid=pk)
        serializers = VideosListSerializer(videos, many=False)
        return Response(serializers.data)
    
    if request.method == "DELETE":
        video = ViSource.objects.get(uuid=pk)
        video.delete()
        return Response('This video was deleted')


@api_view(['GET','POST','DELETE'])
def getComment(request,pk):
    if request.method == "GET":
        comment = Comment.objects.filter(post_id=pk)
        serializers = CommentsListSerializer(comment, many=True)
        return Response(serializers.data)
    
    if request.method == "POST":
        data = request.data
        comment = Comment.objects.create(
            
            content = data['content'],
            post_id = ViSource.objects.get(uuid=data['post_id']),
            user = User.objects.get(id=int(data['user']['id']))
        )

        serializers = CommentsListSerializer(comment, many=False)
        return Response(serializers.data)
    
    if request.method == "DELETE":
        
        comment = Comment.objects.get(id=pk)
        comment.delete()
        
        return Response('Comment was deleted')



@api_view(['GET','POST','DELETE'])
def getRepComment(request,pk):
    if request.method == "GET":
        comment = RepComment.objects.filter(comment_id=pk)
        serializers = RepCommentListSerializer(comment, many=True)
        return Response(serializers.data)
    if request.method == "POST":
        data = request.data
        rep_comment = RepComment.objects.create(
            
            content = data['content'],
            comment_id = Comment.objects.get(id=data['comment_id']),
            user = User.objects.get(id=int(data['user']['id']))
        )

        serializers = RepCommentListSerializer(rep_comment, many=False)
        return Response(serializers.data)
    
    if request.method == "DELETE":
        
        rep_comment = RepComment.objects.get(id=pk)
        rep_comment.delete()

        return Response('Rep Comment was deleted')


@api_view(['GET', 'POST'])
def getSubcriber(request,pk):
    if request.method =='GET':
        # subcriber = Subcribers.objects.get(id=pk)
        # serializers = SubcriberListSerializer(subcriber, many=True)
        # return Response(serializers.data)
        pass

    if request.method =='POST':
        data = request.data
        user = User.objects.get(id=pk)
        return Response(True)


@api_view(['GET'])
def getWatchedVideo(request,pk):
    if request.method =='GET':
        # subcriber = Subcribers.objects.get(id=pk)
        # serializers = SubcriberListSerializer(subcriber, many=True)
        # return Response(serializers.data)
        pass

    #   return Response(serializers.data)

class getSearchVideos(viewsets.ModelViewSet):
    queryset = ViSource.objects.all()
    serializer_class = VideosListSerializer
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,] #filters.BaseFilterBackend, filters.OrderingFilter,
    ordering = ('-created',)
    # filter_fields = ('title',)
    search_fields = ('title',)
    


    