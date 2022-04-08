from dataclasses import field
from rest_framework.serializers import ModelSerializer

from base.models import ViSource



class VideosListSerializer(ModelSerializer):
    class Meta:
        model= ViSource
        fields = '__all__'
        
