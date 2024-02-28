# from rest_framework.authtoken.serializers import AuthTokenSerializer
import string
import random
from api.v1.organisation.serializers import OrganisationMemberMappingReadSerializer
from api.v1.gear.serializers import AirInstanceMyAssetsSerializer, OrganisationOwnedCameraSerializer, AirInstanceSerializer
from gear.models import AirInstance, OrganisationOwnedCamera
from payment.models import PurchaseSubscription
from organisation.models import Organisation, OrganisationMemberMapping, ORGANISATION_ROLES
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
# from rest_framework import filters
# from django_filters.rest_framework import DjangoFilterBackend
from api.v1.users.serializers import (
    ChangePasswordSerializer,
    ConfirmResetPasswordSerializer,
    InvitationSerializer,
    SignupSerializer,
    UserInformationSerializer,
    UserSerializer,
    AuthTokenSerializer,
    ForgotPassWordSerializer,
    VerifyForgetPasswordTokenSerializer,
    InviteMemberSerializer
)
from rest_framework import filters, generics
from django_filters.rest_framework import DjangoFilterBackend
from django.core.mail import EmailMessage
from generic import permissions
from rest_framework import viewsets, status
from django.core.mail import send_mail
from django.conf import settings
from users import models
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.views import APIView
from generic.api import shoot_mail
from django.db.models import Q
from permission.models import ProjectPermissionMapping
from users.models import (
    ADMIN,
    InvitedUser,
    ResetPassword,
    User,
    UserInformation,
    ValidateUserEmail
)
from api.v1.project.serializers import ProjectSerializer
from project.models import Project
from generic import api
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, mixins
from api.v1.payment.serializers import MySubscriptionSerializer
# from django.shortcuts import get_object_or_404

class SignupViewSet(ModelViewSet):
    serializer_class = SignupSerializer
    http_method_names = ["post"]


class InvitationsView(mixins.RetrieveModelMixin, viewsets.GenericViewSet):

    serializer_class = InvitationSerializer
    model = InvitedUser
    queryset = InvitedUser.objects.filter(is_expired=False)

    
