# Generated by Django 2.2.27 on 2022-03-11 11:17

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0020_auto_20220311_1116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 11, 11, 17, 22, 7917, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 11, 11, 17, 22, 7941, tzinfo=utc)),
        ),
    ]
