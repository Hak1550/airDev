# Generated by Django 2.2.27 on 2022-04-21 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gear', '0015_auto_20220420_2008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='camera',
            name='air_id',
            field=models.CharField(max_length=100, unique=True, verbose_name='AIR ID'),
        ),
    ]