class InviteMemberView(APIView):
    serializer_class = InviteMemberSerializer
    permissions = [permissions.IsAuthenticatedOrReadOnly]

    def invite_user(self, email, type=None, project_id=None, organisation_id=None):
        try: 
            if project_id:
                project = Project.objects.get(id=project_id)
                invited_user = InvitedUser.objects.create(email=email, project=project, role=type)
            elif organisation_id:
                organisation = Organisation.objects.get(id=organisation_id)
                invited_user = InvitedUser.objects.create(email=email, role=type, organisation=organisation)
            landing_url = settings.APP_BASE_URL + 'signup'
            if type:
                landing_url = settings.APP_BASE_URL + 'signup?token_id='+ str(invited_user.id)
            html_content = 'Hello, </br> You have been invited to be a part of AIR Team </br></br> Please Click <a href="' + landing_url +'">Here</a>: to join'
            status = shoot_mail(email=email, subject='AIR Invitation', html_content=html_content)
            return status
        except: 
            return False

    def get(self, request, format=None, email=None, type=None):
        type = request.GET.get("type", 13)
        project_id = request.GET.get("project", None)
        organisation_id = request.GET.get("organisation", None)
        serializer = self.serializer_class(
            data={"email": email}, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            status = self.invite_user(email, type, project_id, organisation_id)
            return Response({"status": status})
        else:
            return Response({"error": "Encountered some problem ! please try later"})

class TeamMemberView(APIView):
    # serializer_class = InviteMemberSerializer
    permissions = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = api.RegularResultsSetPagination

    def _format_response(self, data, organisation):
        # project_serializer = ProjectSerializer
        user_serializer = UserSerializer
        user_info_serializer = UserInformationSerializer
        response = {}
        searched_role = self.request.query_params.get("role", None)
        searched_project = self.request.query_params.get("project", "")
        for project_member in data:
            if not project_member.user in response:
                user = project_member.user
                try: 
                    user_information = models.UserInformation.objects.get(user=user)
                    user_information_data = user_info_serializer(instance=user_information).data
                except:
                    user_information_data = None
                organisation_role = OrganisationMemberMapping.objects.filter(organisation=organisation, user=user).values("role", "id")
                if searched_role:
                    organisation_role = OrganisationMemberMapping.objects.filter(organisation=organisation, user=user, role = searched_role).values("role", "id")
                    if not organisation_role:
                        continue
                org_role_name = ORGANISATION_ROLES[int(organisation_role[0]['role'])-1][1] # '-1' because ORGANISATION_ROLES is an array and roles starting from 1
                user_data = user_serializer(instance=user).data
                projects = ProjectPermissionMapping.objects.values('project').filter(users__id=user.id, project__organisation=organisation, project__name__icontains=searched_project)
                p_data = [dict(t) for t in {tuple(d.items()) for d in projects}] # remove duplicate users for same projects with different roles
                project_data = []
                for p_details in p_data:
                    project = Project.objects.get(id=p_details['project'])
                    project_data.append({"name": project.name, "id": project.id})
                if not searched_project:
                    response[project_member.user] = {"projects": project_data, "user": user_data, "user_info":user_information_data, "role": org_role_name, "collaborator_id": organisation_role[0]['id']}
                elif project_data:
                    response[project_member.user] = {"projects": project_data, "user": user_data, "user_info":user_information_data, "role": org_role_name, "collaborator_id": organisation_role[0]['id']}
        return response

    def get(self, request, format=None):
        try:
            response = {}   
            user = request.user
            page = self.request.GET.get("page", 1)
            organisation = Organisation.objects.get(owner=user)
            searched_user = self.request.query_params.get("user", "")
            all_data = self.request.query_params.get("all", None)
            organisation_mappings = OrganisationMemberMapping.objects.filter(organisation=organisation, user__name__icontains=searched_user)
            # all_projects = ProjectPermissionMapping.objects.values('project').filter(users__id__icontains=user.id, role=ADMIN)
            # project_members = ProjectPermissionMapping.objects.values('users', 'project').filter(project__in = all_projects, users__name__icontains=searched_user, project__name__icontains=searched_project) # exclude(role=ADMIN)
            response = self._format_response(organisation_mappings, organisation)
            listed_response = list(response.values())
            if all_data:
                response = {
                "count": len(response.values()),
                "results": listed_response
                }
            else:
                paginator = Paginator(listed_response, self.pagination_class.page_size)
                try:
                    paginator_data = paginator.page(page)
                except PageNotAnInteger:
                    paginator_data = paginator.page(1)
                except EmptyPage:
                    paginator_data = paginator.page(paginator.num_pages)
                response = {
                    "count": len(response.values()),
                    "next": "api/v1/user/team-members/?page={}".format(paginator_data.next_page_number()) if paginator_data.has_next() else None,
                    "previous": "api/v1/user/team-members/?page={}".format(paginator_data.previous_page_number()) if paginator_data.has_previous() else None,
                    "results": paginator_data.object_list
                }
                
            return Response(response)
        except:
            response = {
                "count": 0,
                "next": None,
                "previous": None,
                "results": [],
                "error": True
            }
            return Response(response)


class LoginViewSet(ViewSet):
    """Based on rest_framework.authtoken.views.ObtainAuthToken"""

    serializer_class = AuthTokenSerializer
    permissions = [permissions.AllowAny]

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)
        user_information = models.UserInformation.objects.filter(user=user).first()
        if not user_information:
            role = request.data.get("role", "NO_ROLE")
            role_instance = models.Role.objects.filter(name=role).first()
            user_information, created = models.UserInformation.objects.get_or_create(
                user=user, role=role_instance
            )
        user_info_obj = UserInformationSerializer(instance=user_information).data
        organisation = OrganisationMemberMapping.objects.filter(user=user)
        organisation_data = OrganisationMemberMappingReadSerializer(instance=organisation, many=True).data
        return Response({"token": token.key, "user": user_serializer.data, "user_information": user_info_obj, "organisation_data": organisation_data})


