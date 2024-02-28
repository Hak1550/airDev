from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.v1.users.viewsets import (
    ConfirmResetPasswordView,
    ConfirmUserView,
    GlobalMembersView,
    InvitationsView,
    MyAssetsView,
    MyStoragePlansView,
    ResetPasswordView,
    SignupViewSet,
    LoginViewSet,
    TeamMemberView,
    InviteMemberView,
    OnlineMembersView
)

router = DefaultRouter()
# router.register("signup", SignupViewSet, basename="signup")
# router.register("login", LoginViewSet, basename="login")
# router.register("forgot-password", users_view.ForgotPasswordViewSet, basename="forgot-password")

member_invitations = DefaultRouter()
member_invitations.register('', InvitationsView, basename='member-invitations')

urlpatterns = [
    path("", include(router.urls)),
    path("invite/<str:email>", InviteMemberView.as_view()),
    path("team-members", TeamMemberView.as_view()),
    path("global-members", GlobalMembersView.as_view()),
    path("member-invitations/", include(member_invitations.urls)),
    path("online-members/<int:project_id>/", OnlineMembersView.as_view()),
    path("confirm/<uuid:confirmation_token>/", ConfirmUserView.as_view()),
    path("reset-password/<str:email>/", ResetPasswordView.as_view()),
    path("confirm-reset-password/", ConfirmResetPasswordView.as_view()),
    path("my-storage-plan/", MyStoragePlansView.as_view()),
    path("my-assets/", MyAssetsView.as_view()),
]
