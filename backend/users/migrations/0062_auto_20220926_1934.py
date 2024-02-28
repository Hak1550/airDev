# Generated by Django 2.2.26 on 2022-09-26 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0061_auto_20220926_0957'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inviteduser',
            name='is_expired',
            field=models.BooleanField(default=False, verbose_name='Is Expired'),
        ),
        migrations.AlterField(
            model_name='inviteduser',
            name='role',
            field=models.IntegerField(default=13, editable=False),
        ),
    ]
