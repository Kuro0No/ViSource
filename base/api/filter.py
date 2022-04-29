from base.models import ViSource
import django_filters

class SearchFilter(django_filters.FilterSet):
    class Meta:
        model = ViSource
        fields = ['genres',]
    
    def filter (self,qs,value):
        if not value:
            return qs

        values = value.split(',')
        for v in values:
            qs = qs.filter(genres=v)
        return qs
        