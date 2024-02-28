# Generated by Django 2.2.27 on 2022-08-18 20:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gear', '0024_auto_20220817_1005'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='aircameraassignedtoproject',
            name='camera_operators',
        ),
        migrations.CreateModel(
            name='AirCameraOperatorProjectAssignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('camera_operator_x', models.FloatField(default=0, verbose_name='X position of the Camera Operator.')),
                ('camera_operator_y', models.FloatField(default=0, verbose_name='X position of the Camera Operator.')),
                ('camera_operator_rotation', models.FloatField(default=0, verbose_name='X position of the Camera Operator.')),
                ('operator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='aircameraassignedtoproject',
            name='assigned_camera',
            field=models.ManyToManyField(blank=True, related_name='air_camera', to='gear.AirCameraOperatorProjectAssignment'),
        ),
    ]