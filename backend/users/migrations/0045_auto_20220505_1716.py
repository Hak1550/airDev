# Generated by Django 2.2.27 on 2022-05-05 17:16

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0044_auto_20220418_0943'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 5, 17, 16, 30, 191849, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2022, 5, 5, 17, 16, 30, 191873, tzinfo=utc)),
        ),
    ]
