from datetime import datetime
from django.conf import settings
import pytz
from  users.models import User

class ActivityMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        response = self.get_response(request)
        if not request.user.is_anonymous:
            timezone = pytz.timezone(settings.TIME_ZONE) 
            User.objects.filter(id=request.user.id).update(is_online=True, last_activity = datetime.now(timezone))
        return response
    