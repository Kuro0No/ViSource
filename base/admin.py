from django.contrib import admin
from django.db import models

from base.models import Sector, ViSource,Comment,RepComment

# Register your models here.

class VideoAdmin(admin.ModelAdmin):
    list_display = ('title','author','created','uuid', )
    list_filter = ['title']
    list_search = ['title']
    readonly_fields = ['uuid']


admin.site.register(ViSource,VideoAdmin)


class CommentAdmin(admin.ModelAdmin):
    list_display = ('content','user','post_id', 'id')
    list_filter = ['post_id']
    readonly_fields = ['id']


admin.site.register(Comment,CommentAdmin)


class RepCommentAdmin(admin.ModelAdmin):
    list_display = ('user','content','comment_id', 'id')
    readonly_fields = ['id']


admin.site.register(RepComment,RepCommentAdmin)

class SectorAdmin(admin.ModelAdmin):
    list_display = ['name']
    readonly_fields = ['sector_uuid']

admin.site.register(Sector,SectorAdmin)