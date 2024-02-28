from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from generic.common import WasabiS3Config
from permission.models import OrganisationPermissionType
from organisation.models import Collection, CollectionItem, MediaMetadata, Organisation, OrganisationComms, OrganisationMemberMapping, UrlTags
from rest_framework import serializers

User = get_user_model()

class OrgansationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation
        fields = "__all__"

class UploadItemWasabiBucketSerializer(serializers.Serializer):
    items = serializers.FileField(required=True)
    file_infos = serializers.CharField(required=True)
    thumbnails = serializers.FileField(required=True)


class OrganisationMemberMappingSerializer(serializers.ModelSerializer):
    allowed_permissions = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = OrganisationMemberMapping
        fields = ["id", "organisation", "user", "role", "allowed_permissions"]

    def get_allowed_permissions(self, obj):
        try:
            org_permissions = OrganisationPermissionType.objects.get(role=obj.role)
            return org_permissions.permissions
        except:
            return []

class OrganisationMemberMappingReadSerializer(serializers.ModelSerializer):
    organisation = OrgansationSerializer()
    allowed_permissions = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = OrganisationMemberMapping
        fields = ["id", "organisation", "user", "role", "allowed_permissions"]

    def get_allowed_permissions(self, obj):
        try:
            org_permissions = OrganisationPermissionType.objects.get(role=obj.role)
            return org_permissions.permissions
        except:
            return []

class OrganisationCommsSerializer(serializers.ModelSerializer):
    """Serializer for object author info"""

    class Meta:
        model = OrganisationComms
        fields = ('id', 'organisation', 'type', 'title', 'url', 'is_copy_to_projects', 'created_at', 'updated_at')

class MediaMetadataSerializer(serializers.ModelSerializer):
    presigned_url = serializers.SerializerMethodField(read_only=True)
    s3_client = WasabiS3Config.client_connection()
    expiry_object = 60 * 30 * 20
    """Serializer for object author info"""

    class Meta:
        model = MediaMetadata
        fields = '__all__'

    def get_presigned_url(self, obj):
        metadata = obj.metadata
        if metadata and metadata.get("key", None):
            response = self.s3_client.generate_presigned_url('get_object',
                        Params={
                            'Bucket': obj.organisation.wasabi_bucket_name,
                            'Key': metadata.get("key", None)
                        },
                        ExpiresIn=self.expiry_object)
            return response
        return None

class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ('id', 'organisation', 'name', 'created', 'modified')

class GetCollectionSerializer(serializers.ModelSerializer):
    s3_client = WasabiS3Config.client_connection()
    expiry_object = 60 * 30 * 20
    assets = serializers.SerializerMethodField(read_only=True)
    presigned_urls = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Collection
        fields = ('id', 'organisation', 'name', 'assets', 'presigned_urls', 'created', 'modified')
        depth = 1
    
    def get_assets(self, obj):
        return obj.collection_items.count()

    @classmethod
    def prepare_presigned_url(self, key, bucket):
        try:
            url = self.s3_client.generate_presigned_url('get_object',
                                                        Params={
                                                            'Bucket': bucket,
                                                            'Key': key
                                                        },
                                                        ExpiresIn=self.expiry_object)
        except:
            url = ''
            pass
        return url
            

    def get_presigned_urls(self, obj):
        urls = []
        for item in obj.collection_items.all():
            if item.bucket and item.key:
                wasabi_bucket_name = item.bucket
                if wasabi_bucket_name:
                    urls.append(self.prepare_presigned_url(item.key, wasabi_bucket_name))
        return urls
        

class CollectionItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CollectionItem
        fields = ('id', 'collection', 'organisation', 'key', 'thumbnail_url', 'bucket', 'created', 'modified')

class GetCollectionItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CollectionItem
        fields = ('id', 'collection', 'organisation', 'key', 'thumbnail_url', 'bucket', 'created', 'modified')
        depth = 1


class UrlTagsSerializer(serializers.ModelSerializer):

    class Meta:
        model = UrlTags
        fields = ('id', 'url', 'tags')
