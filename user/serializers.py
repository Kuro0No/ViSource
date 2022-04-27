from rest_framework.serializers import ModelSerializer
from rest_framework import serializers as serializersCore
from base.api import serializers as serializersBase
from base.models import ViSource
from .models import  SavedVideoModel, User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError



class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=[
            "name",
            "avatar",
            'id',
            # 'subcriber'
        ]
class VideosSavedSerializer(ModelSerializer):
    author =  UserSerializer(read_only=False)
    class Meta:
        model= ViSource
        fields = ['title','video','image','description','created','author','uuid']


class RegisterUserSerializer(serializersCore.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializersCore.EmailField(required=True)
    name = serializersCore.CharField(required=True)
    password = serializersCore.CharField(min_length=8)

    class Meta:
        model = User
        fields = ('email', 'name', 'password',)
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class ChangePasswordSerializer(serializersCore.ModelSerializer):
    password = serializersCore.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializersCore.CharField(write_only=True, required=True)
    old_password = serializersCore.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializersCore.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):

        user = self.context['request'].user
        if not user.check_password(value):
            raise serializersCore.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        user = self.context['request'].user
    
        if user.id != instance.pk:
            raise serializersCore.ValidationError({"authorize": "You dont have permission for this user."})
        instance.set_password(validated_data['password'])
        instance.save()

        return instance

class UpdateNameUserSerializer(serializersCore.ModelSerializer):
    # email = serializersCore.EmailField(required=True)
    password = serializersCore.CharField(write_only=True, required=True, validators=[validate_password])


    class Meta:
        model = User
        fields = ('name','password')
        extra_kwargs = {'password': {'required': True}}
        
   

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.id != instance.pk:
            raise serializersCore.ValidationError({"authorize": "You dont have permission for this user."})
       
        # instance.password = validated_data['password']
        instance.name = validated_data['name']  
        if instance.check_password(validated_data['password']):
            instance.save()
        else:
            raise serializersCore.ValidationError({"authorize": "password is not correct"})
        return instance



class UpdateAvatarUserSerializer(serializersCore.ModelSerializer):
    class Meta:
        model = User
        fields = ['avatar']

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.id != instance.pk:
            raise serializersCore.ValidationError({"authorize": "You dont have permission for this user."})
        instance.avatar = validated_data['avatar']  
        if validated_data:
            instance.save()    
        return instance


class SavedVideoSerializer(ModelSerializer):
    user = UserSerializer(read_only=False)
    saved = VideosSavedSerializer(read_only=False)
    
    class Meta:
        model = SavedVideoModel
        fields = '__all__'
    

class YourVideoSerializer(ModelSerializer):
    author = UserSerializer(read_only=False)

    
    class Meta:
        model = ViSource
        fields = '__all__'
    