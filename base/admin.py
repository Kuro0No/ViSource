from django.contrib import admin
from django.db import models

from base.models import Sector, ViSource,Comment,RepComment

# Register your models here.

class VideoAdmin(admin.ModelAdmin):
    list_display = ('title','created','uuid', )
    list_filter = ['title']
    list_search = ['title']
    readonly_fields = ['uuid']


admin.site.register(ViSource,VideoAdmin)


class CommentAdmin(admin.ModelAdmin):
    list_display = ('content','post_id', 'id')
    readonly_fields = ('post_id','id')


admin.site.register(Comment,CommentAdmin)


class RepCommentAdmin(admin.ModelAdmin):
    list_display = ('content','comment_id')
    readonly_fields = ('comment_id','id')


admin.site.register(RepComment,RepCommentAdmin)

class SectorAdmin(admin.ModelAdmin):
    list_display = ['name']
    readonly_fields = ['sector_uuid']

admin.site.register(Sector,SectorAdmin)