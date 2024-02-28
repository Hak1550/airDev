# Generated by Django 2.2.27 on 2022-08-10 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gear', '0019_auto_20220810_1849'),
    ]

    operations = [
        migrations.AlterField(
            model_name='airinstance',
            name='instance_size',
            field=models.CharField(choices=[('SMALL', 'Small'), ('MEDIUM', 'Medium'), ('LARGE', 'Large'), ('XL', 'XL')], max_length=100, verbose_name='Instance Size'),
        ),
        migrations.AlterField(
            model_name='airinstance',
            name='instance_type',
            field=models.CharField(choices=[('VIMIX_MAIN', 'VMIX Main'), ('VIMIX_REPLY', 'VMIX Reply'), ('SRT_GATEWAY', 'SRT Gateway')], max_length=100, verbose_name='Instance Type'),
        ),
    ]