class VerifyForgotPasswordTokenViewset(ViewSet):
    serializer_class = VerifyForgetPasswordTokenSerializer
    permissions = (permissions.AllowAny,)

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        _status = status.HTTP_400_BAD_REQUEST
        if serializer.is_valid():
            password = serializer.validated_data["password"]
            user = serializer.validated_data["user"]
            user_token = serializer.validated_data["user_token"]
            user.set_password(password)
            user.save()
            user_token.is_password_change = True
            user_token.is_claim = True
            user_token.save()
            _status = status.HTTP_202_ACCEPTED
        return Response({"data": request.data, "status": _status, "error": serializer.errors},
                        status=_status)


class ForgotPasswordViewSet(ViewSet):
    serializer_class = ForgotPassWordSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def check_code(self, size=30, chars=string.digits):
        """Check if the code is a available."""
        code = ''.join(random.choice(chars) for _ in range(size))
        verification = models.ResetPasswordToken.objects.filter(code=code, is_claim=False)
        return bool(verification), code

    def token_generator(self):
        while True:
            profile, code = self.check_code()
            if profile is False:
                break
        return code

    def _send_mail(self, token, user):
        # mail_subject = "[AIR] Reset Password"
        # message = 'Hello, \nClick Here: <a href="{}/password-reset/{}/{}">here</a>'.format(get_current_site(self.request), user.id, token.code)
        # to_email = user.email
        # email = EmailMessage(mail_subject, message, to=[to_email])
        # email.send()
        html_content = 'Hello, </br> Click Here: <a href="{}/password-reset/{}/{}">here</a> to reset your password.'.format(
            settings.APP_BASE_URL, user.id, token.code)
        status = shoot_mail(email=user.email, subject='AIR Reset Password', html_content=html_content)
        return status

    def create(self, request):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        _status = status.HTTP_400_BAD_REQUEST
        email_status = 0
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            user = models.User.objects.get(email=email)
            if True or user.profile.is_active:
                token = models.ResetPasswordToken.objects.create(
                    code=self.token_generator(),
                    user=user,
                )
                email_status = self._send_mail(token, user)
                _status = status.HTTP_202_ACCEPTED
        return Response(
            {"data": request.data, "email_status": email_status, "status": _status, "error": serializer.errors},
            status=_status)


