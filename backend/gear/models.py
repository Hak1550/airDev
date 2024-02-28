from django.contrib.auth import get_user_model
from django.db import models
from generic.models import BaseModel
from project.models import Project
from organisation.models import Organisation

# Create your models here.
from django.utils.translation import ugettext_lazy as _

User = get_user_model()

INSTANCE_TYPES = (
    ("VIMIX_MAIN", "VMIX Main"),
    ("VIMIX_REPLY", "VMIX Reply"),
    ("SRT_GATEWAY", "SRT Gateway"),
)

INSTANCE_SIZE = (
    ("SMALL", "Small"),
    ("MEDIUM", "Medium"),
    ("LARGE", "Large"),
    ("XL", "XL"),
)

GEAR_TYPE_CHOICES = (
    (2, "Switcher instance Standard"),
    (3, "Switcher instance L"),
    (4, "Switcher instance XL"),
    (5, "Replay instance"),
)

RECORD_FORMAT = (
    (1, "1080p 25fps"),
    (2, "1080p 30fps"),
    (3, "1080p 50fps"),
    (4, "1080p 60fps"),
    (5, "4k 25fps"),
    (6, "4k 30fps"),
    (7, "4k 50fps"),
    (8, "4k 60fps"),
)


class Camera(models.Model):
    def icon_upload_dir(self, filename):
        return "backend/gear/%s-/%s" % (self.id, filename)

    icon = models.ImageField(
        _("Icon"), upload_to=icon_upload_dir, blank=True, null=True
    )
    _type = models.IntegerField(default=1, choices=GEAR_TYPE_CHOICES)
    owner_name = models.CharField(_("Gear Owner Name"), max_length=100, blank=True)
    organisation = models.ForeignKey(
        Organisation,
        related_name="organisation_camera",
        on_delete=models.CASCADE,
        default=None,
        null=True,
        blank=True,
    )
    nick_name = models.CharField(_("Nick Name"), max_length=100)
    lan_ip = models.CharField(_("Lan IP"), max_length=100, blank=True)
    public_ip = models.CharField(_("Public IP"), max_length=100, blank=True)
    air_id = models.CharField(_("AIR ID"), max_length=100, unique=True)
    internal_record_format = models.IntegerField(default=1, choices=RECORD_FORMAT)
    external_stream_format = models.IntegerField(default=1, choices=RECORD_FORMAT)
    firmware_version = models.CharField(
        _("Firmware Version"), max_length=100, blank=True
    )
    subscription_status = models.IntegerField(_("Subscription Status"), default=1)

    def __str__(self):
        return str(self.owner_name) + "'s Camera"


class CameraAssignedToProject(models.Model):
    camera = models.ForeignKey(Camera, blank=True, null=True, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    camera_x = models.FloatField(_("X position of the Camera."), default=0)
    camera_y = models.FloatField(_("Y position of the Camera."), default=0)
    camera_image_x = models.FloatField(_("X position of the Camera Image."), default=0)
    camera_image_y = models.FloatField(_("Y position of the Camera Image."), default=0)
    camera_rotation = models.FloatField(_("Rotation of the Camera."), default=0)
    camera_placeholder = models.CharField(
        _("Camera Placeholder."), default="", blank=True, null=True, max_length=3
    )
    camera_operator = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.CASCADE
    )
    camera_operator_x = models.FloatField(
        _("X position of the Camera Operator."), default=0
    )
    camera_operator_y = models.FloatField(
        _("X position of the Camera Operator."), default=0
    )
    camera_operator_rotation = models.FloatField(
        _("X position of the Camera Operator."), default=0
    )


class AirCamera(models.Model):
    owner_name = models.CharField(_("Gear Owner Name"), max_length=100, blank=True)
    nick_name = models.CharField(_("Nick Name"), max_length=100, unique=True)
    lan_ip = models.CharField(_("Lan IP"), max_length=100, blank=True)
    public_ip = models.CharField(_("Public IP"), max_length=100, blank=True)
    air_id = models.CharField(_("AIR ID"), max_length=100, unique=True)
    internal_record_format = models.CharField(_("Internal Record Format"), max_length=255, blank=True)
    external_stream_format = models.CharField(_("External Record Format"), max_length=255, blank=True)
    status = models.BooleanField(default=True)
    is_available = models.BooleanField(default=True)
    organisation_associated = models.ForeignKey(
        Organisation,
        related_name="organisation_associated",
        on_delete=models.CASCADE,
        default=None,
        null=True,
        blank=True,
    )
    camera_field_status = models.IntegerField(default=0)
    last_activity = models.DateTimeField(_("Last Activity"), auto_now_add=True, blank=True)

    def __str__(self):
        return str(self.nick_name)


class AirInstance(models.Model):
    instance_type = models.CharField(
        _("Instance Type"), choices=INSTANCE_TYPES, max_length=100, blank=False
    )
    vmix_licence_number = models.CharField(_("Vmix Licence Number"), max_length=255, blank=True)
    instance_regioin = models.CharField(_("Instance Region"), max_length=255, blank=True)
    instance_size = models.CharField(
        _("Instance Size"), choices=INSTANCE_SIZE, max_length=100, blank=False
    )
    owner_name = models.CharField(_("Gear Owner Name"), max_length=100, blank=True)
    nick_name = models.CharField(_("Nick Name"), max_length=100)
    lan_ip = models.CharField(_("Lan IP"), max_length=100, blank=True)
    public_ip = models.CharField(_("Public IP"), max_length=100, blank=True)
    air_id = models.CharField(_("AIR ID"), max_length=100, unique=True)
    status = models.BooleanField(default=True)
    organisation = models.ForeignKey(
        Organisation,
        related_name="organisation_instance",
        on_delete=models.CASCADE,
        default=None,
        null=True,
        blank=True,
    )
    def __str__(self):
        return str(self.nick_name)


