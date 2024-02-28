from django.contrib import admin
from gear.models import (
    AirInstanceActivityTracker,
    AirInstanceBillingTracker,
    AirInstanceHoursTracker,
    Camera,
    CameraAssignedToProject,
    AirCamera,
    AirInstance,
    AirInstanceAssignedToProject,
    AirCameraAssignedToProject,
    AirOperatorAssignedToShoot,
    AirConnectionsToShoot,
    OrganisationOwnedCamera,
)

# Register your models here.


@admin.register(Camera)
class CameraAdmin(admin.ModelAdmin):
    pass


@admin.register(CameraAssignedToProject)
class CameraAssignmentAdmin(admin.ModelAdmin):
    pass


@admin.register(AirCamera)
class AirCameraAdmin(admin.ModelAdmin):
    list_display = ("id", "nick_name", "owner_name", "air_id", "organisation_associated", "is_available", "camera_field_status", "last_activity")


@admin.register(AirInstance)
class AirInstanceAdmin(admin.ModelAdmin):
    pass


@admin.register(AirCameraAssignedToProject)
class AirCameraAssignedAdmin(admin.ModelAdmin):
    pass


@admin.register(AirInstanceAssignedToProject)
class AirInstanceAssignedAdmin(admin.ModelAdmin):
    pass


@admin.register(AirOperatorAssignedToShoot)
class AirOperatorAssignedToShootAdmin(admin.ModelAdmin):
    pass


@admin.register(AirConnectionsToShoot)
class AirConnectionsToShootAdmin(admin.ModelAdmin):
    pass


@admin.register(OrganisationOwnedCamera)
class AirConnectionsToShootAdmin(admin.ModelAdmin):
    list_display = ("id", "organisation", "nick_name", "owner_name", "camera", "stripe_subscription_id", "payment_session_id", "latest_invoice_id", "is_active", "start_date", "end_date")


@admin.register(AirInstanceActivityTracker)
class AirConnectionsToShootAdmin(admin.ModelAdmin):
    list_display = ("id", "instance", "time", "activity_type", "calculated")


@admin.register(AirInstanceHoursTracker)
class AirConnectionsToShootAdmin(admin.ModelAdmin):
    list_display = ("id", "instance", "hours_used", "time", "calculated", "is_paid")


@admin.register(AirInstanceBillingTracker)
class AirConnectionsToShootAdmin(admin.ModelAdmin):
    list_display = ("id", "instance", "total_hours", "week_start", "week_end", "is_paid", "latest_invoice_id", "status")
