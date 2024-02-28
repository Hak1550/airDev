# Generated by Django 2.2.27 on 2022-08-14 20:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gear', '0021_auto_20220813_0951'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='airinstanceassignedtoproject',
            name='camera_operators',
        ),
        migrations.AddField(
            model_name='airinstanceassignedtoproject',
            name='instance_operators',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='instances', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='airinstanceassignedtoproject',
            name='order',
            field=models.IntegerField(default=0),
        ),
    ]
