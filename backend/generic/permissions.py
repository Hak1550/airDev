from lib2to3.pytree import Base
import logging
from organisation.models import ORGANISATION_ROLES, OrganisationMemberMapping
from permission.models import ProjectPermissionMapping
from rest_framework.permissions import (
    BasePermission,
    SAFE_METHODS,
    IsAuthenticatedOrReadOnly,
)
from django.conf import settings

from users.models import (
    ADMIN,
    PRODUCER,
    DIRECTOR,
    CAMERA_OP,
    FIELD_CREW,
    CLIENT,
    TALENT,
    EDIT_OP,
)


class CustomBasePermission(BasePermission):
    allowed_user = []

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        if hasattr(request.user, "profile"):
            if request.user.profile.role.id in self.allowed_user:
                return True
        return False


class AllowAny(BasePermission):
    def has_permission(self, request, view):
        return True


class IsOwnerOrReadOnly(BasePermission):
    """Custom permission class which allow
    object owner to do all http methods"""

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.user.id == request.user.id


class IsProducer(BasePermission):
    """
    Custom permission to check wheather the user type is producer
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user.role.id in [PRODUCER, ADMIN]


class IsProjectOwnerOrReadOnly(BasePermission):
    """Custom permission class which allow
    object owner to do all http methods"""

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.owner.id == request.user.id

class IsProjectOwnerOrProducerORReadOnly(BasePermission):
    """Custom permission class which allow
    object owner to do all http methods"""

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        if obj.owner.id == request.user.id:
            return True

        user_project_producer = ProjectPermissionMapping.objects.filter(project=obj, users__id__icontains=request.user.id, role = PRODUCER).exists()
        if user_project_producer:
            return True

        user_org_producer = OrganisationMemberMapping.objects.filter(organisation=obj.organisation, user=request.user, role = ORGANISATION_ROLES[1[0]]).exists()
        if user_org_producer:
            return True


class IsOwnerOrPostOwnerOrReadOnly(BasePermission):
    """Custom permission class which allow comment owner to do all http methods
    and Post Owner to DELETE comment"""

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        if request.method == "DELETE" and obj.post.author.id == request.user.id:
            return True

        return obj.author.id == request.user.id


class CustomPermission(BasePermission):
    def has_permission(self, request, view):
        return True


class ThirdPartyPermission(BasePermission):

    def has_permission(self, request, view):
        if request.data.get("apikey", "") == settings.SECRET_KEY:
            return True
