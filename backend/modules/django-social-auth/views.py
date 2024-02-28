from api.v1.users.serializers import UserInformationSerializer, UserSerializer
from organisation.models import OrganisationMemberMapping
from users.models import Role, UserInformation
from api.v1.organisation.serializers import OrganisationMemberMappingReadSerializer
from rest_framework.permissions import AllowAny
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.apple.client import AppleOAuth2Client
from rest_auth.registration.views import SocialLoginView, SocialConnectView
from .serializers import CustomAppleSocialLoginSerializer, CustomAppleConnectSerializer
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

try:
    APP_DOMAIN = f"https://{get_current_site(None)}"
except Exception:
    APP_DOMAIN = ""


class FacebookLogin(SocialLoginView):
    permission_classes = (AllowAny,)
    adapter_class = FacebookOAuth2Adapter

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

class GoogleLogin(SocialLoginView):
    permission_classes = (AllowAny,)
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        key = super().post(request).data.get("key")
        token = Token.objects.get(key=key)
        user = token.user
        user_serializer = UserSerializer(user)
        user_information = UserInformation.objects.get(user=user)    
        user_info_obj = UserInformationSerializer(instance=user_information).data
        organisation = OrganisationMemberMapping.objects.filter(user=user)
        organisation_data = OrganisationMemberMappingReadSerializer(instance=organisation, many=True).data
        return Response({"token": token.key, "user": user_serializer.data, "user_information": user_info_obj, "organisation_data": organisation_data})

class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter
    client_class = AppleOAuth2Client
    serializer_class = CustomAppleSocialLoginSerializer
    callback_url = f"https://{APP_DOMAIN}/accounts/apple/login/callback/"


class FacebookConnect(SocialConnectView):
    permission_classes = (AllowAny,)
    adapter_class = FacebookOAuth2Adapter


class GoogleConnect(SocialConnectView):
    permission_classes = (AllowAny,)
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client


class AppleConnect(SocialConnectView):
    adapter_class = AppleOAuth2Adapter
    client_class = AppleOAuth2Client
    serializer_class = CustomAppleConnectSerializer