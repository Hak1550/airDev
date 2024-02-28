from ast import operator
from django.db.models import Q
from shoot_setup.models import ShootSetup, ShootImage
from gear.models import AirCamera, Camera
from gear.models import (
    CameraAssignedToProject,
    AirCameraAssignedToProject,
    AirConnectionsToShoot,
    AirOperatorAssignedToShoot,
)
from rest_framework import serializers
from users.models import UserInformation, ROLES_BY_NAME, Role
from permission.models import ProjectPermissionMapping
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()


class CameraAssignedToProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CameraAssignedToProject
        fields = (
            "camera",
            "project",
            "camera_x",
            "camera_y",
            "camera_rotation",
            "camera_operator",
            "camera_operator_x",
            "camera_operator_y",
            "camera_operator_rotation",
        )
        extra_kwargs = {
            "project": {
                "camera": True,
            }
        }


class ShootMemberSerializer(serializers.ModelSerializer):
    """Serializer for object author info"""

    # user_information = ShootMemberInformationSerializer(read_only=True)
    class Meta:
        model = UserInformation
        fields = (
            "user",
            "first_name",
            "last_name",
            "nick_name",
            "profile_image",
            "role",
            "is_active",
        )


class ShootSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""

    permission_obj = serializers.SerializerMethodField()
    connected_camera = serializers.SerializerMethodField()
    background_image = serializers.SerializerMethodField()
    background_image_list = serializers.SerializerMethodField()

    class Meta:
        model = ShootSetup
        fields = (
            "id",
            "background_image",
            "background_image_list",
            "project",
            "properties",
            "status",
            "permission_obj",
            "connected_camera",
            "scale"
        )
        # exclude = ["owner"]
        extra_kwargs = {
            "director": {
                "required": True,
            }
        }

    def get_background_image(self, obj):
        shoot_image = None
        if obj.selected_shoot_image:
            shoot_image = ShootImage.objects.filter(pk=obj.selected_shoot_image).first()
            if shoot_image and shoot_image.background_image_base64:
                return shoot_image.background_image_base64 if shoot_image else None
        return None

    def get_background_image_list(self, obj):
        shoot_image_list = ShootImage.objects.filter(shoot_id=obj.id)
        if shoot_image_list:
            return [
                {"id": x.id, "background_image": x.background_image_base64, "image_name": x.image_name}
                for x in shoot_image_list
            ]
        return None

    def get_connected_camera(self, obj):
        connected_camera = AirConnectionsToShoot.objects.filter(
            camera__project_id=obj.project_id
        )

        condition = Q(
            ~Q(air_connections__project__id=obj.project_id)
            & Q(project_id=obj.project_id)
        )

        camera_operators_not_assigned = AirOperatorAssignedToShoot.objects.filter(
            condition
        )

        response = []
        for c in list(connected_camera):
            response.append(
                {
                    "camera_id": c.camera.camera_id,
                    "camera": {
                        "air_id": c.camera.camera.air_id,
                        "external_stream_format": c.camera.camera.external_stream_format,
                        "id": c.camera.camera.id,
                        "internal_record_format": c.camera.camera.internal_record_format,
                        "lan_ip": c.camera.camera.lan_ip,
                        "nick_name": c.camera.camera.nick_name,
                        "owner_name": c.camera.camera.owner_name,
                        "public_ip": c.camera.camera.public_ip,
                        "status": c.camera.camera.status,
                    },
                    "camera_x": c.camera_x,
                    "camera_y": c.camera_y,
                    "camera_rotation": c.camera_rotation,
                    "camera_image_x": c.camera_image_x,
                    "camera_image_y": c.camera_image_y,
                    "camera_placeholder": c.camera_placeholder,
                    "camera_operator": [
                        {
                            "name": camera_operator.operator.userinformation.first_name
                            + " "
                            + camera_operator.operator.userinformation.last_name,
                            "job_title": "Camera Operator",
                            "avatar": camera_operator.operator.userinformation.profile_image.url
                            if camera_operator.operator.userinformation.profile_image
                            else None,
                            "id": camera_operator.operator.id,
                            "camera_operator_x": camera_operator.camera_operator_x,
                            "camera_operator_y": camera_operator.camera_operator_y,
                            "camera_operator_rotation": camera_operator.camera_operator_rotation,
                        }
                        for camera_operator in c.camera_operators.all()
                    ],
                }
            )
        for camera_operator in camera_operators_not_assigned:
            response.append(
                {
                    "camera_operator": {
                        "name": camera_operator.operator.userinformation.first_name
                        + " "
                        + camera_operator.operator.userinformation.last_name,
                        "job_title": "Camera Operator",
                        "avatar": camera_operator.operator.userinformation.profile_image.url
                        if camera_operator.operator.userinformation.profile_image
                        else None,
                        "id": camera_operator.operator.id,
                        "camera_operator_x": camera_operator.camera_operator_x,
                        "camera_operator_y": camera_operator.camera_operator_y,
                        "camera_operator_rotation": camera_operator.camera_operator_rotation,
                    }
                }
            )
        return response

    def get_permission_obj(self, obj):
        permission_obj = []
        project_permission_obj = ProjectPermissionMapping.objects.filter(
            project=obj.project
        )
        for single_user_permission in project_permission_obj:
            permission_obj.append(
                {
                    "role": {
                        "id": single_user_permission.role.id,
                        "name": single_user_permission.role.name,
                    },
                    "users": [
                        {
                            "first_name": user.userinformation.first_name,
                            "is_active": user.userinformation.is_active,
                            "last_name": user.userinformation.last_name,
                            "nick_name": user.userinformation.nick_name,
                            "profile_image": user.userinformation.profile_image.url
                            if user.userinformation.profile_image
                            else None,
                            "id": user.id,
                        }
                        for user in single_user_permission.users.all()
                    ],
                }
            )
        return permission_obj


