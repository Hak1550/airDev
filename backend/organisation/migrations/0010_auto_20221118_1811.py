# Generated by Django 2.2.26 on 2022-11-18 18:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0009_auto_20221105_1917'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='organisation',
            unique_together={('name',)},
        ),
    ]
