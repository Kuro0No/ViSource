import re
from base.models import ViSource
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user.models import  SavedVideoModel, User
from user.pagination import CustomYourVideoPageNumberPagination
from .serializers import ChangePasswordSerializer, RegisterUserSerializer, SavedVideoSerializer, UpdateNameUserSerializer,UpdateAvatarUserSerializer, YourVideoSerializer  
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework.decorators import api_view,permission_classes,authentication_classes



class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)




class ChangePasswordView(generics.UpdateAPIView):
    # permission_classes = (IsAuthenticated,)
    authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer



class UpdateNameProfileView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [JWTAuthentication]

    queryset = User.objects.all()
    serializer_class = UpdateNameUserSerializer


class UpdateAvatarProfileView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [JWTAuthentication]

    queryset = User.objects.all()
    serializer_class = UpdateAvatarUserSerializer

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
@authentication_classes( [JWTAuthentication])
def savedVideo(request,pk):
    data = request.data
    if request.user.id == pk:
        if request.method =='GET':
            saved = SavedVideoModel.objects.filter(user=request.user)
            serializer = SavedVideoSerializer(saved, many=True)
            return Response(serializer.data)
        if request.method =='POST':
            saved = SavedVideoModel.objects.create(
                user = User.objects.get(id=int(data['user']['user_id'])),
                saved =  ViSource.objects.get(uuid=data['saved']['uuid'])
            )
            return Response('Success')
    else:
        return Response({"authorize": "You dont have permission for this user."})


@api_view(['GET','DELETE'])
def getYourVideo(request,pk):
    if request.method =='GET':
        paginator = CustomYourVideoPageNumberPagination()
        paginator.page_size = 10
        yourVideos = ViSource.objects.filter(author=pk)
        result_page = paginator.paginate_queryset(yourVideos, request)
        serializers = YourVideoSerializer(yourVideos, many=True)
       
        return paginator.get_paginated_response(serializers.data)
    

   
    

