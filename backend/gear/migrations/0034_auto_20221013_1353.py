# Generated by Django 2.2.26 on 2022-10-13 13:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('organisation', '0006_auto_20220902_1018'),
        ('gear', '0033_auto_20221011_1358'),
    ]

    operations = [
        migrations.AddField(
            model_name='aircamera',
            name='is_available',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='aircamera',
            name='organisation_associated',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='organisation_associated', to='organisation.Organisation'),
        ),
        migrations.CreateModel(
            name='OrganisationOwnedCamera',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner_name', models.CharField(blank=True, max_length=100, verbose_name='Owner Name')),
                ('nick_name', models.CharField(max_length=100, verbose_name='Nick Name')),
                ('internal_record_format', models.CharField(blank=True, max_length=255, verbose_name='Internal Record Format')),
                ('external_stream_format', models.CharField(blank=True, max_length=255, verbose_name='External Record Format')),
                ('is_active', models.BooleanField(default=False)),
                ('is_paid', models.BooleanField(default=False)),
                ('is_expired', models.BooleanField(default=False)),
                ('stripe_pm_id', models.CharField(blank=True, editable=False, max_length=255)),
                ('stripe_subscription_item_id', models.CharField(blank=True, editable=False, max_length=255)),
                ('stripe_subscription_id', models.CharField(blank=True, editable=False, max_length=255)),
                ('payment_card_id', models.CharField(blank=True, editable=False, max_length=100)),
                ('start_date', models.DateTimeField(auto_now_add=True, null=True, verbose_name='Start date')),
                ('end_date', models.DateTimeField(blank=True, null=True, verbose_name='End date')),
                ('camera', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='gear.AirCamera')),
                ('organisation', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='organisation.Organisation')),
            ],
        ),
    ]
