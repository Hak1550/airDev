# Generated by Django 2.2.26 on 2022-10-17 12:40

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0006_auto_20220902_1018'),
        ('gear', '0037_auto_20221014_1317'),
    ]

    operations = [
        migrations.AddField(
            model_name='airinstance',
            name='organisation',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='organisation_instance', to='organisation.Organisation'),
        ),
        migrations.CreateModel(
            name='AirInstanceHoursTracker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('hours_used', models.FloatField(default=0, verbose_name='Hours Used')),
                ('time', models.DateTimeField(blank=True, null=True, verbose_name='Billed Time')),
                ('is_paid', models.BooleanField(default=False)),
                ('instance', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='gear.AirInstance')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AirInstanceBillingTracker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('total_hours', models.FloatField(default=0, verbose_name='Total Hours used for week')),
                ('week_start', models.DateTimeField(blank=True, null=True, verbose_name='Week Start Date')),
                ('week_end', models.DateTimeField(blank=True, null=True, verbose_name='Week End Date')),
                ('is_paid', models.BooleanField(default=False)),
                ('latest_invoice_id', models.CharField(blank=True, editable=False, max_length=100)),
                ('payment_card_id', models.CharField(blank=True, editable=False, max_length=100)),
                ('status', models.CharField(blank=True, editable=False, max_length=100)),
                ('instance', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='gear.AirInstance')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AirInstanceActivityTracker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('time', models.DateTimeField(blank=True, null=True, verbose_name='End date')),
                ('activity_type', models.CharField(choices=[('start', 'Start'), ('stop', 'Stop')], max_length=100, verbose_name='Activity Type')),
                ('instance', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='gear.AirInstance')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
