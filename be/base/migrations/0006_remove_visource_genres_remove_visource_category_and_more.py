# Generated by Django 4.0.4 on 2022-04-28 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_visource_genres_alter_categorymodel_categories'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='visource',
            name='genres',
        ),
        migrations.RemoveField(
            model_name='visource',
            name='category',
        ),
        migrations.AddField(
            model_name='visource',
            name='category',
            field=models.ManyToManyField(to='base.categorymodel'),
        ),
    ]