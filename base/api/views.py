from os import access
from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.api.serializers import CommentsListSerializer, RepCommentListSerializer, VideosListSerializer
from rest_framework_simplejwt.tokens import RefreshToken


from base.models import ViSource,Comment,RepComment


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# class TokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         # token = super().get_token(user)

#         # Add custom claims
#         # token['name'] = user.name
#         # token['email'] = user
#         # print(user)
#         # ...

#         return RefreshToken.for_user(user)

#     def validate(self,attrs):
#         data=super().validate(attrs)
#         refresh = self.get_token(self.user)
#         data['refresh'] = str(refresh)
#         data['access'] = str(refresh.access_token)

#         return data

# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)
#         refresh = self.get_token(self.user)
#         data['refresh'] = str(refresh)
#         data['access'] = str(refresh.access_token)

#         # Add extra responses here
#         data['name'] = self.user.name
#         # data['avatar'] = self.user.avatar
#         return data


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
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
            'Endpoint': '/video-list/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of videos'
        },
        {
            'Endpoint': '/video-list/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single videos object'
        },
        {
            'Endpoint': '/video-list/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new videos with data sent in post request'
        },
        {
            'Endpoint': '/video-list/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing videos with data sent in post request'
        },
        {
            'Endpoint': '/video-list/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting videos'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getVideos(request):
    if request.method == "GET":
        videosList = ViSource.objects.all()
        serializers = VideosListSerializer(videosList, many=True)
        return Response(serializers.data)

@api_view(['GET'])
def getVideo(request,pk):
    if request.method == "GET":
        videos = ViSource.objects.get(uuid=pk)
        serializers = VideosListSerializer(videos, many=False)
        return Response(serializers.data)


@api_view(['GET'])
def getComment(request,pk):
    if request.method == "GET":
        comment = Comment.objects.filter(post_id=pk)
        serializers = CommentsListSerializer(comment, many=True)
        return Response(serializers.data)


@api_view(['GET'])
def getRepComment(request,pk):
    if request.method == "GET":
        comment = RepComment.objects.filter(comment_id=pk)
        serializers = RepCommentListSerializer(comment, many=True)
        return Response(serializers.data)