class ShootBackgroundUpdateSerializer(serializers.ModelSerializer):
    background_url = serializers.SerializerMethodField()
    class Meta:
        model = ShootImage
        fields = ("background_image", "shoot", "background_url", "background_image_base64", "image_name")

    def get_background_url(self, obj):
        if obj.background_image:
            image_url_in_bucket = obj.background_image.url
            if "media/" in obj.background_image.url:
                image_url_in_bucket = obj.background_image.url.split("media/")[1]
            return image_url_in_bucket
        return None


class ShootUpdateSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""

    camera_connections = serializers.JSONField(write_only=True)
    connected_camera = serializers.ModelSerializer(read_only=True)

    def update(self, instance, validated_data):
        print(instance)
        print(validated_data)
        instance.scale = validated_data.get('scale', instance.scale)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        # instance.scale = validated_data.get('name', instance.scale)
        try:
            camera_connections = validated_data.pop("camera_connections")
            selected_shoot_image = validated_data.pop("selected_shoot_image")
            AirOperatorAssignedToShoot.objects.filter(project=instance.project).delete()

            AirConnectionsToShoot.objects.filter(project=instance.project).delete()

            camera_role = Role.objects.get(name=ROLES_BY_NAME["CAMERA_OP"])

            permission = ProjectPermissionMapping.objects.filter(
                project=instance.project, role=camera_role
            )

            permission = permission.first()
            permission.users.clear()
            permission.save()

            for connection in camera_connections:
                lan_ip = connection.pop("lan_ip", "")
                connection_obj = None
                if "camera_id" in connection:
                    if lan_ip:
                        AirCamera.objects.filter(id=connection["camera_id"]).update(
                            lan_ip=lan_ip
                        )
                    camera = AirCameraAssignedToProject.objects.get(
                        project_id=instance.project,camera_id=connection.get("camera_id", 0)
                    )
                    data = {
                        "camera_x": connection.get("camera_x", 0),
                        "camera_y": connection.get("camera_y", 0),
                        "camera_image_x": connection.get("camera_image_x", 0),
                        "camera_image_y": connection.get("camera_image_y", 0),
                        "camera_rotation": connection.get("camera_rotation", 0),
                        "camera_placeholder": connection.get("camera_placeholder", 0),
                        "camera": camera,
                        "project": instance.project,
                    }

                    connection_obj = AirConnectionsToShoot.objects.create(**data)

                if "camera_operator_id" in connection:
                    data = {
                        "camera_operator_x": connection["camera_operator_x"],
                        "camera_operator_y": connection["camera_operator_y"],
                        "camera_operator_rotation": connection[
                            "camera_operator_rotation"
                        ],
                    }
                    user = User.objects.get(id=connection["camera_operator_id"])
                    AirOperatorAssignedToShoot.objects.create(
                        **data, project=instance.project, operator=user
                    )
                    permission.users.add(user)
                    permission.save()
                elif "operators" in connection:
                    for op in connection.get("operators", []):
                        data = {
                            "camera_operator_x": op["camera_operator_x"],
                            "camera_operator_y": op["camera_operator_y"],
                            "camera_operator_rotation": op[
                                "camera_operator_rotation"
                            ],
                        }
                        user = User.objects.get(id=op["camera_operator_id"])
                        operator_obj = AirOperatorAssignedToShoot.objects.create(
                            **data, project=instance.project, operator=user
                        )
                        permission.users.add(user)
                        permission.save()
                        connection_obj.camera_operators.add(operator_obj)
                        connection_obj.save()
            if selected_shoot_image:
                instance.selected_shoot_image = selected_shoot_image
                instance.save()
            return instance
        except Exception as ex:
            print(ex)
            return Response(
                {"status": "error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get_connected_camera(self, obj):
        connected_camera = CameraAssignedToProject.objects.filter(
            project_id=obj.project_id
        )
        response = []
        for c in list(connected_camera):
            response.append(
                {
                    "camera_id": c.camera_id,
                    "camera": {
                        "air_id": c.camera.air_id,
                        "external_stream_format": c.camera.external_stream_format,
                        "firmware_version": c.camera.firmware_version,
                        "icon": c.camera.icon if c.camera.icon else None,
                        "id": c.camera.id,
                        "internal_record_format": c.camera.internal_record_format,
                        "lan_ip": c.camera.lan_ip,
                        "nick_name": c.camera.nick_name,
                        "owner_name": c.camera.owner_name,
                        "public_ip": c.camera.public_ip,
                        "subscription_status": c.camera.subscription_status,
                    }
                    if c.camera_id
                    else None,
                    "camera_x": c.camera_x,
                    "camera_y": c.camera_y,
                    "camera_rotation": c.camera_rotation,
                    "camera_operator_id": c.camera_operator_id,
                    "camera_image_x": c.camera_image_x,
                    "camera_image_y": c.camera_image_y,
                    "camera_placeholder": c.camera_placeholder,
                    "camera_operator": {
                        "name": c.camera_operator.userinformation.first_name
                        + " "
                        + c.camera_operator.userinformation.last_name,
                        "job_title": "Camera Operator",
                        "avatar": c.camera_operator.userinformation.profile_image
                        if c.camera_operator.userinformation.profile_image
                        else None,
                        "id": c.camera_operator.id,
                    }
                    if c.camera_operator_id
                    else None,
                    "camera_operator_x": c.camera_operator_x,
                    "camera_operator_y": c.camera_operator_y,
                    "camera_operator_rotation": c.camera_operator_rotation,
                }
            )
        return response

    class Meta:
        model = ShootSetup
        fields = (
            "id",
            "project",
            "properties",
            "status",
            "camera_connections",
            "connected_camera",
            "selected_shoot_image",
            "scale"
        )
        # exclude = ["owner"]
        extra_kwargs = {
            "director": {
                "required": True,
            }
        }
