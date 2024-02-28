# Generated by Django 2.2.27 on 2022-08-17 10:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gear', '0023_merge_20220817_1005'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cameraassignedtoproject',
            name='camera_operator',
        ),
        migrations.AddField(
            model_name='cameraassignedtoproject',
            name='camera_operator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
