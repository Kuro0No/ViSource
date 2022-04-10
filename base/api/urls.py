from django.urls import path,include
from . import views

urlpatterns=[
    path('', views.getRoutes),
    path('list-videos/', views.getVideos, name='list-videos'),
    path('list-videos/<str:pk>/', views.getVideo, name='video'),

    path('get-comments/<str:pk>', views.getComment, name='get-comments'),
    path('get-rep-comments/<str:pk>', views.getRepComment, name='rep-comments'),
]
