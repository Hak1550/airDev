# Generated by Django 2.2.27 on 2022-04-14 16:45

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0042_auto_20220414_1156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 14, 16, 45, 20, 16698, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 14, 16, 45, 20, 16722, tzinfo=utc)),
        ),
    ]