from curses.ascii import US
from dataclasses import field
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password

class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=[
            "name",
            "avatar",
            'id',
            # 'subcriber'
        ]


# class UserAuthSerializer(ModelSerializer):
#     courses=serializers.ListField(source='get_all_courses')
#     class Meta:
#         model=User
#         fields=[
#             'name',
#             'id',
#             'email',
            
#         ]


class RegisterUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8)

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

class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def validate_old_password(self, value):

        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Old password is not correct"})
        return value

    def update(self, instance, validated_data):
        user = self.context['request'].user
    
        if user.id != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})
        instance.set_password(validated_data['password'])
        instance.save()

        return instance

class UpdateNameUserSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])


    class Meta:
        model = User
        fields = ('name','password')
        extra_kwargs = {'password': {'required': True}}
        
   

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.id != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})
       
        # instance.password = validated_data['password']
        instance.name = validated_data['name']  
        if instance.check_password(validated_data['password']):
            instance.save()
        else:
            raise serializers.ValidationError({"authorize": "password is not correct"})
        return instance



class UpdateAvatarUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['avatar']

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.id != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})
        instance.avatar = validated_data['avatar']  
        if validated_data:
            instance.save()    
        return instance