class ChangePasswordView(ViewSet):
    """
    An endpoint for changing password.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def create(self, request):
        
        serializer = self.serializer_class(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            request.user.set_password(serializer.validated_data['new_password'])
            request.user.save()
            return Response(status=status.HTTP_200_OK, 
                data={"message":"Password successfully changed"}
            )
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, 
                data={"message":serializer.errors}
            )

class ConfirmUserView(generics.ListAPIView):

    def get(self, request, confirmation_token=None):
        result = []
        try: 
            _status = status.HTTP_200_OK
            token = ValidateUserEmail.objects.get(id=confirmation_token, is_confirmed=False)
            token.is_confirmed = True
            token.save()
            user = User.objects.get(email=token.email)
            user.is_active = True
            user.save()
            return Response({"status": 1}, status=_status)
        except:
            _status = status.HTTP_400_BAD_REQUEST
            return Response({'status': 0, "message": "User already verified"}, status=_status)


class ConfirmResetPasswordView(generics.CreateAPIView):
    serializer_class = ConfirmResetPasswordSerializer

    def post(self, request):
        try: 
            serializer = self.serializer_class(data=request.data)
            
            if serializer.is_valid():
                _status = status.HTTP_200_OK
                token = serializer.validated_data['token']

                token_obj = ResetPassword.objects.get(id=token, is_reset=False)
                token_obj.is_reset = True
                token_obj.save()

                user = User.objects.get(email=token_obj.email)
                user.set_password(serializer.validated_data['new_password'])
                user.save()
                
                return Response({"status": 1, "message":"Password successfully changed"}, status=_status)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST, 
                    data={"message":serializer.errors}
                )
        except:
            _status = status.HTTP_400_BAD_REQUEST
            return Response({'status': 0, "message": "Invalid Token"}, status=_status)

class ResetPasswordView(generics.ListAPIView):

    def get(self, request, email=None):
        try: 
            _status = status.HTTP_400_BAD_REQUEST
            user = User.objects.filter(email=email).exists()
            if not user:
                return Response({'status': 0, "message": "No User associated with this email."}, status=_status)
            reset_password = ResetPassword.objects.create(email=email)
            landing_url = settings.APP_BASE_URL + 'reset-password?token_id='+ str(reset_password.id)
            html_content = 'Please Click <a href="' + landing_url +'">Here</a>: to reset your password.'
            email_status = shoot_mail(email=email, subject='Reset Password | AIR', html_content=html_content)
            _status = status.HTTP_200_OK
            return Response({"status": email_status}, status=_status)
        except:
            return Response({'status': 0, "message": "Some error occured"}, status=_status)

class OnlineMembersView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = None

    def get(self, request, project_id=None):
        result = []
        try: 
            project = Project.objects.get(id=project_id)
            members = project.members.all()
            for member in members:
                result.append({member.id: member.is_online})
        except:
            return Response({'result': result, "message": "Some Error Occured"})
        return Response({'result': result})

class GlobalMembersView(generics.ListAPIView):
    serializer_class = UserInformationSerializer
    model = UserInformation
    queryset = models.UserInformation.objects.filter(global_member=True)
    permission_classes = (
        permissions.IsOwnerOrReadOnly,
        permissions.IsAuthenticatedOrReadOnly
    )
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filterset_fields = ["first_name", "last_name"]
    search_fields = [
        'first_name',
        'last_name',
        'nick_name'
    ] 

class UserInformationViewSet(viewsets.ModelViewSet):
    serializer_class = UserInformationSerializer
    model = UserInformation
    queryset = models.UserInformation.objects.all()
    permission_classes = (
        permissions.IsOwnerOrReadOnly,
        permissions.IsAuthenticatedOrReadOnly
    )
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter)
    ordering_fields = ['first_name']
    filterset_fields = ["first_name", "last_name", "user__email"]
    search_fields = [
        'first_name',
        'last_name',
        'nick_name',
        'user__email'
    ]

    def retrieve(self, request, pk=None):
        try:
            _status = status.HTTP_200_OK
            instance = self.model.objects.get(id=pk)
            serializer_data = self.serializer_class(instance).data
            return Response({"data": serializer_data}, status=_status)
        except:
            _status = status.HTTP_400_BAD_REQUEST
            return Response({"error": "Something went wrong"}, status=_status)

    def update(self, request, *args, **kwargs):
        _status = status.HTTP_202_ACCEPTED
        instance = self.queryset.get(pk=kwargs.get('pk'))
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"data": serializer.data, "status": _status, }, status=_status)

class MyStoragePlansView(generics.ListAPIView):
    serializer_class = MySubscriptionSerializer
    model = PurchaseSubscription

    def get(self, request):
        result = []
        try: 
            packages = self.model.objects.filter(user=request.user, is_active=True, is_paid=True)
            result = self.serializer_class(packages, many=True).data
        except:
            return Response({'result': result, "message": "Some Error Occured"})
        return Response({'result': result})

class MyAssetsView(generics.ListAPIView):

    def get(self, request):
        result = {
            "camera": [],
            "instance": []
        }
        try: 
            onboarded_camera_data = []
            air_instances_data = []
            search_query = request.GET.get('search',"")
            type_query = request.GET.get('type',"any")
            organisation_id = request.GET.get('organisation_id',"")
            if organisation_id:
                organisation = Organisation.objects.get(id=organisation_id)    
            else:
                organisation = Organisation.objects.get(owner=request.user)
            if type_query == 'any' or type_query == 'camera':
                onboarded_camera = OrganisationOwnedCamera.objects.filter(Q(camera__nick_name__icontains=search_query, organisation=organisation) | Q(camera__air_id__icontains=search_query, organisation=organisation))
                onboarded_camera_data = OrganisationOwnedCameraSerializer(onboarded_camera, many=True).data

            if type_query == 'any' or type_query == 'instance':
                air_instances = AirInstance.objects.filter(Q(nick_name__icontains=search_query, organisation=organisation))
                air_instances_data = AirInstanceMyAssetsSerializer(air_instances, many=True).data

            result = {
                "camera": onboarded_camera_data,
                "instance": air_instances_data
            }
        except:
            return Response({'result': result, "message": "Some Error Occured"})
        return Response({'result': result})