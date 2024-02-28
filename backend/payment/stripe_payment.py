import stripe
from django.conf import settings
import environ

env = environ.Env()
stripe.api_key = settings.STRIPE_SECRET_KEY
stripe.api_version = "2020-08-27"

class StripeService:
    
    @classmethod
    def create_payment_intent_sheet(cls, cus_id, cents):
        ephemeralKey = stripe.EphemeralKey.create(
            customer=cus_id,
            stripe_version=env.str("STRIPE_VERSION", '2020-08-27'),
        )
        paymentIntent = stripe.PaymentIntent.create(
            amount=cents,
            currency=env.str("STRIPE_CURRENCY", 'usd'),
            customer=cus_id
        )

        return {
            "paymentIntent": paymentIntent.client_secret,
            "ephemeralKey": ephemeralKey.secret,
            "customer": cus_id
        }

    @classmethod
    def get_payments_history(cls, cus_id, limit=100, offset=0):
        return stripe.PaymentIntent.list(
            customer=cus_id, limit=limit, offset=offset, 
        ).get('data', [])

    @classmethod
    def get_payments_methods(cls, cus_id, type='card', limit=100, offset=0):
        return stripe.PaymentMethod.list(customer=cus_id, type=type, limit=limit, offset=offset).get('data', [])

class EphemeralKey(object):

    @staticmethod
    def create(**kwargs):
        return stripe.EphemeralKey.create(**kwargs)

class CheckOutSession(object):

    @staticmethod
    def create(**kwargs):
        return stripe.checkout.Session.create(**kwargs)

class PaymentIntent(object):

    @staticmethod
    def create(**kwargs):
        return stripe.PaymentIntent.create(**kwargs)

    @staticmethod
    def list(**kwargs):
        return stripe.PaymentIntent.list(**kwargs)

    @staticmethod
    def get(intent_id):
        return stripe.PaymentIntent.retrieve(intent_id)

    @staticmethod
    def delete(intent_id):
        return stripe.PaymentIntent.delete(intent_id)

class Product(object):

    @classmethod
    def create(cls, **params):
        return stripe.Product.create(**params)

class Price(object):

    @classmethod
    def create(cls, **params):
        return stripe.Price.create(**params)


class Customer(object):

    @classmethod
    def create(cls, **params):
        return stripe.Customer.create(**params)

    @classmethod
    def modify(cls, cus_id, pm_id):
        return stripe.Customer.modify(cus_id, invoice_settings=pm_id)

    @classmethod
    def create_source(cls, *args, **kwargs):
        return stripe.Customer.create_source(*args, **kwargs)

    @classmethod
    def retrieve(cls, cus_id):
        return stripe.Customer.retrieve(cus_id)
    
    @classmethod
    def list_payment_methods(cls, cus_id, type):
        return stripe.Customer.list_payment_methods(cus_id, type=type)

class Subscription:

    @classmethod
    def create(cls, **params):
        return stripe.Subscription.create(**params)

    @classmethod
    def retrieve(cls, subscription_id):
        return stripe.Subscription.retrieve(subscription_id)

    @classmethod
    def modify(cls, sub_id, **params):
        return stripe.Subscription.modify(sub_id, **params)

    @classmethod
    def delete(cls, sub_id):
        return stripe.Subscription.delete(sub_id)

class SubscriptionItem:

    @classmethod
    def retrieve(cls, subscription_item_id):
        return stripe.SubscriptionItem.retrieve(subscription_item_id)

    @classmethod
    def create(cls, **params):
        return stripe.SubscriptionItem.create(**params)
    
    @classmethod
    def modify(cls, sub_item_id, **params):
        return stripe.SubscriptionItem.modify(sub_item_id, **params)

class PaymentMethod:

    @classmethod
    def attach(cls, stripe_pm_id, stripe_customer_id):
        return stripe.PaymentMethod.attach(
            stripe_pm_id, customer=stripe_customer_id
        )
    
    @classmethod
    def create(cls, **params):
        return stripe.PaymentMethod.create(**params)

    @classmethod
    def modify(cls, id, **params):
        return stripe.PaymentMethod.modify(id, **params)

class Invoice:

    @classmethod
    def createItem(cls, **params):
        return stripe.InvoiceItem.create(**params)

    @classmethod
    def create(cls, **params):
        return stripe.Invoice.create(**params)

    @classmethod
    def finalize_invoice(cls, invoice_id):
        return stripe.Invoice.finalize_invoice(invoice_id)
    
    @classmethod
    def send_invoice(cls, invoice_id):
        return stripe.Invoice.send_invoice(invoice_id)

    @classmethod
    def retrieve(cls, invoice_id):
        return stripe.Invoice.retrieve(invoice_id)