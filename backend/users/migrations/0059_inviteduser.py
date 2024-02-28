# Generated by Django 2.2.26 on 2022-09-26 09:33

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0020_auto_20220912_1709'),
        ('users', '0058_userinformation_stripe_customer_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='InvitedUser',
            fields=[
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('is_removed', models.BooleanField(default=False)),
                ('token', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('email', models.CharField(editable=False, max_length=250, verbose_name='Code')),
                ('role', models.IntegerField(choices=[(1, 'Admin'), (2, 'Producer'), (3, 'Crew'), (4, 'No Role')], default=4, editable=False)),
                ('is_expired', models.BooleanField(default=False, verbose_name='Is Joined')),
                ('project', models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='invited_project', to='project.Project', verbose_name='Invited Project')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]