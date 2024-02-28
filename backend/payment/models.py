from django.db import models
from django.conf import settings
from users.models import User
from organisation.models import Organisation
from generic.models import BaseModel

# Create your models here.

PAYMENT_TYPES = (
    (1, "Month"),
    (2, "Hour"),
    (2, "One Time")
    )

PACKAGE_TYPES = (
    (1, "Storage"),
    (2, "Camera"),
    (3, "Instance")
    )

STORAGE_TYPES = (
    ("gb", "GB"),
    ("tb", "TB")
    )

INVOICE_STATUS_TYPES = (
    (1, "Not Paid"),
    (2, "Paid")
    )

class Invoice(BaseModel):
    organisation = models.ForeignKey(
        Organisation, on_delete=models.CASCADE, related_name='organisation_invoice'
    )
    amount = models.IntegerField(blank=True, null=True)
    invoice_id = models.CharField('Invoice Id', max_length=255, blank=True, null=True)
    invoice_url = models.CharField('Invoice Url', max_length=255, blank=True, null=True)
    status = models.IntegerField(default=1, choices=INVOICE_STATUS_TYPES)
    created = models.DateTimeField(verbose_name='Created', null=True, blank=True, auto_now_add=True)

    def __str__(self):
        return str(self.organisation)+ "'s Invoice"

class Package(BaseModel):
    name = models.CharField('Name', max_length=255, blank=True, null=True)
    description = models.TextField(
        max_length=1024,
        blank=True,
        null=True
    )
    package_type = models.IntegerField(default=1, choices=PACKAGE_TYPES)
    storage_type = models.CharField(default=None, null=True, choices=STORAGE_TYPES, blank=True, max_length=100)
    storage = models.IntegerField(null=True, blank=True)
    type = models.IntegerField(default=1, choices=PAYMENT_TYPES)
    price_supporting_text = models.CharField('Price Supporting Text', max_length=255, blank=True, null=True)
    currency = models.CharField('Currency', max_length=255, blank=True, null=True, default="usd")
    price = models.IntegerField(null=True, blank=True)
    stripe_product_id = models.CharField('Stripe Product Id', max_length=255, blank=True, null=True)
    stripe_price_id = models.CharField('Stripe Price Id', max_length=255, blank=True, null=True)

    def __str__(self):
        return str(self.name)


class PurchaseSubscription(models.Model):
    """ It will store the subcriptions purchased by
        users.
    """
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user_purchase_package'
    )
    package = models.ForeignKey(
        Package, on_delete=models.CASCADE, related_name='purchase_package'
    )
    quantity = models.IntegerField(default=1)
    stripe_pm_id = models.CharField(
        max_length=100, editable=False, blank=True
    )
    stripe_subscription_item_id = models.CharField(
        max_length=100, editable=False, blank=True
    )
    stripe_subscription_id = models.CharField(
        max_length=100, editable=False, blank=True
    )
    payment_intent_id = models.CharField(
        max_length=255, editable=False, blank=True
    )
    payment_session_id = models.CharField(
        max_length=255, editable=False, blank=True
    )
    start_date = models.DateTimeField(verbose_name='Subscription start date', null=True, blank=True, auto_now_add=True)
    end_date = models.DateTimeField(verbose_name='Subscription end date', null=True, blank=True)
    
    invoice_id = models.CharField(
        max_length=100, editable=False, blank=True
    )
    status = models.CharField(
        max_length=100, blank=True
    )
    payment_fail_reason= models.TextField(blank=True)
    is_active = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)
    is_free = models.BooleanField(default=False)
    payment_card_id = models.CharField(
        max_length=100, editable=False, blank=True
    )