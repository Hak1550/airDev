# Generated by Django 2.2.26 on 2022-11-24 19:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0021_project_is_published'),
        ('gear', '0045_auto_20221124_1918'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='airconnectionstoshoot',
            unique_together={('project', 'camera_placeholder')},
        ),
    ]
