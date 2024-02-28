# from rest_framework.authtoken.serializers import AuthTokenSerializer
from datetime import datetime
import string
import random
import ast, json, uuid
import shutil
from typing import Dict
from botocore.client import ClientError
# from organisation.tasks import upload_wasabi_object
from permission.models import ProjectPermissionMapping
from organisation.models import ORGANISATION_ROLES, Collection, CollectionItem, MediaMetadata, Organisation, OrganisationComms, OrganisationMemberMapping, UrlTags
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from users.models import (
    ADMIN
)
from api.v1.organisation.serializers import CollectionItemSerializer, CollectionSerializer, GetCollectionItemSerializer, GetCollectionSerializer, MediaMetadataSerializer, OrganisationCommsSerializer, OrganisationMemberMappingReadSerializer, OrgansationSerializer, OrganisationMemberMappingSerializer, UploadItemWasabiBucketSerializer, UrlTagsSerializer
from api.v1.gear.viewsets import AirCameraViewSet
from project.models import Project
from rest_framework import status, viewsets, permissions
from gear.models import AirCamera, Camera, OrganisationOwnedCamera
from users.models import UserInformation
from generic import api
from django.db import transaction
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.db import IntegrityError
from django.conf import settings
from generic.common import WasabiS3Config
import threading
import multiprocessing
import concurrent.futures
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from boto3.s3.transfer import TransferConfig
import requests
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from generic.permissions import ThirdPartyPermission


class AddCollaboratorViewSet(viewsets.ModelViewSet):
    model = OrganisationMemberMapping
    serializer_class = OrganisationMemberMappingSerializer
    read_serializer_class = OrganisationMemberMappingReadSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = OrganisationMemberMapping.objects.all()

    def create(self, request):
        role = request.data.get("role", "")
        _status = status.HTTP_400_BAD_REQUEST
        try:
            if not role:
                user = request.data.get("user", 0)
                if not user:
                    return Response({"error": "Please Provide User"}, status=_status)
                user_profile = UserInformation.objects.get(user=user)
                role = user_profile.global_role
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save(role=role)
                m_data = OrganisationMemberMapping.objects.get(id=serializer.data.get("id", 0))
                data = self.read_serializer_class(m_data).data
                _status = status.HTTP_201_CREATED
                return Response({
                "data": data,
                "status": _status,
                "error": serializer.errors}, status=_status)
            return Response({"error": serializer.errors}, status=_status)
        except:
            return Response({"error": "Something Went Wrong"}, status=_status)
    
    def destroy(self, request, pk=None):
        _status = status.HTTP_400_BAD_REQUEST
        try:
            organisation_member_mapping = OrganisationMemberMapping.objects.get(id=pk)
            user_to_remove = organisation_member_mapping.user
            projects = Project.objects.filter(organisation=organisation_member_mapping.organisation)
            for project_class in projects:
                project = Project.objects.get(id=project_class.id)
                project.members.remove(user_to_remove)
                project_permission_mappings = ProjectPermissionMapping.objects.filter(project=project)
                for project_per_map_class in project_permission_mappings:
                    project_permission_mapping = ProjectPermissionMapping.objects.get(id=project_per_map_class.id)  
                    project_permission_mapping.users.remove(user_to_remove)  
            organisation_member_mapping.delete()
            return Response({"status": 1}, status=status.HTTP_200_OK)
        except:
            return Response({"status": 0}, status=_status)

