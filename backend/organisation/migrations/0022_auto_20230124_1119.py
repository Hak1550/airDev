# Generated by Django 2.2.26 on 2023-01-24 11:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0021_auto_20230124_1125'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='collectionitem',
            unique_together={('collection', 'key')},
        ),
    ]
