# Generated by Django 2.2.27 on 2022-08-12 19:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('permission', '0009_auto_20220812_1926'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectpermissionmapping',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.Project', verbose_name='Project Permission'),
        ),
    ]
