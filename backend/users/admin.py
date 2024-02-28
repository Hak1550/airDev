import imp
from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from users.forms import UserChangeForm, UserCreationForm
from users.models import InvitedUser, ResetPassword, ResetPasswordToken, UserInformation, Role, ValidateUserEmail

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name",)}),) + auth_admin.UserAdmin.fieldsets
    list_display = ["username", "name", "is_superuser", "is_online", "last_activity"]
    search_fields = ["name"]


@admin.register(UserInformation)
class UserInformationAdmin(admin.ModelAdmin):
    list_display = ('id','first_name', 'last_name')


@admin.register(ResetPasswordToken)
class ResetPasswordTokenAdmin(admin.ModelAdmin):
    list_display = ('id','code', 'user')

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id','name', 'description')

@admin.register(InvitedUser)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'organisation', 'project', 'role')

@admin.register(ValidateUserEmail)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'is_confirmed')

@admin.register(ResetPassword)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'is_reset')