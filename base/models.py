from email.policy import default
from django.db import models
import uuid
from multiselectfield import MultiSelectField


# Create your models here.

class ViSource(models.Model):
    
   
    
    
    title = models.CharField(max_length=100)
    video= models.FileField(upload_to='videos', null=True)
    image = models.FileField(upload_to='images',null=True)
    description = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add = True, null=True)
    # author = models.ForeignKey(on_delete=CASCADE)
    uuid = models.UUIDField(primary_key = True, default =uuid.uuid4, unique=True, editable=False )
    
    MY_CHOICES = (
       ('Music', 'Music'),
        ('Animation', 'Animation film'),
        ('Nature', 'Nature'),   
    )
    category = MultiSelectField(choices=MY_CHOICES)

        

    def __str__(self):
        return f"{self.title[0:10]} "
    
