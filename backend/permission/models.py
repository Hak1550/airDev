from django.db import models
from django.contrib.postgres.fields import JSONField
from users.models import Role, User
from users.models import NO_ROLE
from project.models import Project
from organisation.models import ORGANISATION_ROLES
from django.utils.translation import ugettext_lazy as _
from django.contrib.postgres.fields import ArrayField


# Create your models here.


class PermissionType(models.Model):
    role = models.OneToOneField(
        Role, verbose_name="Global Role", on_delete=models.CASCADE
    )
    permissions = JSONField(default=dict)


class OrganisationPermissionType(models.Model):
    role = models.IntegerField(default=4, choices=ORGANISATION_ROLES)
    permissions = JSONField(default=dict)

class ProjectPermissionMapping(models.Model):
    project = models.ForeignKey(
        Project,
        verbose_name="Project Permission",
        related_name="project_permission",
        on_delete=models.CASCADE,
        null=False,
    )
    users = models.ManyToManyField(User, related_name="project_users")
    role = models.ForeignKey(
        Role, verbose_name="Project Role", on_delete=models.CASCADE, default=NO_ROLE
    )
    is_active = models.BooleanField(_("Is Active"), default=True)
