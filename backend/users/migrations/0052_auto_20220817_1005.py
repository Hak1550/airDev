# Generated by Django 2.2.27 on 2022-08-17 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0051_merge_20220817_1005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='role',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='role',
            name='modified',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
