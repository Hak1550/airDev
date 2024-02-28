import stripe
import environ

env = environ.Env()

class BaseStripe:
    stripe.api_key = env.str("STRIPE_SECRET_KEY", "")
    def __init__(self) -> None:
        pass

class StripeCustomer(BaseStripe):
    @staticmethod
    def create_customer(**kwargs):
        return stripe.Customer.create(**kwargs)

    @staticmethod
    def get_customer(cust_id):
        return stripe.Customer.retrieve(cust_id)

    @staticmethod
    def delete_customer(cust_id):
        return stripe.Customer.delete(cust_id)
 
class StripeProduct(BaseStripe):
    @staticmethod
    def create_product(**kwargs):
        return stripe.Product.create(**kwargs)
        
    @staticmethod
    def get_product(product_id):
        return stripe.Product.retrieve(product_id)

    @staticmethod
    def delete_product(product_id):
        return stripe.Product.delete(product_id)
 
class StripePrice(BaseStripe):
    @staticmethod
    def create_price(**kwargs):
        return stripe.Price.create(**kwargs)

    @staticmethod
    def get_price(price_id):
        return stripe.Price.retrieve(price_id)

    @staticmethod
    def delete_price(price_id):
        return stripe.Price.delete(price_id)

class StripePaymentIntent(BaseStripe):
    @staticmethod
    def create_paymentIntent(**kwargs):
        return stripe.PaymentIntent.create(**kwargs)

    @staticmethod
    def get_paymentIntent(intent_id):
        return stripe.PaymentIntent.retrieve(intent_id)

    @staticmethod
    def delete_paymentIntent(intent_id):
        return stripe.PaymentIntent.delete(intent_id)

class StripeService:
    stripe.api_key = env.str("STRIPE_SECRET_KEY", "")

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