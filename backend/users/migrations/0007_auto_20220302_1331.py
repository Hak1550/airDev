# Generated by Django 2.2.27 on 2022-03-02 13:31

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_role'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinformation',
            name='role',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, to='users.Role', verbose_name='Role'),
        ),
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 2, 13, 31, 24, 335881, tzinfo=utc)),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 2, 13, 31, 24, 335906, tzinfo=utc)),
        ),
    ]
