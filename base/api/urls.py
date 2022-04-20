from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView


urlpatterns=[
    path('', views.getRoutes),
    path('list-videos/', views.getVideos, name='list-videos'),
    path('list-videos/<str:pk>/', views.getVideo, name='video'),
    path('list-subcriber/<str:pk>/', views.getSubcriber, name='list-subcriber'),

    path('get-comments/<str:pk>', views.getComment, name='get-comments'),
    path('get-rep-comments/<str:pk>', views.getRepComment, name='rep-comments'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
