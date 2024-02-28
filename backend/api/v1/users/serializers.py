from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from api.v1.organisation.serializers import OrganisationMemberMappingReadSerializer
from generic.api import shoot_mail
from project.models import Project
from organisation.models import OrganisationMemberMapping, ORGANISATION_ROLES
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from django.contrib.auth import authenticate
from users.models import InvitedUser, ResetPassword, UserInformation, Country, ResetPasswordToken, Role, ValidateUserEmail
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from permission.models import ProjectPermissionMapping
from django.conf import settings

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    token = serializers.SerializerMethodField()
    invitation_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'password', 'role', 'token', 'invitation_token')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            },
            'first_name': {
                'required': True,
                'allow_blank': False,
            },
            'last_name': {
                'required': True,
                'allow_blank': False,
            },
            'role': {
                'required': False,
                'allow_blank': True,
            },
            'invitation_token': {
                'required': False,
                'write_only': True
            }
        }

    def get_invitation_token(self, obj):
        request = self.context.get('request')
        return request.data.get("invitation_token", None)

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return token.key

    def get_role(self, obj):
        request = self.context.get('request')
        return request.data.get("role", None)

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def check_role(self, data):
        return data.get("role", False)

    # def expired_member_invitation()

    def send_joining_email_for_invited(self, email):
        html_content = 'Hello, </br> We are glad that you choose to be a part of AIR Team.'
        shoot_mail(email=email, subject='Welcome to AIR !!!', html_content=html_content)

    def send_joining_email(self, email):
        validate_email = ValidateUserEmail.objects.create(email=email)
        landing_url = settings.APP_BASE_URL + 'login?confirmation_token='+ str(validate_email.id)
        html_content = 'Hello, </br> We are glad that you choose to be a part of AIR Team. Please click <a href="' + landing_url +'">here</a> to confirm your email.'
        shoot_mail(email=email, subject='Welcome to AIR !!!', html_content=html_content)

    def create(self, validated_data):
        request = self.context.get('request')
        # if not self.check_role(request.data):
        #     raise serializers.ValidationError(
        #         _("User Role is mandatory."))
        role = request.data.get("role", "NO_ROLE")
        invitation_token = request.data.get("invitation_token", None)
        invited_user = None
        if invitation_token:
            try:
                invited_user = InvitedUser.objects.get(id=invitation_token, is_expired=False)
                invited_user.is_expired = True
                invited_user.save()
            except:
                raise serializers.ValidationError(
                _("Invalid Invitation token."))
        role_instance = Role.objects.filter(name=role).first()
        if role_instance:
            full_name = validated_data.get('first_name') + " " + validated_data.get('last_name')
            user = User(
                email=validated_data.get('email'),
                name=full_name,
                username=generate_unique_username([
                    full_name,
                    validated_data.get('email'),
                    'user'
                ])
            )
            user.set_password(validated_data.get('password'))
            user.save()
            user_information= UserInformation.objects.get(user=user)
            user_information.role = role_instance
            user_information.first_name = validated_data.get('first_name')
            user_information.last_name = validated_data.get('last_name')
            request = self._get_request()
            setup_user_email(request, user, [])
            user.first_name = validated_data.get('first_name')
            user.last_name = validated_data.get('last_name')
            token, created = Token.objects.get_or_create(user=user)
            if invited_user:
                if invited_user.project:
                    organisation = invited_user.project.organisation
                else:
                    organisation = invited_user.organisation
                if invited_user.project:
                    organisation_mapping = OrganisationMemberMapping(organisation=organisation, user=user, role=ORGANISATION_ROLES[2][0])
                    organisation_mapping.save()
                    permission_obj = ProjectPermissionMapping.objects.filter(
                        project=invited_user.project, role=invited_user.role
                    )
                    project = Project.objects.get(id=invited_user.project.id)
                    project.members.add(user)
                    # need to set this user as crew for organisation
                    if permission_obj.exists():
                        permission_obj.first().users.add(user)
                else:
                    organisation_mapping = OrganisationMemberMapping(organisation=organisation, user=user, role=ORGANISATION_ROLES[2][0])
                    organisation_mapping.save()    
                user_information.tutorial = False
                self.send_joining_email_for_invited(user.email)
            else:
                self.send_joining_email(user.email)
                user.is_active=False
                user.save()
            user_information.save()
            return user
        else:
            raise serializers.ValidationError(
                _("Invalid user Role was provided."))

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class InviteMemberSerializer(serializers.Serializer):
    email = serializers.EmailField(label=_("Email"))
    
    def check_valid_email(self, email):
        import re
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if(re.fullmatch(regex, email)):
            return True
        return False

    def validate(self, attrs):
        email = attrs.get("email")
        is_existing_user = User.objects.filter(email=email).first()
        if not self.check_valid_email(email):
            msg = _("Invalid Email!")
            raise serializers.ValidationError(msg, code="authentication")
        elif not is_existing_user:
            return attrs
        else:
            msg = _("User with this email already exists!")
            raise serializers.ValidationError(msg, code="authentication")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'is_online']


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvitedUser
        fields = ['id', 'email', 'project', 'role', 'is_expired']


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = ResetPasswordForm


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField(label=_("Email"), write_only=True)
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )
    token = serializers.CharField(label=_("Token"), read_only=True)
    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )
            if not user:
                already_joined = ValidateUserEmail.objects.filter(email=email, is_confirmed=False).exists()
                msg = _("Unable to log in with provided credentials.")
                if already_joined:
                    msg = _("Your account is not verified! Click on the link sent in your email to verify your account.")
                raise serializers.ValidationError(msg, code="authorization")
            # else:
            #     user_information, created = UserInformation.objects.get_or_create(
            #         user=user, first_name=user.first_name, last_name = user.last_name
            #     )
                # print(user_information)
            # email_address = EmailAddress.objects.filter(email=email)
            # email_address = email_address.first()
            # if not email_address.verified:
            #     msg = _("Email address not verified")
            #     raise serializers.ValidationError(msg, code="authorixation")
        else:
            msg = _('Must include "email" and "password".')
            raise serializers.ValidationError(msg, code="authorization")
        attrs["user"] = user
        return attrs

