# Generated by Django 2.2.27 on 2022-02-25 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0002_project_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='shoot_date',
            field=models.DateField(blank=True, null=True, verbose_name='Shoot Date'),
        ),
    ]