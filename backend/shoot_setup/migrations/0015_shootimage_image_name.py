# Generated by Django 2.2.26 on 2023-01-19 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoot_setup', '0014_shootimage_background_image_base64'),
    ]

    operations = [
        migrations.AddField(
            model_name='shootimage',
            name='image_name',
            field=models.CharField(blank=True, max_length=250, null=True, verbose_name='Image Name'),
        ),
    ]