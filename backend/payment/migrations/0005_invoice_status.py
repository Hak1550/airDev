# Generated by Django 2.2.26 on 2022-09-21 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0004_auto_20220919_2150'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoice',
            name='status',
            field=models.IntegerField(choices=[(1, 'Not Paid'), (2, 'Paid')], default=1),
        ),
    ]