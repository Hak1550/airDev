# Generated by Django 2.2.27 on 2022-04-14 11:56

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0041_auto_20220413_1053'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 14, 11, 56, 6, 476216, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 14, 11, 56, 6, 476250, tzinfo=utc)),
        ),
    ]
