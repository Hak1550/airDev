# Generated by Django 2.2.26 on 2023-01-20 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0019_auto_20230120_0855'),
    ]

    operations = [
        migrations.AddField(
            model_name='collectionitem',
            name='bucket',
            field=models.CharField(max_length=250, null=True, verbose_name='Bucket'),
        ),
    ]