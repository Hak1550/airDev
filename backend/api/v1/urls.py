from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.v1.users.viewsets import (
    ChangePasswordView,
    SignupViewSet,
    LoginViewSet,
    UserInformationViewSet
)

from .users import viewsets as users_view

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")
router.register("forgot-password", users_view.ForgotPasswordViewSet, basename="forgot-password")
router.register("verify-forgot-password-token", users_view.VerifyForgotPasswordTokenViewset, basename="verify-forgot-password")
router.register('user-information', UserInformationViewSet, basename='user-information')
router.register("change-password", ChangePasswordView, basename="change-password")

urlpatterns = [
    path("", include(router.urls)),
    path('project/', include('api.v1.project.urls')),
    path('payment/', include('api.v1.payment.urls')),
    path('gear/', include('api.v1.gear.urls')),
    path('shoot/', include('api.v1.shoot_setup.urls')),
    path('user/', include('api.v1.users.urls')),
    path('organisation/', include('api.v1.organisation.urls'))
]
