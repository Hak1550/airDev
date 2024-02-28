# Generated by Django 2.2.27 on 2022-08-18 12:52

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('permission', '0011_auto_20220812_1929'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectpermissionmapping',
            name='users',
            field=models.ManyToManyField(related_name='project_users', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='projectpermissionmapping',
            unique_together=set(),
        ),
        migrations.RemoveField(
            model_name='projectpermissionmapping',
            name='user',
        ),
    ]
