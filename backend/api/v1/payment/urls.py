from django.urls import path, include
from . import viewsets
from rest_framework.routers import DefaultRouter

# from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', viewsets.PackageViewSet, basename='organisation-member-mapping')

router_invoice = DefaultRouter()
router_invoice.register('', viewsets.InvoiceViewSet, basename='organisation-invoices')

urlpatterns = [
    path("package/", include(router.urls)),
    path("invoice/", include(router_invoice.urls)),
    path("purchase-subscription/", viewsets.PurchaseSubscriptionAPIView.as_view(),name='purchase-subcription'),
    path("create-payment-intent/", viewsets.PaymentIntentView.as_view(),name='payment-intent'),
    path("create-payment-session/", viewsets.PaymentSessionView.as_view(),name='payment-session'),
    path("update-subscription-item/", viewsets.UpdateSubscriptionItemView.as_view(),name='update-subsription-item'),
    path("add-new-subscription-item/", viewsets.AddNewSubscriptionItemView.as_view(),name='add-subsription-item'),
    path("webhook/", viewsets.WebhookView.as_view(),name='stripe-webhook'),
    path("customer-payment-method/", viewsets.PaymentMethodView.as_view(),name='customer-payment-method'),
    # path("customer-payment-method/<str:id>/", viewsets.PaymentMethodView.as_view(),name='customer-payment-method'),
    path("change-default-payment-method/", viewsets.ChangeDefaultPaymentMethodView.as_view(),name='change-default-payment-method')

]
