# Generated by Django 2.2.26 on 2022-08-30 14:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('permission', '0013_merge_20220823_1636'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectpermissionmapping',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project_permission', to='project.Project', verbose_name='Project Permission'),
        ),
    ]