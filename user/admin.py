from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('email','id','name','is_active', 'is_staff', 'is_superuser')
    readonly_fields = ['last_login', 'id','subcriber' ]

admin.site.register(User,UserAdmin)