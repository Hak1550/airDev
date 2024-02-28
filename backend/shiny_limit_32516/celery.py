from __future__ import absolute_import
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE','shiny_limit_32516.settings')

app = Celery('shiny_limit_32516')
app.config_from_object('django.conf:settings', namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
   'every-5-minute': {
        'task': 'user_online_offline_status',
        # 'schedule': crontab()
        # 'schedule': timedelta(seconds=5)
        "schedule": crontab(minute='*/5'),
    },

}
