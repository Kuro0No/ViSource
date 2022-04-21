from curses.ascii import US
from dataclasses import field
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password


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
