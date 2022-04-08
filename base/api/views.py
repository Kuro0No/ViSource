from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.api.serializers import VideosListSerializer

from base.models import ViSource


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
        videosList = ViSource.objects.get(uuid=pk)
        serializers = VideosListSerializer(videosList, many=False)
        return Response(serializers.data)

