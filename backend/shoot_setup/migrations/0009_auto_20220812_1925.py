# Generated by Django 2.2.27 on 2022-08-12 19:25

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoot_setup', '0008_auto_20220713_1018'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shootsetup',
            name='audio',
            field=models.ManyToManyField(blank=True, related_name='audio', to=settings.AUTH_USER_MODEL, verbose_name='Audio'),
        ),
        migrations.AlterField(
            model_name='shootsetup',
            name='client',
            field=models.ManyToManyField(blank=True, related_name='client', to=settings.AUTH_USER_MODEL, verbose_name='Client'),
        ),
        migrations.AlterField(
            model_name='shootsetup',
            name='grfx',
            field=models.ManyToManyField(blank=True, related_name='grfx', to=settings.AUTH_USER_MODEL, verbose_name='GRFX'),
        ),
        migrations.AlterField(
            model_name='shootsetup',
            name='on_sight',
            field=models.ManyToManyField(blank=True, related_name='on_sight_user', to=settings.AUTH_USER_MODEL, verbose_name='On Sight'),
        ),
        migrations.AlterField(
            model_name='shootsetup',
            name='properties',
            field=django.contrib.postgres.fields.jsonb.JSONField(default=dict),
        ),
        migrations.AlterField(
            model_name='shootsetup',
            name='replay',
            field=models.ManyToManyField(blank=True, related_name='Replay', to=settings.AUTH_USER_MODEL, verbose_name='Replay'),
        ),
        migrations.AlterField(
            model_name='shootsetup',
            name='technical_director',
            field=models.ManyToManyField(blank=True, related_name='shoot_technical_director', to=settings.AUTH_USER_MODEL, verbose_name='Technical Director'),
        ),
    ]