class AirInstanceAssignedToProject(models.Model):
    instance = models.ForeignKey(AirInstance, on_delete=models.CASCADE)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="assigned_instances"
    )

    instance_operators = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.CASCADE, related_name="instances"
    )
    order = models.IntegerField(default=0)


class AirCameraAssignedToProject(models.Model):
    camera = models.ForeignKey(
        AirCamera, blank=True, null=True, on_delete=models.CASCADE
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="assigned_cameras"
    )


class AirOperatorAssignedToShoot(models.Model):
    operator = models.ForeignKey(User, on_delete=models.CASCADE)
    camera_operator_x = models.FloatField(
        _("X position of the Camera Operator."), default=0
    )
    camera_operator_y = models.FloatField(
        _("X position of the Camera Operator."), default=0
    )
    camera_operator_rotation = models.FloatField(
        _("X position of the Camera Operator."), default=0
    )
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="air_operator")


class AirConnectionsToShoot(models.Model):
    camera_x = models.FloatField(_("X position of the Camera."), default=0)
    camera_y = models.FloatField(_("Y position of the Camera."), default=0)
    camera_image_x = models.FloatField(_("X position of the Camera Image."), default=0)
    camera_image_y = models.FloatField(_("Y position of the Camera Image."), default=0)
    camera_rotation = models.FloatField(_("Rotation of the Camera."), default=0)
    camera_placeholder = models.CharField(
        _("Camera Placeholder."), default="", blank=True, null=True, max_length=3
    )
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="air_connections")
    camera_operators = models.ManyToManyField(
        AirOperatorAssignedToShoot, blank=True, related_name="air_connections"
    )
    camera = models.ForeignKey(
        AirCameraAssignedToProject,
        on_delete=models.CASCADE,
        related_name="air_connection",
    )
    class Meta:
        unique_together = ('project', 'camera_placeholder',)

class OrganisationOwnedCamera(models.Model):
    organisation = models.ForeignKey(
        Organisation, blank=True, null=True, on_delete=models.CASCADE
    )
    camera = models.ForeignKey(
        AirCamera, blank=True, null=True, on_delete=models.CASCADE
    )    
    owner_name = models.CharField(_("Owner Name"), max_length=100, blank=True)
    nick_name = models.CharField(_("Nick Name"), max_length=100)
    lan_ip = models.CharField(_("Lan IP"), max_length=100, blank=True)
    public_ip = models.CharField(_("Public IP"), max_length=100, blank=True)
    internal_record_format = models.CharField(_("Internal Record Format"), max_length=255, blank=True)
    external_stream_format = models.CharField(_("External Record Format"), max_length=255, blank=True)
    is_active = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)
    is_expired = models.BooleanField(default=False)
    is_deactivated = models.BooleanField(default=False)
    stripe_pm_id = models.CharField(
        max_length=255, editable=False, blank=True
    )
    stripe_subscription_item_id = models.CharField(
        max_length=255, editable=False, blank=True
    )
    stripe_subscription_id = models.CharField(
        max_length=255, editable=False, blank=True
    )
    payment_card_id = models.CharField(
        max_length=100, editable=False, blank=True
    )
    latest_invoice_id = models.CharField(
        max_length=100, editable=False, blank=True
    )
    payment_session_id = models.CharField(
        max_length=255, editable=False, blank=True
    )
    start_date = models.DateTimeField(verbose_name='Start date', null=True, blank=True, auto_now_add=True)
    end_date = models.DateTimeField(verbose_name='End date', null=True, blank=True)

    class Meta:
        unique_together = ('organisation', 'camera',)


class AirInstanceActivityTracker(BaseModel):
    INSTANCE_ACTIVITY = (
        ("start", "Start"),
        ("stop", "Stop")
    )
    instance = models.ForeignKey(AirInstance, blank=True, null=True, on_delete=models.CASCADE)
    time = models.DateTimeField(verbose_name='Time', null=True, blank=True)
    activity_type = models.CharField(
        _("Activity Type"), choices=INSTANCE_ACTIVITY, max_length=100, blank=False
    )
    calculated = models.BooleanField(default=False)

class AirInstanceHoursTracker(BaseModel):
    instance = models.ForeignKey(AirInstance, blank=True, null=True, on_delete=models.CASCADE)
    hours_used = models.FloatField(_("Hours Used"), default=0)
    time = models.DateTimeField(verbose_name='Billed Time', null=True, blank=True)
    calculated = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)

class AirInstanceBillingTracker(BaseModel):
    instance = models.ForeignKey(AirInstance, blank=True, null=True, on_delete=models.CASCADE)
    total_hours = models.FloatField(_("Total Hours used for week"), default=0)
    amount = models.FloatField(_("Total Amount"), default=0)
    week_start = models.DateTimeField(verbose_name='Week Start Date', null=True, blank=True)
    week_end = models.DateTimeField(verbose_name='Week End Date', null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    latest_invoice_id = models.CharField(
        max_length=100, editable=False, blank=True
    )
    payment_card_id = models.CharField(
        max_length=100, editable=False, blank=True
    )
    status = models.CharField(
        max_length=100, editable=False, blank=True
    )