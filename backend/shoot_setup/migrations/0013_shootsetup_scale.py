# Generated by Django 2.2.26 on 2022-09-15 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoot_setup', '0012_auto_20220912_1229'),
    ]

    operations = [
        migrations.AddField(
            model_name='shootsetup',
            name='scale',
            field=models.FloatField(default=1),
        ),
    ]
