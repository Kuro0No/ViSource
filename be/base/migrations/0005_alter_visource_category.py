# Generated by Django 4.0.3 on 2022-04-08 08:03

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_visource_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visource',
            name='category',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, choices=[('1', 'one')], max_length=2, null=True), blank=True, null=True, size=None),
        ),
    ]