from django.contrib import admin
from permission.models import OrganisationPermissionType, PermissionType, ProjectPermissionMapping

# Register your models here.


@admin.register(PermissionType)
class PermissionTypesAdmin(admin.ModelAdmin):
    list_display = ("role", "permissions")

@admin.register(OrganisationPermissionType)
class PermissionTypesAdmin(admin.ModelAdmin):
    list_display = ("role", "permissions")


@admin.register(ProjectPermissionMapping)
class ProjectPermissionMappingAdmin(admin.ModelAdmin):
    list_display = ("project", "role")
    pass
