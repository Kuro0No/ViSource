from django.contrib import admin
from .models import SavedVideoModel, User

class UserAdmin(admin.ModelAdmin):
    list_display = ('email','id','name','is_active', 'is_staff', 'is_superuser')
    readonly_fields = ['last_login', 'id', ]

admin.site.register(User,UserAdmin)

class SavedVideoAdmin(admin.ModelAdmin):
    list_display = ('email','id','name','is_active', 'is_staff', 'is_superuser')
    readonly_fields = ['last_login', 'id', ]
admin.site.register(SavedVideoModel)

