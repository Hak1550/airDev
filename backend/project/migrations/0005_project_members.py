# Generated by Django 2.2.27 on 2022-03-02 16:08

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('project', '0004_auto_20220228_1233'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='members',
            field=models.ManyToManyField(blank=True, related_name='project_members', to=settings.AUTH_USER_MODEL, verbose_name='Project Members'),
        ),
    ]