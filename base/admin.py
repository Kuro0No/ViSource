from django.contrib import admin
from django.db import models

from base.models import ViSource

# Register your models here.

class VideoAdmin(admin.ModelAdmin):
    list_display = ('uuid','title','created', )
    list_filter = ['title']
    list_search = ['title']

admin.site.register(ViSource,VideoAdmin)