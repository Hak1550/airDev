# Generated by Django 2.2.27 on 2022-03-07 14:03

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_auto_20220307_1314'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 7, 14, 3, 25, 932132, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 7, 14, 3, 25, 932157, tzinfo=utc)),
        ),
    ]
