# Generated by Django 2.2.27 on 2022-04-18 09:43

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0043_auto_20220414_1645'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 18, 9, 43, 4, 628973, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2022, 4, 18, 9, 43, 4, 629015, tzinfo=utc)),
        ),
    ]