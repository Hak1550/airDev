# Generated by Django 2.2.26 on 2022-10-20 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gear', '0040_airinstancebillingtracker_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='airinstancehourstracker',
            name='calculated',
            field=models.BooleanField(default=False),
        ),
    ]