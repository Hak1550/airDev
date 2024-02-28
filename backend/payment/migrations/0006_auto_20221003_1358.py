# Generated by Django 2.2.26 on 2022-10-03 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0005_invoice_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='package',
            name='package_type',
            field=models.IntegerField(choices=[(1, 'Storage'), (2, 'Camera'), (2, 'Instance')], default=1),
        ),
        migrations.AddField(
            model_name='package',
            name='storage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='package',
            name='storage_type',
            field=models.CharField(blank=True, choices=[('gb', 'GB'), ('tb', 'TB')], default=None, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='package',
            name='type',
            field=models.IntegerField(choices=[(1, 'Month'), (2, 'Hour'), (2, 'One Time')], default=1),
        ),
    ]
