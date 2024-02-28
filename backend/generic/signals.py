from django.db.models.signals import post_save
from django.dispatch import receiver
from api.v1.gear.serializers import AirCameraSerializer
from generic.common import WasabiS3Config
from organisation.models import Organisation
from gear.models import Camera, OrganisationOwnedCamera
from payment.models import PACKAGE_TYPES, Package, PAYMENT_TYPES, PurchaseSubscription
from payment.stripe_payment import Customer, Product, Price, Subscription

from users.models import Role, User, UserInformation
from datetime import datetime
from rest_framework import status
from rest_framework.exceptions import ValidationError
class Signals:

    @receiver(post_save, sender=User, dispatch_uid="create_user_inforation")
    def create_user_inforation(sender, instance, **kwargs):
        if kwargs['created']:
            role_instance = Role.objects.filter(name="NO_ROLE").first()
            UserInformation.objects.get_or_create(
                user=instance, first_name=instance.first_name, 
                last_name = instance.last_name,
                role=role_instance
            )

    @receiver(post_save, sender=Organisation, dispatch_uid="create_organisation_bucket")
    def create_organisation_bucket(sender, instance, **kwargs):
        if kwargs['created']:
            bucket_name = WasabiS3Config.create_bucket_name(instance.name)
            s3_client = WasabiS3Config.client_connection()
            s3_client.create_bucket(Bucket=bucket_name) 
            instance.wasabi_bucket_name = bucket_name
            instance.save()


    @receiver(post_save, sender=UserInformation, dispatch_uid="create_stripe_customer")
    def create_stripe_customer(sender, instance, **kwargs):
        if kwargs['created']:
            name = instance.first_name + " " + instance.last_name
            address = {
                "line1": "Demo Client Address",
                "country": "us"
            }
            shipping = {
                "address": address,
                "name": name
            }
            customer = Customer.create(email=instance.user.email, name=name, address=address, shipping=shipping)
            stripe_cus_id = customer['id']
            instance.stripe_customer_id = stripe_cus_id
            instance.save()
            # select the basic package for user
            basic_package = Package.objects.filter(type=PAYMENT_TYPES[0][0], price=0).first()
            if basic_package:
                PurchaseSubscription(
                    user=instance.user, 
                    package=basic_package,
                    is_active=True,
                    is_paid=True,
                    status="Active",
                    is_free=True
                    ).save()

    @receiver(post_save, sender=Package, dispatch_uid="create_stripe_product")
    def create_stripe_product(sender, instance, **kwargs):
        if kwargs['created']:
            stripe_product = Product.create(name=instance.name, description= instance.description)
            interval = {"interval": "month"} if instance.type == 1 else {}
            stripe_price = Price.create(
                unit_amount=instance.price,
                currency=instance.currency,
                recurring=interval,
                product=stripe_product["id"],
            )
            instance.stripe_product_id = stripe_product['id']
            instance.stripe_price_id = stripe_price['id']
            instance.save()

    @receiver(post_save, sender=OrganisationOwnedCamera, dispatch_uid="create-camera-subscription")
    def create_stripe_camera_subscription(sender, instance, **kwargs):
        if kwargs['created'] and instance.stripe_subscription_id != 'NA' and False:
            try:
                user = instance.organisation.owner
                _status = status.HTTP_400_BAD_REQUEST
                user_information = UserInformation.objects.get(user=user)
                package = Package.objects.filter(package_type=PACKAGE_TYPES[1][0]).first()
                camera_data = AirCameraSerializer(instance.camera).data
                stripe_subcription_obj = Subscription.create(
                    collection_method = "charge_automatically",
                    customer=user_information.stripe_customer_id,
                    items=[
                        {"price": package.stripe_price_id},
                    ],
                    metadata = camera_data
                )
                instance.stripe_subscription_id = stripe_subcription_obj['id']
                instance.stripe_subscription_item_id = stripe_subcription_obj['items']['data'][0]['id']
                instance.latest_invoice_id = stripe_subcription_obj['latest_invoice']
                instance.stripe_pm_id = ''
                instance.payment_card_id = ''
                instance.start_date = datetime.fromtimestamp(stripe_subcription_obj['current_period_start'])
                instance.end_date = datetime.fromtimestamp(stripe_subcription_obj['current_period_end'])
                instance.save()
                print(stripe_subcription_obj)
            except Exception as e:
                raise ValidationError(str(e))