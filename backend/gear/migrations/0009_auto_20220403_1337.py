# Generated by Django 2.2.27 on 2022-04-03 13:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gear', '0008_auto_20220403_1116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cameraassignedtoproject',
            name='camera',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='gear.Camera'),
        ),
    ]
