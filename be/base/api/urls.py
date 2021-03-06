from django.db import router
from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register('get-related/<str:pk>/', views.getRelatedVideos)

urlpatterns=[
    path('', include(router.urls)),
    path('', views.getRoutes),
    path('get-related/<str:pk>/', views.getRelatedVideos.as_view(), name='get-related'),
    path('list-videos/', views.getVideos, name='list-videos'),
    path('genres/', views.getGenres, name='genres'),
    path('list-videos/<str:pk>/', views.getVideo, name='video'),
    path('search-video/', views.getSearchVideos.as_view({'get': 'list'}), name='search-video'),
    path('list-subcriber/<str:pk>/', views.getSubcriber, name='list-subcriber'),
    path('get-comments/<str:pk>', views.getComment, name='get-comments'),
    path('get-rep-comments/<str:pk>', views.getRepComment, name='rep-comments'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
