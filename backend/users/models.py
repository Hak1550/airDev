import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from django.contrib.admin.models import LogEntry, DELETION
from django.utils import timezone
from organisation.models import ORGANISATION_ROLES, Organisation
from generic.models import BaseModel

ADMIN = 1
PRODUCER = 2
DIRECTOR = 3
TECHNICAL_DIRECTOR = 4
CAMERA_OP = 5
FIELD_CREW = 6
CLIENT = 7
TALENT = 8
EDIT_OP = 9
GRFX_OP = 10
AUDIO_OP = 11
PLAYBACK_OP = 12
NO_ROLE = 13

ROLES_BY_NAME = {
    "ADMIN": "ADMIN",
    "PRODUCER": "PRODUCER",
    "DIRECTOR": "DIRECTOR",
    "TECHNICAL_DIRECTOR": "TECHNICAL_DIRECTOR",
    "CAMERA_OP": "CAMERA_OP",
    "FIELD_CREW": "FIELD_CREW",
    "CLIENT": "CLIENT",
    "TALENT": "TALENT",
    "EDIT_OP": "EDIT_OP",
    "GRFX_OP": "GRFX_OP",
    "AUDIO_OP": "AUDIO_OP",
    "PLAYBACK_OP": "PLAYBACK_OP",
    "NO_ROLE": "NO_ROLE"
}

roles_choices = [
    ("ADMIN", "ADMIN"),
    ("PRODUCER", "PRODUCER"),
    ("DIRECTOR", "DIRECTOR"),
    ("TECHNICAL_DIRECTOR", "TECHNICAL_DIRECTOR"),
    ("CAMERA_OP", "CAMERA_OP"),
    ("FIELD_CREW", "FIELD_CREW"),
    ("CLIENT", "CLIENT"),
    ("TALENT", "TALENT"),
    ("EDIT_OP", "EDIT_OP"),
    ("GRFX_OP", "GRFX_OP"),
    ("AUDIO_OP", "AUDIO_OP"),
    ("PLAYBACK_OP", "PLAYBACK_OP"),
    ("NO_ROLE", "NO_ROLE")
]

# global_roles = [
#     ("ADMIN", "ADMIN"),
#     ("PRODUCER", "PRODUCER"),
#     ("CREW_MEMBER", "CREW_MEMBER"),
#     ("NO_ROLE", "NO_ROLE")
# ]

# class GlobalRole(models.Model):
#     name = models.CharField(_('Role Name'), max_length=32, choices=global_roles, unique=True)
#     description = models.CharField(_('Description'), max_length=512, blank=True)
#     created = models.DateTimeField(auto_now_add=True, blank=True)
#     modified = models.DateTimeField(auto_now_add=True, blank=True)
#     is_removed = models.BooleanField(_("Is Removed"), default=False)

#     def __str__(self):
#         return self.name

class Role(models.Model):
    name = models.CharField(_('Role Name'), max_length=32, choices=roles_choices, unique=True)
    description = models.CharField(_('Description'), max_length=512, blank=True)
    created = models.DateTimeField(auto_now_add=True, blank=True)
    modified = models.DateTimeField(auto_now_add=True, blank=True)
    is_removed = models.BooleanField(_("Is Removed"), default=False)

    def __str__(self):
        return self.name


class ActivityTracker(LogEntry):
    """
        Lets re-use the django LogEntry for DRF
    """
    pass


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    is_online = models.BooleanField(_("Online"), default=False)
    last_activity = models.DateTimeField(_("Last Activity"), auto_now_add=True, blank=True)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def __str__(self):
        name = self.get_full_name()
        if not name:
            name = self.email
        if not self.email:
            name = self.username
        return name


class Country(models.Model):
    code = models
    name = models.CharField(max_length=50)

    def __str__(self):
        return "%s the place" % self.name


class UserInformation(models.Model):
    import pytz
    TIMEZONES = tuple(zip(pytz.all_timezones, pytz.all_timezones))

    def pic_upload_dir(self, filename):
        return "backend/user/%s/%s" % (self.id, filename)

    user = models.OneToOneField(User, verbose_name="business_user", on_delete=models.CASCADE)
    first_name = models.CharField(_('First Name'), max_length=100)
    last_name = models.CharField(_('Last Name'), max_length=100)
    nick_name = models.CharField(_('Nick Name'), max_length=100, blank=True)
    profile_image = models.ImageField(_('Profile Image'), upload_to=pic_upload_dir, blank=True, null=True)
    company_name = models.CharField(_("Company Name"), max_length=100)
    job_title = models.CharField(_('Job Title'), max_length=100, blank=True)
    phone = models.CharField(_("Phone"), max_length=100, blank=True)
    location = models.CharField(_("Location"), max_length=100, blank=True)
    country = models.CharField(_("Location"), max_length=100, blank=True)
    timezone = models.CharField(default='UTC', choices=TIMEZONES, max_length=100)
    role = models.ForeignKey(
        Role,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name=_('Role')
    )
    global_role = models.IntegerField(default=4, choices=ORGANISATION_ROLES)
    global_member = models.BooleanField(_("Global Search"), default=False)
    tutorial = models.BooleanField(_("Show Tutorial"), default=True)
    first_login = models.BooleanField(_("First Login"), default=True)
    is_active = models.BooleanField(_("Is Active"), default=True)
    stripe_customer_id = models.CharField(_("Stripe Customer Id"), max_length=255, blank=True)

    def __str__(self):
        return "%s Company Information" % self.user


class InvitedUser(BaseModel):
    from project.models import Project

    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False)
    email = models.CharField(_("Email"), max_length=250, editable=False)
    project = models.ForeignKey(Project, null=True, blank=True, related_name="invited_project",
                on_delete=models.CASCADE, verbose_name=_('Invited Project'), editable=False)
    organisation = models.ForeignKey(Organisation, null=True, blank=True, related_name="invited_organisation",
                on_delete=models.CASCADE, verbose_name=_('Invited Organisation'), editable=False)
    role = models.IntegerField(default=13 , editable=False)
    is_expired = models.BooleanField(_("Is Expired"), default=False)


class ValidateUserEmail(BaseModel):
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False)
    email = models.CharField(_("Email"), max_length=250, editable=False)
    is_confirmed = models.BooleanField(_("Is Confirmed"), default=False)

class ResetPassword(BaseModel):
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False)
    email = models.CharField(_("Email"), max_length=250, editable=False)
    is_reset = models.BooleanField(_("Is Reset"), default=False)

class ResetPasswordToken(models.Model):
    code = models.CharField(_("Code"), max_length=250, editable=False)
    is_claim = models.BooleanField(_("Is Claim"), default=False)
    is_password_change = models.BooleanField(_("Is Password Change"), default=False)
    user = models.ForeignKey('users.User', null=True, blank=True, related_name="reset_token_user",
                             on_delete=models.CASCADE, verbose_name=_('User'))

    class Meta:
        ordering = ['-user']

    def get_expiration(self):
        """Set the expiration or default to 24"""
        return getattr(settings, 'EMAIL_LINK_EXPIRY_TIME', 24)
