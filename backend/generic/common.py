from payment.stripe_payment import Invoice
import boto3
from django.conf import settings


class InvoiceModel:

    @classmethod
    def raise_invoice(self, invoice_id):
        invoice_obj = Invoice.retrieve(invoice_id)
        print("invoice raised")
        print(invoice_id)
        print(invoice_obj)
        print("invoice obj ends here")


class WasabiS3Config:

    @classmethod
    def create_bucket_name(self, name):
        return name.replace(" ", "-").lower()

    @classmethod
    def client_connection(self):
        con = boto3.client('s3', 
            endpoint_url=settings.WASABI_ENDPOINT_URL,
            aws_access_key_id=settings.WASABI_AWS_ACCESS_KEY_ID, 
            aws_secret_access_key=settings.WASABI_AWS_SECRET_ACCESS_KEY, 
            region_name=settings.WASABI_AWS_STORAGE_REGION
        )
        return con

    @classmethod
    def session_connection(self):
        session = boto3.Session(
            aws_access_key_id=settings.WASABI_AWS_ACCESS_KEY_ID, 
            aws_secret_access_key=settings.WASABI_AWS_SECRET_ACCESS_KEY, 
        )
        s3_session = session.resource('s3', endpoint_url=settings.WASABI_ENDPOINT_URL, region_name=settings.WASABI_AWS_STORAGE_REGION)
        return s3_session