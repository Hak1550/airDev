# Generated by Django 2.2.27 on 2022-04-06 11:57

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0038_auto_20220406_1115'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 6, 11, 57, 16, 223439, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 6, 11, 57, 16, 223486, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='name',
            field=models.CharField(choices=[('ADMIN', 'ADMIN'), ('PRODUCER', 'PRODUCER'), ('DIRECTOR', 'DIRECTOR'), ('TECHNICAL_DIRECTOR', 'TECHNICAL_DIRECTOR'), ('CAMERA_OP', 'CAMERA_OP'), ('FIELD_CREW', 'FIELD_CREW'), ('CLIENT', 'CLIENT'), ('TALENT', 'TALENT'), ('EDIT_OP', 'EDIT_OP'), ('GRFX_OP', 'GRFX_OP'), ('AUDIO_OP', 'AUDIO_OP'), ('PLAYBACK_OP', 'PLAYBACK_OP'), ('NO_ROLE', 'NO_ROLE')], max_length=32, unique=True, verbose_name='Role Name'),
        ),
    ]
