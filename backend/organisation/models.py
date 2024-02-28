from django.db import models
from django.conf import settings
# from model_utils.models import TimeStampedModel, SoftDeletableModel
ORGANISATION_ROLES = (
    (1, "Admin"),
    (2, "Producer"),
    (3, "Crew"),
    (4, "No Role")
)
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from generic.models import BaseModel, BaseTimeModel
from django.contrib.postgres.fields import JSONField
import uuid

# Create your models here.

# class Organisation(TimeStampedModel, SoftDeletableModel):
#     name = models.CharField('Name', max_length=150, blank=True, null=True)

class Organisation(models.Model):
    owner = models.OneToOneField(settings.AUTH_USER_MODEL, verbose_name="Owner", on_delete=models.CASCADE, related_name="organisation_owner", default=None)
    name = models.CharField('Name', max_length=150, blank=True, null=True)
    wasabi_bucket_name = models.CharField('Wasabi Bucket Name', max_length=150, blank=True, null=True)
    camera = models.ManyToManyField(settings.AIR_CAMERA_MODEL, verbose_name="Organisation Camera", related_name="organisation_camera", blank=False)

    def __str__(self):
        return str(self.name)

    class Meta:
        unique_together = ('name',)

class OrganisationMemberMapping(models.Model):
    organisation = models.ForeignKey(Organisation, verbose_name="Organisation", on_delete=models.CASCADE, related_name="organisation_mapping")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name="User", on_delete=models.CASCADE, related_name="organisation_member")
    role = models.IntegerField(default=4, choices=ORGANISATION_ROLES)

    class Meta:
        unique_together = ('organisation', 'user',)

class OrganisationComms(models.Model):

    organisation = models.ForeignKey(Organisation, related_name="organisation_comms", on_delete=models.CASCADE)
    type = models.CharField(_('Type'), max_length=250, blank=True, null=True)
    title = models.CharField(_('Title'), max_length=250, blank=True, null=True)
    url = models.CharField(_('Url'), max_length=250, blank=True, null=True)
    is_copy_to_projects = models.BooleanField(_("Copy to projects"), default=False)
    created_at = models.DateTimeField(default=timezone.now, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.organisation)+ str(self.title) + 'Comm Link'

class Collection(BaseTimeModel):
    organisation = models.ForeignKey(Organisation, related_name="organisation_collections", on_delete=models.CASCADE)
    name = models.CharField(_('Collection Name'), max_length=250, blank=False)

    class Meta:
        unique_together = ('organisation', 'name',)

    def __str__(self):
        return str(self.name)

class CollectionItem(BaseTimeModel):
    collection = models.ForeignKey(Collection, related_name="collection_items", on_delete=models.CASCADE)
    organisation = models.ForeignKey(Organisation, related_name="organisation_collection_items", on_delete=models.CASCADE, default=None, blank=True, null=True)
    key = models.CharField(_('key'), max_length=250, blank=False, null=True)
    bucket = models.CharField(_('Bucket'), max_length=250, blank=False, null=True)
    thumbnail_url = models.URLField(_('Url'), max_length=250, blank=False, null=True)

    # class Meta:
    #     unique_together = ("collection", "key")


class UrlTags(BaseTimeModel):
    url = models.CharField(_('Url'), max_length=250, blank=False)
    tags = JSONField(default=list)


class MediaMetadata(BaseTimeModel):
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False)
    organisation = models.ForeignKey(Organisation, related_name="organisation_media_metadata", on_delete=models.CASCADE, default=None, blank=True, null=True)
    metadata = JSONField(default=list)