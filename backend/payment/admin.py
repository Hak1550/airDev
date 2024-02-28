from django.contrib import admin
from payment.models import Invoice, Package, PurchaseSubscription
# Register your models here.

@admin.register(Package)
class ShootAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'currency', 'price', 'type', 'package_type')

@admin.register(Invoice)
class ShootAdmin(admin.ModelAdmin):
    list_display = ('id', 'organisation', 'invoice_id', 'invoice_url', 'status')

@admin.register(PurchaseSubscription)
class ShootAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'package', 'quantity', 'start_date', 'end_date', 'is_active', 'stripe_subscription_id', 'stripe_subscription_item_id', 'invoice_id', 'stripe_pm_id')