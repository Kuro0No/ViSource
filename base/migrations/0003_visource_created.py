# Generated by Django 4.0.3 on 2022-04-08 07:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_visource_uuid_alter_visource_video'),
    ]

    operations = [
        migrations.AddField(
            model_name='visource',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
