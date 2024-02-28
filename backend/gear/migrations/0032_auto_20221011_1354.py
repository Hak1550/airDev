# Generated by Django 2.2.26 on 2022-10-11 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gear', '0031_airoperatorassignedtoshoot_project'),
    ]

    operations = [
        migrations.AddField(
            model_name='airinstance',
            name='instance_regioin',
            field=models.CharField(blank=True, max_length=255, verbose_name='Instance Region'),
        ),
        migrations.AddField(
            model_name='airinstance',
            name='vmix_licence_number',
            field=models.CharField(blank=True, max_length=255, verbose_name='Vmix Licence Number'),
        ),
    ]
