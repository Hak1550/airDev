# Generated by Django 2.2.27 on 2022-08-12 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organisationmembermapping',
            name='role',
            field=models.IntegerField(choices=[(1, 'Admin'), (2, 'Producer'), (3, 'Crew'), (4, 'No Role')], default=4),
        ),
    ]