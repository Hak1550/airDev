from genericpath import exists
from attr import field
from api.v1.payment.serializers import PackageSerializer
from api.v1.organisation.serializers import OrgansationSerializer
from payment.models import PACKAGE_TYPES, Package
from gear.models import AirCamera, AirCameraAssignedToProject, AirInstance, AirInstanceAssignedToProject, Camera, OrganisationOwnedCamera
from rest_framework import serializers


class CameraSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""

    class Meta:
        model = Camera
        fields = (
            "id",
            "owner_name",
            "icon",
            "nick_name",
            "lan_ip",
            "public_ip",
            "_type",
            "air_id",
            "internal_record_format",
            "external_stream_format",
            "firmware_version",
            "subscription_status",
        )

        extra_kwargs = {
            "air_id": {
                "required": True,
            }
        }


class AirCameraSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""

    class Meta:
        model = AirCamera
        fields = (
            "id",
            "owner_name",
            "nick_name",
            "lan_ip",
            "public_ip",
            "air_id",
            "internal_record_format",
            "status",
            "external_stream_format",
        )


def is_valid(value):
    from rest_framework.serializers import ValidationError
    exists = AirCamera.objects.filter(air_id=value).exists()
    if not exists:
        raise ValidationError("Wrong AIR Camera Id!!")  

class OnboardAirCameraSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""
    # camera = AirCameraSerializer()

    class Meta:
        model = OrganisationOwnedCamera
        fields = (
            "id",
            "organisation",
            "camera",
            "owner_name",
            "nick_name",
            "lan_ip",
            "public_ip",
            "internal_record_format",
            "external_stream_format",
            "is_active",
            "is_paid",
            "is_expired",
            "is_deactivated",
            "start_date",
            "end_date",
        )
        extra_kwargs = {
            'is_active': {
                'read_only': True
            },
            'is_paid': {
                'read_only': True
            },
            'is_expired': {
                'read_only': True
            },
            'start_date': {
                'read_only': True
            },
            'end_date': {
                'read_only': True
            },
            'camera': {
                'read_only': True
            }
        }


class AirCameraUpdateSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""

    class Meta:
        model = AirCamera
        fields = (
            "owner_name",
            "nick_name",
            "lan_ip",
            "public_ip",
            "air_id",
            "internal_record_format",
            "status",
            "external_stream_format",
        )
        extra_kwargs = {
            "air_id": {
                "required": False,
            },
            "nick_name": {
                "required": False
            }
        }


class AirInstanceUpdateSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""

    class Meta:
        model = AirInstance
        fields = (
            "instance_type",
            "organisation",
            "instance_size",
            "instance_regioin",
            "owner_name",
            "nick_name",
            "lan_ip",
            "public_ip",
            "air_id",
            "status",
        )
        extra_kwargs = {
            "air_id": {
                "required": False,
            },
            "nick_name": {
                "required": False
            }
        }
        
        
# class AirInstanceAssignedToProjectSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AirInstanceAssignedToProject
#         fields = "__all__"


class OrganisationOwnedCameraSerializer(serializers.ModelSerializer):
    camera = AirCameraSerializer()
    package_info = serializers.SerializerMethodField()
    organisation = OrgansationSerializer()
    is_available = serializers.SerializerMethodField()
    class Meta:
        model = OrganisationOwnedCamera
        fields = "__all__"

    def get_package_info(self, obj):
        package = Package.objects.filter(package_type=PACKAGE_TYPES[1][0]).first()
        data = PackageSerializer(package).data
        return data

    def get_is_available(self, obj):
        status = True
        if AirCameraAssignedToProject.objects.filter(camera=obj.camera).exists():
            status = False
        return status


class AirInstanceReadSerializer(serializers.ModelSerializer):
    package_info = serializers.SerializerMethodField()
    organisation = OrgansationSerializer(read_only=True)
    class Meta:
        model = AirInstance
        fields = "__all__"

    def get_package_info(self, obj):
        package = Package.objects.filter(package_type=PACKAGE_TYPES[2][0]).first()
        data = PackageSerializer(package).data
        return data


class AirInstanceSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""

    class Meta:
        model = AirInstance
        fields = "__all__"

class AirInstanceMyAssetsSerializer(serializers.ModelSerializer):
    """Serializer for the post objects"""
    is_available = serializers.SerializerMethodField()

    class Meta:
        model = AirInstance
        fields = "__all__"

    def get_is_available(self, obj):
        status = True
        if AirInstanceAssignedToProject.objects.filter(instance=obj).exists():
            status = False
        return status