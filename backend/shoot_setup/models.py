from email.policy import default
import imp
from django.db import models
from users.models import User
from project.models import Project
from gear.models import CameraAssignedToProject
from django.contrib.postgres.fields import JSONField
from django.utils.translation import ugettext_lazy as _

# Create your models here.

SHOOT_STATUS_CHOICES = (
    (0, "Draft"),
    (1, "Publish"),
)


class ShootSetup(models.Model):
    def image_upload_dir(self, filename):
        return "backend/shoot/%s/%s/%s" % (self.poject.id, self.id, filename)

    project = models.ForeignKey(
        Project,
        verbose_name="Shoot Project",
        related_name="shoot_project",
        on_delete=models.CASCADE,
        blank=False,
    )
    properties = JSONField(default=dict)
    status = models.IntegerField(default=0, choices=SHOOT_STATUS_CHOICES)
    selected_shoot_image = models.IntegerField(null=True, blank=True)
    scale = models.FloatField(default=1)

class ShootImage(models.Model):
    def image_upload_dir(self, filename):
        return "backend/shoot/%s/%s" % (self.shoot.id, self.id)

    shoot = models.ForeignKey(
        ShootSetup, related_name="shoot_setup_background", on_delete=models.CASCADE
    )
    background_image = models.ImageField(
        _("Background Image"), upload_to=image_upload_dir, blank=True, null=True, max_length=255
    )
    background_image_base64 = models.CharField('Background Image Base 64', max_length=900000, blank=True, null=True)
    image_name = models.CharField(_('Image Name'), max_length=250, null=True, blank=True)
