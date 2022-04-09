from django.contrib import admin
from django.db import models

from base.models import ViSource,Comment,RepComment

# Register your models here.

class VideoAdmin(admin.ModelAdmin):
    list_display = ('uuid','title','created', )
    list_filter = ['title']
    list_search = ['title']

admin.site.register(ViSource,VideoAdmin)


class CommentAdmin(admin.ModelAdmin):
    list_display = ('content','post_id')

admin.site.register(Comment,CommentAdmin)


class RepCommentAdmin(admin.ModelAdmin):
    list_display = ('content','comment_id')

admin.site.register(RepComment,RepCommentAdmin)