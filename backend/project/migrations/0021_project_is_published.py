# Generated by Django 2.2.26 on 2022-09-28 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0020_auto_20220912_1709'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='is_published',
            field=models.BooleanField(default=False, verbose_name='Is Published'),
        ),
    ]
