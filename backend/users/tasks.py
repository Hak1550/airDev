
from celery import shared_task
from datetime import datetime, timedelta
import pytz
from django.conf import settings

from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task(name='user_online_offline_status')
def set_user_online_status():
    from users.models import User
    timezone = pytz.timezone(settings.TIME_ZONE)
    gap_5_mins = datetime.now(timezone) - timedelta(minutes = 5)
    users = User.objects.filter(last_activity__lte=gap_5_mins)
    for user in users:
        # minutes_diff = (current_time - user.last_activity).total_seconds() / 60.0
        # if minutes_diff > 5:
        user.is_online = False
        user.save()
    print("task ends here!!!")