class CreateOrganisation(APIView):
    model = Organisation
    serializer_class = OrgansationSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, format=None):
        organisation_name = request.data.get("name", "")
        air_id = request.data.get("air_id", "")
        is_camera_exist = AirCameraViewSet.is_valid(air_id)
        _status = status.HTTP_400_BAD_REQUEST
        if not is_camera_exist:
            return Response({"error": "Please pass valid AIR ID"}, status=_status)
        if organisation_name and is_camera_exist:
            try:
                with transaction.atomic():
                    try:
                        organisation = Organisation(owner=request.user, name=organisation_name)
                        organisation.save()
                    except IntegrityError as e:
                        return Response({"error": str(e)}, status=_status)

                    camera = AirCamera.objects.get(air_id=air_id)

                    organisation_owned_cam = OrganisationOwnedCamera(
                        organisation = organisation,
                        camera = camera,
                        owner_name = organisation_name,
                        nick_name = organisation_name,
                        lan_ip = camera.lan_ip,
                        public_ip = camera.public_ip,
                        is_active = True,
                        is_paid = True,
                        stripe_subscription_item_id = 'NA',
                        stripe_subscription_id = 'NA',
                        payment_card_id = 'OTHER',
                        latest_invoice_id = 'NA'
                    )
                    organisation_owned_cam.save()
                    camera.is_available = False
                    camera.save()
                    organisation.camera.add(camera)
                    organisation_mapping = OrganisationMemberMapping(organisation=organisation, user=organisation.owner, role=ORGANISATION_ROLES[0][0])
                    organisation_mapping.save()
                    UserInformation.objects.filter(user=organisation.owner).update(global_role=ORGANISATION_ROLES[0][0])
                    organisation_data = self.serializer_class(organisation).data
                    _status = status.HTTP_201_CREATED
                    return Response({"result": organisation_data}, status=_status)
            except Exception as e:
                return Response({"error": "Something went wrong!!!", "message": str(e)}, status=_status)
        else:
            return Response({"error": "Something went wrong!!!"}, status=_status)


class OrganisationCommsViewset(viewsets.ModelViewSet):
    serializer_class = OrganisationCommsSerializer
    model = OrganisationComms
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self, *args, **kwargs):
        organisation = Organisation.objects.get(owner=self.request.user)
        return self.model.objects.filter(organisation=organisation)

class MediaMetadataViewset(viewsets.ModelViewSet):
    serializer_class = MediaMetadataSerializer
    model = MediaMetadata
    permission_classes = [
        # permissions.IsAuthenticated
        permissions.AllowAny
    ]
    # queryset = MediaMetadata.objects.all()
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter)
    pagination_class = api.MediumResultsSetPagination
    search_fields = [
        'metadata',
        'metadata__key',
        'metadata__name',
        'metadata__title',
        'metadata__description',
        'metadata__notes',
        'metadata__client',
        'metadata__projects',
        'metadata__collections',
        'metadata__tags',
    ]

    def get_serializer_context(self):
        return {"request": self.request}

    def get_queryset(self):
        return self.model.objects.filter(organisation=self.kwargs['organisation_id'])


class CollectionItemsView(APIView):
    model = Collection
    serializer_class = CollectionSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    pagination_class = api.MediumResultsSetPagination

    def get(self, request, collection_id=None):
        _status = status.HTTP_400_BAD_REQUEST
        try:
            instance = self.model.objects.get(id=collection_id)
            if instance:
                page = self.request.GET.get("page", 1)
                ordering = self.request.GET.get("ordering", "")
                search = self.request.GET.get("search", "")
                created__lte = self.request.GET.get("created__lte", "")
                created__gte = self.request.GET.get("created__gte", "")
                data = CollectionItem.objects.filter(collection=instance)
                if search:
                    data = data.filter(key__icontains=search)
                if created__lte:
                    data = data.filter(created__lte=created__lte)
                if created__gte:
                    data = data.filter(created__gte=created__gte)
                if ordering:
                    data = data.order_by(ordering)
                print(data)
                response_data = GetCollectionItemSerializer(data, many=True).data
                paginator = Paginator(response_data, self.pagination_class.page_size)
                try:
                    paginator_data = paginator.page(page)
                except PageNotAnInteger:
                    paginator_data = paginator.page(1)
                except EmptyPage:
                    paginator_data = paginator.page(paginator.num_pages)
                response = {
                    "count": len(response_data),
                    "next": "api/v1/organisation/collection/{}/?page={}".format(instance.id, paginator_data.next_page_number()) if paginator_data.has_next() else None,
                    "previous": "api/v1/organisation/collection/{}/?page={}".format(instance.id, paginator_data.previous_page_number()) if paginator_data.has_previous() else None,
                    "results": paginator_data.object_list
                }
                collection = GetCollectionSerializer(instance).data
                return Response({"result": response, "collection": collection})
        except Exception as e:
            return Response({"result": "Fail", "error": str(e), "status": 0}, status=_status)


