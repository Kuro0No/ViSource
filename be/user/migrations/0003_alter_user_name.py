# Generated by Django 4.0.4 on 2022-04-18 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, default='https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg', max_length=225),
        ),
    ]
