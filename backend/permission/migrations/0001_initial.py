# Generated by Django 2.2.27 on 2022-04-01 20:10

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0028_auto_20220401_2010'),
    ]

    operations = [
        migrations.CreateModel(
            name='PermissionTypes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('permissions', django.contrib.postgres.fields.jsonb.JSONField(default={})),
                ('user_type', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='users.Role', verbose_name='User Types')),
            ],
        ),
    ]