class CollectionViewset(viewsets.ModelViewSet):
    model = Collection
    permission_classes = [
        permissions.IsAuthenticated
    ]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter)
    search_fields = ['name', 'organisation__name']
    filterset_fields = {
        "name": ["exact"],
        "created": ["gte", "lte", "exact", "gt", "lt"],
        "modified": ["gte", "lte", "exact", "gt", "lt"],
    }
    pagination_class = api.MediumResultsSetPagination

    def get_serializer_class(self):
        if self.request.method in ("PUT", "POST", "PATCH"):
            return CollectionSerializer
        else:
            return GetCollectionSerializer

    def get_queryset(self, *args, **kwargs):
        try: 
            organisation = Organisation.objects.get(owner=self.request.user)
            return self.model.objects.filter(organisation=organisation)
        except:
            return self.model.objects.none()

    def retrieve(self, request, pk=None):
        instance = self.get_object()
        if instance:
            page = self.request.GET.get("page", 1)
            ordering = self.request.GET.get("ordering", "")
            if ordering:
                data = instance.collection_items.all().order_by(ordering)
            else:
                data = instance.collection_items.all()
            response_data = GetCollectionItemSerializer(data, many=True).data
            paginator = Paginator(response_data, self.pagination_class.page_size)
            try:
                paginator_data = paginator.page(page)
            except PageNotAnInteger:
                paginator_data = paginator.page(1)
            except EmptyPage:
                paginator_data = paginator.page(paginator.num_pages)
            response = {
                "count": len(response_data),
                "next": "api/v1/organisation/collection/{}/?page={}".format(instance.id, paginator_data.next_page_number()) if paginator_data.has_next() else None,
                "previous": "api/v1/organisation/collection/{}/?page={}".format(instance.id, paginator_data.previous_page_number()) if paginator_data.has_previous() else None,
                "results": paginator_data.object_list
            }
            collection = GetCollectionSerializer(instance).data
            return Response({"result": response, "collection": collection})
        return Response({"error": "Some error happened !!!"})

