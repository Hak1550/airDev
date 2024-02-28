from api.v1.organisation.serializers import OrgansationSerializer
from users.models import UserInformation
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from project.models import Project, ProjectFiles, ProjectComms, ProjectLinks
from permission.models import ProjectPermissionMapping, PermissionType
from rest_framework import serializers
from django.http import HttpRequest


class ProjectPermissionMappingSerializer(serializers.ModelSerializer):
    """Serializer for object author info"""

    class Meta:
        model = ProjectPermissionMapping
        fields = ("id", "project", "users", "role")


class AuthorSerializer(serializers.ModelSerializer):
    """Serializer for object author info"""

    class Meta:
        model = get_user_model()
        fields = ("id", "first_name", "last_name", "username", "email")

class ProjectFilesSerializer(serializers.ModelSerializer):
    """Serializer for object author info"""

    class Meta:
        model = ProjectFiles
        fields = ('id', 'project', 'file', 'created_at', 'updated_at')

class ProjectCommsSerializer(serializers.ModelSerializer):
    """Serializer for object author info"""

    class Meta:
        model = ProjectComms
        fields = ('id', 'project', 'type', 'title', 'url', 'created_at', 'updated_at')

class ProjectLinksSerializer(serializers.ModelSerializer):
    """Serializer for object author info"""

    class Meta:
        model = ProjectLinks
        fields = ('id', 'project', 'title', 'url', 'created_at', 'updated_at')


class ProjectMemberSerializer(serializers.ModelSerializer):
    user_details = serializers.SerializerMethodField()

    def get_user_details(self, obj):
        return {
            "id": obj.user.id,
            "first_name": obj.user.first_name,
            "last_name": obj.user.last_name,
            "username": obj.user.username,
            "email": obj.user.email,
        }

    class Meta:
        model = UserInformation
        fields = (
            "user",
            "user_details",
            "first_name",
            "last_name",
            "nick_name",
            "profile_image",
            "phone",
            "role",
            "is_active",
        )


class ReadProjectSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""

    owner = AuthorSerializer(read_only=True)
    organisation = OrgansationSerializer()
    members = serializers.SerializerMethodField()
    permission_obj = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = (
            "id",
            "owner",
            "organisation",
            "logo",
            "cover_image",
            "project_id",
            "name",
            "client",
            "location",
            "shoot_date",
            "shoot_start_date",
            "shoot_end_date",
            "shoot_time",
            "description",
            "members",
            "properties",
            "status",
            "permission_obj",
            "created_at",
            "updated_at",
            "is_published"
        )
        # exclude = ["owner"]
        extra_kwargs = {
            "description": {
                "required": False,
            },
            "members": {
                "required": False,
            }
        }
        
    def _get_request(self):
        request = self.context.get("request")
        if (
                request
                and not isinstance(request, HttpRequest)
                and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def get_permission_obj(self, obj):
        permission_obj_list = []
        try:
            user = obj.owner
            if self.context.get("request"):
                user = self.context.get("request").user
                project_permission_obj = ProjectPermissionMapping.objects.filter(
                    project=obj, users__id__icontains=user.id
                )
                for project_permission in project_permission_obj:
                    user_role = project_permission.role
                    permission_type_obj = PermissionType.objects.get(role=user_role)
                    permission_obj = {
                        "role": {"id": user_role.id, "name": user_role.name},
                        "allowed_permissions": permission_type_obj.permissions,
                    }
                    permission_obj_list.append(permission_obj)
        except:
            return permission_obj_list
        return permission_obj_list

    def get_members(self, obj):
        members = []
        try: 
            for user in obj.members.all():
                user_information = UserInformation.objects.filter(user=user).first()
                if user_information:
                    user_data = ProjectMemberSerializer(instance=user_information).data
                    user_data['role_obj'] = {
                        "id": user_information.role.id,
                        "name": user_information.role.name
                    }
                    members.append(user_data)
            members = sorted(members, key=lambda i: str(i['first_name']).lower())
        except:
            pass
        return members

class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""

    owner = AuthorSerializer(read_only=True)
    members = serializers.SerializerMethodField()
    permission_obj = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = (
            "id",
            "owner",
            "organisation",
            "logo",
            "cover_image",
            "project_id",
            "name",
            "client",
            "location",
            "shoot_date",
            "shoot_start_date",
            "shoot_end_date",
            "shoot_time",
            "description",
            "members",
            "properties",
            "status",
            "permission_obj",
            "created_at",
            "updated_at",
            "is_published"
        )
        # exclude = ["owner"]
        extra_kwargs = {
            "description": {
                "required": False,
            },
            "members": {
                "required": False,
            }
        }

    def _get_request(self):
        request = self.context.get("request")
        if (
                request
                and not isinstance(request, HttpRequest)
                and hasattr(request, "_request")
        ):
            request = request._request
        return request

    def get_permission_obj(self, obj):
        permission_obj_list = []
        try:
            user = obj.owner
            if self.context.get("request"):
                user = self.context.get("request").user
                project_permission_obj = ProjectPermissionMapping.objects.filter(
                    project=obj, users__id__icontains=user.id
                )
                for project_permission in project_permission_obj:
                    user_role = project_permission.role
                    permission_type_obj = PermissionType.objects.get(role=user_role)
                    permission_obj = {
                        "role": {"id": user_role.id, "name": user_role.name},
                        "allowed_permissions": permission_type_obj.permissions,
                    }
                    permission_obj_list.append(permission_obj)
        except:
            return permission_obj_list
        return permission_obj_list

    def get_members(self, obj):
        members = []
        try: 
            for user in obj.members.all():
                user_information = UserInformation.objects.filter(user=user).first()
                if user_information:
                    user_data = ProjectMemberSerializer(instance=user_information).data
                    user_data['role_obj'] = {
                        "id": user_information.role.id,
                        "name": user_information.role.name
                    }
                    members.append(user_data)
        except:
            pass
        return members
