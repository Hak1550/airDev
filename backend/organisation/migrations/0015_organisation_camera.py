# Generated by Django 2.2.26 on 2022-12-01 08:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gear', '0046_auto_20221124_1923'),
        ('organisation', '0014_remove_organisation_camera'),
    ]

    operations = [
        migrations.AddField(
            model_name='organisation',
            name='camera',
            field=models.ManyToManyField(related_name='organisation_camera', to='gear.AirCamera', verbose_name='Organisation Camera'),
        ),
    ]
