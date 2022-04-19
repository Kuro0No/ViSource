from distutils.log import error
from email.policy import default
from enum import unique
from pyexpat import model
from django.db import models
import uuid
from multiselectfield import MultiSelectField
from django.contrib.auth.models import AbstractUser
from user.models import User
from django import forms
# from ..user.models import User

# Create your models here.



# class User(AbstractUser):
#     name = models.CharField(max_length=200, null=True)
#     email = models.EmailField(unique=True, null=True)
#     bio = models.TextField(null=True)

#     avatar = models.ImageField(null=True, default="avatar.svg")

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []



class ViSource(models.Model):
    
    title = models.CharField(max_length=100)
    video= models.FileField(upload_to='videos/', null=True)
    image = models.FileField(upload_to='images/',null=True)
    description = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add = True, null=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    uuid = models.UUIDField(primary_key = True, default =uuid.uuid4, unique=True, editable=False )
    
    MY_CHOICES = [
       ('Music', 'Music'),
        ('Animation', 'Animation film'),
        ('Nature', 'Nature'),   
    ]
    category = MultiSelectField(choices=MY_CHOICES, null=True)

        

    def __str__(self):
        return f"{self.title[0:10]} "



class Sector(models.Model):
    name= models.CharField(max_length=255)
    sector_uuid = models.UUIDField(default=uuid.uuid4, unique=True)
    ralated_video = models.ManyToManyField('ViSource')
    sector_image = models.ImageField(upload_to='sector_image', null=True,blank=True)
    
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    post_id =models.ForeignKey(ViSource, on_delete=models.CASCADE,null=True)
    content = models.TextField(null=True )
    image=models.ImageField(null=True,blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:   
        ordering = ['-created']

    def __str__(self):
        return self.content[0:50]
    
    


class RepComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True)
    comment_id =models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)
    content = models.TextField(null=True, blank=True)
    image=models.ImageField(null=True,blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)


    # class Meta:
    #     ordering = ['-updated', '-created']

    def __str__(self):
        return f'Reply to: {self.comment_id}'