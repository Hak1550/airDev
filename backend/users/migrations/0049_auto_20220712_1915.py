# Generated by Django 2.2.27 on 2022-07-12 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0048_auto_20220712_1913'),
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