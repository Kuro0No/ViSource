from base.models import ViSource
import django_filters

class VideoFilter(django_filters.FilterSet):
    class Meta:
        model = ViSource
        fields = ['genres',]