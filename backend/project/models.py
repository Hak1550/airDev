from django.db import models

# Create your models here.

from django.contrib.postgres.fields import JSONField
from django.utils.translation import ugettext_lazy as _
from users.models import User
from organisation.models import Organisation
from datetime import date
from datetime import datetime 
from django.utils import timezone
# from generic.models import BaseModel


PROJECT_STATUS_CHOICES = (
    (0, "Archive"),
    (1, "Active"),
)

class Project(models.Model):

    def project_upload_dir(self, filename):
        return "backend/project/%s-%s/%s" % (self.project_id, self.owner.id, filename)

    def project_logo_upload_dir(self, filename):
        return "backend/project/logo/%s-%s/%s" % (self.project_id, self.owner.id, filename)

    owner = models.ForeignKey(User, verbose_name="project_owner", on_delete=models.CASCADE)
    organisation = models.ForeignKey(Organisation, related_name="organisation_project", on_delete=models.CASCADE, default=None, null=True, blank=True)
    project_id = models.CharField(_('Project Id'), max_length=250, blank=True, null=True)
    name = models.CharField(_('Project Name'), max_length=250)
    client = models.CharField(_('Client'), max_length=250, blank=True, null=True)
    shoot_date = models.DateField(_('Shoot Date'), blank=True, null=True)
    shoot_start_date = models.DateField(_('Shoot Start Date'), blank=True, null=True)
    shoot_end_date = models.DateField(_('Shoot End Date'), blank=True, null=True)
    shoot_time = models.TimeField(_("Shhot Time"), null=True, blank=True)
    location = models.CharField(_('Location'), max_length=250, blank=True)
    description = models.TextField(
        max_length=1024,
        blank=True,
        null=True
    )
    logo = models.ImageField(_('Logo'), upload_to=project_logo_upload_dir, blank=True, null=True)
    cover_image = models.ImageField(_('Cover Image'), upload_to=project_upload_dir, blank=True, null=True)
    is_active = models.BooleanField(_("Is Active"), default=False)
    is_published = models.BooleanField(_("Is Published"), default=False)
    status = models.IntegerField(default=1, choices=PROJECT_STATUS_CHOICES)
    is_removed = models.BooleanField(_("Is Removed"), default=False)
    members = models.ManyToManyField(
        User,
        related_name="project_members",
        verbose_name="Project Members",
        blank=True,
        symmetrical=False
    )
    properties = JSONField(default=dict)
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    def __str__(self):
        return str(self.name)


class ProjectFiles(models.Model):

    def project_file_upload_dir(self, filename):
        return "backend/project/file/%s-%s" % (self.project, filename)

    project = models.ForeignKey(Project, related_name="project_files", on_delete=models.CASCADE)
    file = models.FileField(_('Logo'), upload_to=project_file_upload_dir, blank=True)
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

class ProjectComms(models.Model):

    project = models.ForeignKey(Project, related_name="project_comms", on_delete=models.CASCADE)
    type = models.CharField(_('Type'), max_length=250, blank=True, null=True)
    title = models.CharField(_('Title'), max_length=250, blank=True, null=True)
    url = models.CharField(_('Url'), max_length=250, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.project)+ str(self.title) + 'Comm Link'

class ProjectLinks(models.Model):

    project = models.ForeignKey(Project, related_name="project_links", on_delete=models.CASCADE)
    title = models.CharField(_('Title'), max_length=250, blank=True, null=True)
    url = models.CharField(_('Url'), max_length=250, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.project)+ str(self.title) + 'Comm Link'
