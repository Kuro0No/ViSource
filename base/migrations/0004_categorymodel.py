# Generated by Django 4.0.4 on 2022-04-28 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_delete_categorymodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categories', models.TextField(null=True)),
            ],
        ),
    ]
