from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from payment.models import Invoice, Package, PurchaseSubscription
from rest_framework import serializers

User = get_user_model()

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = "__all__"

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = "__all__"


class ChangeDefaultPaymentMethodSerializer(serializers.Serializer):
    payment_method_id =  serializers.CharField(required=True)

class PaymentSessionSerializer(serializers.Serializer):
    stripe_price_id =  serializers.CharField(required=True)
    mode = serializers.CharField(required=True)
    quantity = serializers.IntegerField(default=1, required=False)


class AddSubscriptionItemSerializer(serializers.Serializer):
    subscription_id = serializers.CharField(required=True)
    stripe_price_id = serializers.CharField(required=True)

class UpdateSubscriptionItemSerializer(serializers.Serializer):
    subscription_item_id = serializers.CharField(required=True)

class PaymentMethodUpdateSerializer(serializers.Serializer):
    name =  serializers.CharField(required=True)
    exp_month = serializers.IntegerField(required=True)
    exp_year = serializers.IntegerField(required=True)
    cvc = serializers.IntegerField(required=False)
    default = serializers.IntegerField(required=False)
    email = serializers.CharField(required=True)
    address = serializers.JSONField(required=False)

class PaymentMethodSerializer(serializers.Serializer):
    name =  serializers.CharField(required=True)
    number = serializers.IntegerField(required=True)
    exp_month = serializers.IntegerField(required=True)
    exp_year = serializers.IntegerField(required=True)
    cvc = serializers.IntegerField(required=True)
    default = serializers.IntegerField(required=True)
    email = serializers.CharField(required=True)
    address = serializers.JSONField(required=False)

class PaymentIntentSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    stripe_product_id = serializers.CharField()

    def validate(self, attrs):
        amount = attrs.get("amount")
        stripe_product_id = attrs.get("stripe_product_id")
        if amount <= 0:
            raise serializers.ValidationError('Please enter valid amount.')
        try:
            Package.objects.get(stripe_product_id=stripe_product_id)
        except:
            raise serializers.ValidationError('Please enter Valid Stripe Product ID.')
        return attrs

    class Meta:
        extra_kwargs = {
            "amount": {
                "required": True
            },
            "stripe_product_id": {
                "required": True
            }
        }

class PurchaseSubcriptionSerializer(serializers.ModelSerializer):
    token = serializers.CharField(read_only=True)
    
    class Meta:
        model = PurchaseSubscription
        fields = ["package", "stripe_pm_id", "start_date", "end_date", "token"]
        extra_kwargs = {
            "start_date": {
            "required": False,
            },
            "end_date": {
            "required": False,
            },
        }

class MySubscriptionSerializer(serializers.ModelSerializer):
    package = PackageSerializer()
    
    class Meta:
        model = PurchaseSubscription
        fields = "__all__"
        extra_kwargs = {
            "start_date": {
            "required": False,
            },
            "end_date": {
            "required": False,
            },
        }