class CollectionItemViewset(viewsets.ModelViewSet):
    serializer_class = CollectionItemSerializer
    model = CollectionItem
    permission_classes = [
        permissions.IsAuthenticated
    ]
    http_method_names = ["post"]
    queryset = CollectionItem.objects.none()

    def add_collection_items(self, request):
        try:
            collection_data = request.data.get("data", [])
            collection_ids = request.data.get("collection_ids", [])
            for id in collection_ids:
                for c_data in collection_data:
                    data = {
                        "collection": id,
                        "organisation": c_data.get('organisation', None),
                        "key": c_data.get('key', None),
                        "thumbnail_url": c_data.get('thumbnail_url', None),
                        "bucket": c_data.get('bucket', None),
                    }
                    serializer = self.serializer_class(data=data)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response({"result": "Fail", "status": 0, "error": serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
            _status = status.HTTP_200_OK
            return Response({"result": "Success", "status": 1}, status=_status)
        except Exception as e:
            _status = status.HTTP_400_BAD_REQUEST
            return Response({"result": "Something Went Wrong !!", "status": 0, "error": str(e)}, status=_status)
    
    def delete_collection_items(self, request):
        try:
            collection = request.data.get("collection", None)
            keys = request.data.get("keys", [])
            if collection:
                s3_client = WasabiS3Config.client_connection()
                response = []
                for key in keys:
                    try:
                        collection_item = self.model.objects.filter(collection=collection, key=key).first()
                        metadata = s3_client.head_object(Bucket=collection_item.bucket, Key=key)
                        response.append({
                            "key": key,
                            "bucket": collection_item.bucket,
                            "metadata": metadata['Metadata']
                        })
                    except: 
                        pass
                self.model.objects.filter(collection=collection, key__in=keys).delete()
                _status = status.HTTP_200_OK
                return Response({"result": "Success", "status": 1, "metadata": response}, status=_status)
        except:
            _status = status.HTTP_400_BAD_REQUEST
            return Response({"result": "Something Went Wrong !!", "status": 0}, status=_status)

class UrlTagsViewset(viewsets.ModelViewSet):
    serializer_class = UrlTagsSerializer
    model = UrlTags
    permission_classes = [
        permissions.IsAuthenticated
    ]
    http_method_names = ["post"]
    queryset = UrlTags.objects.none()

    def get_tags(self, request):
        url = request.data.get("url", "")
        url_tags = self.model.objects.values('tags').filter(url=url).first()
        return Response(url_tags) if url_tags else Response({"tags": []})


    def add_tags(self, request):
        try:
            collection_urls = request.data.get("urls", [])
            tags = request.data.get("tags", [])
            for url in collection_urls:
                data = {
                    "url": url,
                    "tags": tags
                }
                serializer = self.serializer_class(data=data)
                if serializer.is_valid():
                    serializer.save()
            _status = status.HTTP_200_OK
            return Response({"result": "Success", "status": 1}, status=_status)
        except:
            _status = status.HTTP_400_BAD_REQUEST
            return Response({"result": "Something Went Wrong !!", "status": 0}, status=_status)


class ProgressPercentage(object):
    def __init__(self, filename):
        from pathlib import Path
        self._filename = filename
        # self._size = float(os.path.getsize(filename))
        self._size = float(Path(filename).stat().st_size)
        self._seen_so_far = 0
        self._lock = threading.Lock()
 
    def __call__(self, bytes_amount):
        import ntpath
        # from hurry.filesize import size, si
        import sys
        with self._lock:
            self._seen_so_far += bytes_amount
            percentage = (self._seen_so_far / self._size) * 100
            # sys.stdout.write("\r%s  %s / %s  (%.2f%%)" % (ntpath.basename(self._filename), size(self._seen_so_far), size(self._size), percentage))
            sys.stdout.flush()


class DeleteWasabiObjectView(APIView):
    model = Organisation
    serializer_class = OrgansationSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, organisation_id=None):
        _status = status.HTTP_400_BAD_REQUEST
        try:
            keys = request.data.get("keys", [])
            if not keys:
                return Response({"result": "Please provide key items to delete.", "status": 0}, status=_status)
            organisation_exists = Organisation.objects.filter(pk=organisation_id).exists()
            if organisation_exists:
                organisation = Organisation.objects.get(pk=organisation_id)
                wasabi_bucket_name = organisation.wasabi_bucket_name
            else:
                return Response({"result": "Please provide valid Organisation Id !!", "status": 0}, status=_status)
            s3_client = WasabiS3Config.client_connection()
            for key in keys:
                s3_client.delete_object(Bucket=wasabi_bucket_name, Key=key)
                CollectionItem.objects.filter(key=key,organisation=organisation_id).delete()
            _status = status.HTTP_200_OK
            return Response({"result": "Success", "status": 1}, status=_status)
        except Exception as e:
            return Response({"result": "Fail", "error": str(e), "status": 0}, status=_status)


class WasabiStorageSizeView(APIView):

    def get(self, request, organisation_id=None):
        _status = status.HTTP_400_BAD_REQUEST
        organisation_exists = Organisation.objects.filter(pk=organisation_id).exists()
        if organisation_exists:
            organisation = Organisation.objects.get(pk=organisation_id)
            wasabi_bucket_name = organisation.wasabi_bucket_name
        else:
            return Response({"result": "Please provide valid Organisation Id !!", "status": 0}, status=_status)
        s3_client = WasabiS3Config.client_connection()
        response = s3_client.list_objects(Bucket=wasabi_bucket_name)['Contents']
        bucket_size = sum(obj['Size'] for obj in response)
        return Response({"size": (bucket_size//1000/1024/1024), "unit": "GB"})

class GetOrganisationClientsView(APIView):
    model = Organisation
    serializer_class = OrgansationSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, organisation_id=None):
        _status = status.HTTP_400_BAD_REQUEST
        client = []
        try:
            organisation_exists = Organisation.objects.filter(pk=organisation_id).exists()
            if organisation_exists:
                organisation = Organisation.objects.get(pk=organisation_id)
                wasabi_bucket_name = organisation.wasabi_bucket_name
            else:
                return Response({"result": "Please provide valid Organisation Id !!", "status": 0}, status=_status)
            projects = Project.objects.values("client").filter(~Q(client = None) , Q(organisation=organisation, ))
            for project in projects:
                if project.get("client", None) not in client:
                    client.append(project.get("client", None))
            s3_session = WasabiS3Config.session_connection()
            s3_client = WasabiS3Config.client_connection()
            bucket = s3_session.Bucket(wasabi_bucket_name)
            for s3_file in bucket.objects.filter(Prefix=settings.WASABI_ASSETS_FOLDER_PATH, Delimiter='/'):
                if s3_file.key == settings.WASABI_ASSETS_FOLDER_PATH:
                    continue
                metadata = s3_client.head_object(Bucket=wasabi_bucket_name, Key=s3_file.key)
                user_defined_metadata = metadata['Metadata']
                if user_defined_metadata.get("client", "") and user_defined_metadata.get("thumbnail", "") not in client:
                    client.append(user_defined_metadata.get("client", ""))
            _status = status.HTTP_200_OK
            return Response({"result": client, "status": 1}, status=_status)
        except Exception as e:
            return Response({"result": client, "status": 0, "error": str(e)}, status=_status)

class AssetDetailstView(APIView):
    model = Organisation
    expiry_object = 60 * 30 * 20
    serializer_class = OrgansationSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request, organisation_id=None, key=None):
        _status = status.HTTP_400_BAD_REQUEST
        try:
            organisation_exists = Organisation.objects.filter(pk=organisation_id).exists()
            if organisation_exists:
                organisation = Organisation.objects.get(pk=organisation_id)
                wasabi_bucket_name = organisation.wasabi_bucket_name
            else:
                return Response({"result": "Please provide valid Organisation Id !!", "status": 0}, status=_status)
            s3_client = WasabiS3Config.client_connection()
            wasabi_key = settings.WASABI_ASSETS_FOLDER_PATH + key
            object_acl = s3_client.get_object_acl(
                Bucket=wasabi_bucket_name,
                Key=wasabi_key,
            )
            response = s3_client.generate_presigned_url('get_object',
                                                    Params={
                                                        'Bucket': wasabi_bucket_name,
                                                        'Key': wasabi_key
                                                    },
                                                    ExpiresIn=self.expiry_object)
            metadata = s3_client.head_object(Bucket=wasabi_bucket_name, Key=wasabi_key)
            obj_data = {
                            "url" : response,
                            "metadata": metadata,
                            "bucket_name": wasabi_bucket_name,
                            "object_acl": object_acl,
                            "expiration_in": self.expiry_object
                        }
            _status = status.HTTP_200_OK
            return Response({"result": obj_data, "status": 1}, status=_status)
        except Exception as e:
            return Response({"result": "Fail", "error": str(e), "status": 0}, status=_status)


class UploadItemWasabiBucketView(APIView):
    model = Organisation
    serializer_class = UploadItemWasabiBucketSerializer
    permission_classes = [
        ThirdPartyPermission,
    ]

    def _create_metadata(self, file, file_name) -> Dict:
        now = datetime.now()
        formatted_date = now.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
        metadata = {
            "collections":"[]",
            "dateadded": str(formatted_date),
            # "fileinfo":"{\"fileSize\":"+str(file.size)+",\"height\":,\"width\":,\"duration\":,\"codec\":""dateCreated\":"+str(datetime.now())+"}",
            "filename":file.name,
            "key":file_name,
            "projects":"[]",
            "tags":"[]",
            "thumbnail":""
        }
        return metadata

    def post(self, request, format=None, bucket_name=None):
        _status = status.HTTP_400_BAD_REQUEST
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                items = self.request.FILES.getlist('items', None)
                file_infos = self.request.data.get('file_infos', [])
                thumbnails = self.request.FILES.getlist('thumbnails', [])
                try:
                    s3_session = WasabiS3Config.session_connection()
                    s3_session.meta.client.head_bucket(Bucket=bucket_name)
                except ClientError:
                    return Response({"result": "Please Provide valid bucket name.", "status": 0}, status=_status)
                s3_client = WasabiS3Config.client_connection()
                assets_folder_name = settings.WASABI_ASSETS_FOLDER_PATH
                thumbnail_folder_name = settings.WASABI_THUMBNAIL_FOLDER_PATH
                if file_infos:
                    file_infos = ast.literal_eval(file_infos)
                    if len(file_infos) != len(items) or len(file_infos) != len(thumbnails):
                        return Response({"result": "File Infos should match with the uploaded items", "status": 0}, status=_status)
                
                for file, file_info, thumbnail in zip(items, file_infos, thumbnails):
                    thumb_file_name = thumbnail_folder_name + 'thumbnail-'+ str(uuid.uuid1()) + "." + thumbnail.name.split('.')[1]
                    # the below code is for storing file on local disc which is not needs as of now. just having for reference
                    # thumb_file_local = default_storage.save('tmp/thumb/' + thumb_key_name, ContentFile(thumbnail.read()))
                    # with open(thumb_file_local, "rb") as thumb:
                    # ends here
                    s3_client.upload_fileobj(thumbnail, bucket_name, thumb_file_name, ExtraArgs={'ACL':'public-read'})
                    thumbnail_url = settings.WASABI_PUBLIC_URL % (settings.WASABI_AWS_STORAGE_REGION, bucket_name, thumb_file_name)
                    file_name = assets_folder_name + str(uuid.uuid1()) + "." + file.name.split('.')[1]
                    metadata = self._create_metadata(file, file_name)
                    metadata.update({
                            "thumbnail": thumbnail_url
                        })
                    if file_info:
                        metadata.update({
                            "fileinfo": json.dumps(file_info)
                        })
                    # the below code is for storing file on local disc which is not needs as of now. just having for reference
                    # file_local = default_storage.save('tmp/' + file.name, ContentFile(file.read()))
                    # with open(file_local, "rb") as f:
                    # ends here
                    s3_client.upload_fileobj(file, bucket_name, file_name, ExtraArgs={"Metadata": metadata})
                
                # remove tmp folder after usage
                # shutil.rmtree('tmp')
                
                _status = status.HTTP_200_OK
                return Response({"result": "Success", "status": 1}, status=_status)
            except:
                return Response({"result": "Something Went Wrong !!", "status": 0}, status=_status)
        else:
            return Response({"result": "Error", "message": serializer.errors, "status": 0}, status=_status)


class UploadItemWasabiView(APIView):
    model = Organisation
    serializer_class = OrgansationSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]


    def post(self, request, format=None, organisation_id=None):
        import logging
        response = "Ok"
        log = logging.getLogger('s3_uploader')
        _status = status.HTTP_400_BAD_REQUEST
        # try:
        organisation_exists = Organisation.objects.filter(pk=organisation_id).exists()
        if organisation_exists:
            organisation = Organisation.objects.get(pk=organisation_id)
            wasabi_bucket_name = organisation.wasabi_bucket_name
        else:
            return Response({"result": "Please provide valid Organisation Id !!", "status": 0}, status=_status)
        item = request.data.get("item", None)
        object_name = str(item)
        s3_client = WasabiS3Config.client_connection()
        # path = default_storage.save('tmp/file.png', ContentFile(item.read()))

        response = s3_client.generate_presigned_url(
            ClientMethod="put_object",
            Params={
                "Bucket": wasabi_bucket_name,
                "Key": settings.WASABI_ASSETS_FOLDER_PATH + object_name,
            },
            ExpiresIn=30 * 60
        )
        
        # log.info("Upload finished!")

        # response = s3_client.generate_presigned_post(
        #         Bucket = wasabi_bucket_name,
        #         Key = object_name,
        #         ExpiresIn=300,
        # )
        print(response)
        # files = {"file": open(path, 'rb')}
        # r = requests.post(response['url'], data=response['fields'], files=files)
        # print(r)
        # print(r.status_code)

        # self.start_threading_upload_object(s3_client, path, config, wasabi_bucket_name, item)

        # return Response({"result": "Success", "status": 1}, status=_status)

        # config = TransferConfig(multipart_threshold=1024*25, max_concurrency=10,
        #             multipart_chunksize=1024*25, use_threads=True)

        # upload_wasabi_object.delay(path, wasabi_bucket_name, item)

        # self.start_threading_upload_object(s3_client, path, config, wasabi_bucket_name, item)

        # with concurrent.futures.ProcessPoolExecutor() as executor:
        #     executor.submit(self.start_threading_upload_object, s3_client, path, config, wasabi_bucket_name, item)

        # process = multiprocessing.Process(target=self.start_threading_upload_object, args=[s3_client, path, config, wasabi_bucket_name, item])
        # process.start()
        
        _status = status.HTTP_200_OK
        return Response({"result": "Success", "url": response, "status": 1}, status=_status)
        # except:
        #     return Response({"result": "Something Went Wrong !!", "status": 0}, status=_status)

class GetBucketObjectsView(APIView):
    expiry_object = 60 * 30 * 20
    model = Organisation
    serializer_class = OrgansationSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def prepare_public_url(self, bucket_name, object_name):
        return settings.WASABI_PUBLIC_URL + bucket_name + '/' + object_name
    
    def search_param_in_metadata(self, search_param, metadata):
        for value in metadata.values():
            if search_param in value:
                return True
        return False

    def get(self, request, format=None, organisation_id=None):
        _status = status.HTTP_400_BAD_REQUEST
        result = {"data": [], "NextKey": None, "storage": {}}
        try:
            search_param = request.GET.get("search", "")
            print(search_param)
            organisation_exists = Organisation.objects.filter(pk=organisation_id).exists()
            if organisation_exists:
                organisation = Organisation.objects.get(pk=organisation_id)
                wasabi_bucket_name = organisation.wasabi_bucket_name
            else:
                return Response({"result": result, "message": "Please provide valid Organisation Id !!", "status": 0}, status=_status)
            s3_session = WasabiS3Config.session_connection()
            s3_client = WasabiS3Config.client_connection()
            # response = s3_client.list_objects_v2(
            #     Bucket=wasabi_bucket_name,
            #     Prefix ='assets/'
            #     Deli )
            # print(response)
            bucket = s3_session.Bucket(wasabi_bucket_name)
            # starting_token = request.GET.get("key", "")
            # paginator_config = {
            #     'PageSize': settings.WASABI_AWS_LIST_OBJECT_PAGE_SIZE,
            #     'MaxItems': settings.WASABI_AWS_LIST_OBJECT_MAX_ITEMS,
            #     'StartingToken': starting_token
            #     }
            
            # print(paginator_config)
            # paginator = s3_client.get_paginator('list_object_versions')
            # page_iterator = paginator.paginate(Bucket=wasabi_bucket_name,
            #                         PaginationConfig=paginator_config)

            response = s3_client.list_objects(Bucket=wasabi_bucket_name)['Contents']
            bucket_size = sum(obj['Size'] for obj in response)
            result['storage'] = {"size": (bucket_size//1000/1024/1024), "unit": "GB"}

            for s3_file in bucket.objects.filter(Prefix=settings.WASABI_ASSETS_FOLDER_PATH, Delimiter='/'):
                if s3_file.key == settings.WASABI_ASSETS_FOLDER_PATH:
                    continue
            # for page in page_iterator:
                # if page.get('NextKeyMarker', ""):
                #     result['NextKey'] = page['NextKeyMarker']
                # print(page)
                # page = page_iterator[2]
                # file_path = self.prepare_public_url(wasabi_bucket_name, s3_file.key)
                # for item in page['Versions']:
                response = s3_client.generate_presigned_url('get_object',
                                                    Params={
                                                        'Bucket': wasabi_bucket_name,
                                                        'Key': s3_file.key
                                                    },
                                                    ExpiresIn=self.expiry_object)
                metadata = s3_client.head_object(Bucket=wasabi_bucket_name, Key=s3_file.key)
                if search_param:
                    is_exist = self.search_param_in_metadata(search_param, metadata['Metadata'])
                    if is_exist:
                        obj_data = {
                            "url" : response,
                            "metadata": metadata
                        }
                        result['data'].append(obj_data)
                else:
                    obj_data = {
                        "url" : response,
                        "metadata": metadata
                    }
                    result['data'].append(obj_data)
            _status = status.HTTP_200_OK
            return Response({"result": result, "status": 1}, status=_status)
        except:
            _status = status.HTTP_400_BAD_REQUEST
            return Response({"result": result, "message": "Something Went Wrong !!", "status": 0}, status=_status)