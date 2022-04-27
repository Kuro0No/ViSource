from django.urls import path
from .views import ChangePasswordView, CustomUserCreate, BlacklistTokenUpdateView, UpdateNameProfileView,UpdateAvatarProfileView, getYourVideo, savedVideo

app_name = 'user'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('change_password/<int:pk>/', ChangePasswordView.as_view(), name='auth_change_password'),
    path('update_name/<int:pk>/', UpdateNameProfileView.as_view(), name='auth_update_profile'),
    path('update_avatar/<int:pk>/', UpdateAvatarProfileView.as_view(), name='auth_update_profile'),
    path('your-videos/<int:pk>/', getYourVideo, name='your-videoss'),
    path('saved-video/<int:pk>/', savedVideo, name='save-video'),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist')
    
]