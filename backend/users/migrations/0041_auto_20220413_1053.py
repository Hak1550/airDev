# Generated by Django 2.2.27 on 2022-04-13 10:53

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0040_auto_20220413_1049'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 13, 10, 53, 16, 82760, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 13, 10, 53, 16, 82786, tzinfo=utc)),
        ),
    ]