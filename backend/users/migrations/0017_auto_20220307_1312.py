# Generated by Django 2.2.27 on 2022-03-07 13:12

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0016_auto_20220307_1151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 7, 13, 12, 10, 764472, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 7, 13, 12, 10, 764496, tzinfo=utc)),
        ),
    ]