class VerifyForgetPasswordTokenSerializer(serializers.Serializer):
    token = serializers.SerializerMethodField()
    uid = serializers.SerializerMethodField()
    # password = serializers.SerializerMethodField()
    # confirm_password = serializers.SerializerMethodField()
    password = serializers.CharField(
        label=_("Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )
    confirm_password = serializers.CharField(
        label=_("Confirm Password"),
        style={"input_type": "password"},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, data):
        request = self.context.get("request")
        token = request.data.get("token")
        uid = request.data.get("uid")
        data = request.data.copy()
        token_obj = ResetPasswordToken.objects.filter(code=token, is_claim=False).first()
        if not token_obj:
            msg = _("Invalid Token")
            raise serializers.ValidationError(msg, code="authorization")
        elif data.get("password") != data.get("confirm_password"):
            msg = _("Password doesn't match")
            raise serializers.ValidationError(msg, code="authorization")
        else:
            user = User.objects.filter(pk=uid).first()
            if not user: 
                msg = _("Invalid User Id")
                raise serializers.ValidationError(msg, code="authorization")
            elif user.id != token_obj.user.id:
                msg = _("User Id doesn't match")
                raise serializers.ValidationError(msg, code="authorization")
            else:
                data['user'] = user
                data['user_token'] = token_obj 
                return data


class ForgotPassWordSerializer(serializers.Serializer):
    email = serializers.EmailField(label=_("Email"))

    def validate(self, data):
        email = data.get("email")
        if email:
            user = User.objects.filter(email=email)
            if not user:
                msg = _("No User associated with this email ({}).".format(email))
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = _('Must include "username".')
            raise serializers.ValidationError(msg, code="authorization")
        data["user"] = user
        return data

class ConfirmResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField()
    confirm_password = serializers.CharField()


    def validate(self, attrs):
        token = attrs.get('token')
        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')
        check_token = ResetPassword.objects.filter(id=token).exists()
        
        if not check_token:
            raise serializers.ValidationError("Invalid Token")
        if new_password != confirm_password:
            raise serializers.ValidationError("Password mismatch !!")
        return attrs

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()
    confirm_password = serializers.CharField()


    def validate(self, attrs):
        old_password = attrs.get('old_password')
        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')

        currentpassword = self.context['request'].user.password
        matchcheck = check_password(old_password, currentpassword)
        
        if not matchcheck:
            raise serializers.ValidationError("Password didn't matched with existing password")
        if new_password != confirm_password:
            raise serializers.ValidationError("Password didn't matched !!")
        if self.context['request'].user.check_password(new_password):
            raise serializers.ValidationError("This password is not acceptable !!")
        return attrs


class UserInformationSerializer(serializers.ModelSerializer):
    organisation_data = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    class Meta:
        model = UserInformation
        fields = '__all__'
        # extra_kwargs = {
        # }

    def get_email(self, obj):
        return obj.user.email

    def get_organisation_data(self, obj):
        organisation = OrganisationMemberMapping.objects.filter(user=obj.user)
        organisation_data = OrganisationMemberMappingReadSerializer(instance=organisation, many=True).data
        return organisation_data