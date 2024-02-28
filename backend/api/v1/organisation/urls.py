from django.urls import path, include
from . import viewsets
from rest_framework.routers import DefaultRouter

# from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', viewsets.AddCollaboratorViewSet, basename='organisation-member-mapping')

org_comms_router = DefaultRouter()
org_comms_router.register('', viewsets.OrganisationCommsViewset, basename='organisation-comms')


collection_router = DefaultRouter()
collection_router.register('', viewsets.CollectionViewset, basename='collection')

metadata_router = DefaultRouter()
metadata_router.register('', viewsets.MediaMetadataViewset, basename='media_metadata')

collection_item_router = DefaultRouter()
collection_item_router.register('', viewsets.CollectionItemViewset, basename='collection')

urlpatterns = [
    path("delete-collection-items/", viewsets.CollectionItemViewset.as_view({'post':'delete_collection_items'}), name="delete-collection-items"),
    path("collection/<int:collection_id>/get-collection-items/", viewsets.CollectionItemsView.as_view(), name="get-collection-items"),
    path("add-collection-items/", viewsets.CollectionItemViewset.as_view({'post':'add_collection_items'}), name="add collection items"),
    path("add-tags/", viewsets.UrlTagsViewset.as_view({'post':'add_tags'}), name="add_tags"),
    path("get-tags/", viewsets.UrlTagsViewset.as_view({'post':'get_tags'}), name="get_tags"),
    path("<str:bucket_name>/upload-item-wasabi-bucket/", viewsets.UploadItemWasabiBucketView.as_view(), name="upload-item-wasabi"),
    path("<int:organisation_id>/upload-item-wasabi/", viewsets.UploadItemWasabiView.as_view(), name="upload-item-wasabi"),
    path("<int:organisation_id>/get-bucket-objects/", viewsets.GetBucketObjectsView.as_view(), name="get-bucket-objects"),
    path("<int:organisation_id>/delete-bucket-objects/", viewsets.DeleteWasabiObjectView.as_view(), name="delete-bucket-objects"),
    path("<int:organisation_id>/asset-details/<str:key>/", viewsets.AssetDetailstView.as_view(), name="asset-details-objects"),
    path("<int:organisation_id>/get-clients/", viewsets.GetOrganisationClientsView.as_view(), name="asset-details-objects"),
    path("<int:organisation_id>/wasabi-bucket-storage-size/", viewsets.WasabiStorageSizeView.as_view(), name="wasabi-bucket-storage-size"),
    path("collection-item/", include(collection_item_router.urls)),
    path("collection/", include(collection_router.urls)),
    path("organisation-comms/", include(org_comms_router.urls)),
    path("collaborator/", include(router.urls)),
    path("<int:organisation_id>/metadata/", include(metadata_router.urls)),
    path('create/',
        viewsets.CreateOrganisation.as_view()),
]
