
from celery import shared_task
from datetime import datetime, timedelta
import pytz
from django.conf import settings

from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@shared_task(name='organisation_instance_invoice_weekly')
def raise_invoice():
    from django.db.models import Sum
    import math 
    from gear.models import AirInstanceHoursTracker, AirInstance, AirInstanceBillingTracker
    from payment.models import  PACKAGE_TYPES, Package
    from users.models import UserInformation
    from payment.stripe_payment import Invoice
    # from payment.models import Invoice as Invoice_Model
    timezone = pytz.timezone(settings.TIME_ZONE)
    current_date_time = datetime.now(timezone)
    gap_7_days = current_date_time - timedelta(days = 7)
    data = AirInstanceHoursTracker.objects.values("instance","instance__organisation__owner").filter(time__gte=gap_7_days, is_paid=False, calculated=False).order_by('instance').annotate(total_hours=Sum('hours_used'))
    package = Package.objects.filter(package_type=PACKAGE_TYPES[2][0]).first()
    description = "Your invoice for the instance used for the period : "+ str(gap_7_days.strftime("%d %B %Y"))+ " - "+str(current_date_time.strftime("%d %B %Y"))
    for instance in data:
        user_information = UserInformation.objects.get(user=instance['instance__organisation__owner'])
        charges = math.ceil(instance['total_hours']) * int(package.price)
        invoice_item = Invoice.createItem(amount=charges, customer=user_information.stripe_customer_id, currency='usd', description=description)
        invoice = Invoice.create(
            customer=user_information.stripe_customer_id,
            description=description,
            metadata={
                "week_start": gap_7_days,
                "week_end": current_date_time,
                "instance": instance['instance']
            }
        )
        finalize_invoice = Invoice.finalize_invoice(invoice.id)
        air_instance = AirInstance.objects.get(id=instance['instance'])
        AirInstanceBillingTracker(
            instance = air_instance,
            total_hours = instance['total_hours'],
            amount = charges,
            week_start = gap_7_days,
            week_end = current_date_time,
            latest_invoice_id = finalize_invoice['id']
        ).save()
        # organisation = Organisation.objects.get(owner=user_information.user)
        # Invoice_Model(
        #     organisation = organisation,
        #     amount=charges, 
        #     invoice_id=finalize_invoice['id'], 
        #     invoice_url = finalize_invoice['invoice_pdf'],
        #     status=INVOICE_STATUS_TYPES[0][0]
        # ).save()
        AirInstanceHoursTracker.objects.filter(instance=air_instance, time__gte=gap_7_days).update(calculated=True)
    print("task ends here!!!")