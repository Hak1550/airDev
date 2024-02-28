from django.urls import path, include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from . import viewsets

camera_router = DefaultRouter()
camera_router.register("", viewsets.CameraViewSet, basename="project")

air_camera_router = DefaultRouter()
air_camera_router.register("", viewsets.AirCameraViewSet, basename="air-camera")

onboard_camera_router = DefaultRouter()
onboard_camera_router.register("", viewsets.OnboardCameraViewSet, basename="air-camera")

air_instance_router = DefaultRouter()
air_instance_router.register("", viewsets.AirInstanceViewSet, basename="air-instance")

app_name = "project"

urlpatterns = [
    # path("camera/", include(camera_router.urls)),
    path("list/", viewsets.GearListViewSet.as_view(), name="gear-list"),
    path(
        "<int:project_id>/assigned/",
        viewsets.GearAssignedViewSet.as_view(),
        name="gear-assigned",
    ),
    path("air-camera/", include(air_camera_router.urls)),
    path("onboard-camera/", include(onboard_camera_router.urls)),
    path("deactivate-camera/<str:air_id>/", viewsets.DeactivateCameraView.as_view(),name='deactivate-camera'),
    path("my-cameras/<int:organisation_id>/", viewsets.OnboardCameraViewSet.as_view({'get':'get_my_cameras'}), name="organisation-camera"),
    path("air-instance/", include(air_instance_router.urls)),
    path(
        "<str:air_id>/is_valid/",
        viewsets.AirCameraViewSet.as_view({"get": "is_valid_camera"}),
        name="validate-airid",
    ),
    path(
        "get-camera-details/<str:air_id>/",
        viewsets.AirCameraViewSet.as_view({"get": "get_camera_air_id"}),
        name="get-camera-details",
    ),
    path("air-instance-activity/<int:air_instance_id>/start/", viewsets.AirInstanceStartView.as_view(),name='instance-start'),
    path("air-instance-activity/<int:air_instance_id>/stop/", viewsets.AirInstanceStopView.as_view(),name='instance-start'),
    path("air-instance-raise-invoice/", viewsets.AirInstanceRaiseInvoiceView.as_view(),name='instance-invoice'),
    path("update-camera-status/<str:air_id>/", viewsets.UpdateCameraStatusView.as_view(), name="update-camera-status"),
    path("get-camera-status/<str:air_ids>/", viewsets.GetCameraStatusView.as_view(), name="get-camera-status")
    # path("air-camera/<id:int>/assign"), include(air_camera_router.urls)
    # path('<int:pro_id>/<int:user_id>/add_member/',
    #      viewsets.AddMemberView.as_view())
]
