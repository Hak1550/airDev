# Generated by Django 2.2.27 on 2022-04-01 20:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0031_auto_20220401_2043'),
        ('project', '0008_project_properties'),
        ('permission', '0003_auto_20220401_2025'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProjectPermissionMapping',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True, verbose_name='Is Active')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='project.Project', verbose_name='Project')),
                ('role', models.ForeignKey(default=13, on_delete=django.db.models.deletion.CASCADE, to='users.Role', verbose_name='Project Role')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Project Member')),
            ],
            options={
                'unique_together': {('project', 'user')},
            },
        ),
    ]
