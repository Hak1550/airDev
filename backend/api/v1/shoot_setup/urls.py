from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import viewsets

router = DefaultRouter()
router.register('', viewsets.ShootViewSet, basename='shoot_setup')

app_name = "shoot_setup"

urlpatterns = [
    path("", include(router.urls)),
    path('<int:pro_id>/project/',
         viewsets.ShootByProjectView.as_view()),
    path('<int:shoot_id>/update-background/',
         viewsets.ShootBackgroundViewSet.as_view()),
    path('<int:shoot_image_id>/delete-background/',
         viewsets.ShootBackgroundDeleteViewSet.as_view())
]
