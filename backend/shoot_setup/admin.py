from django.contrib import admin
from shoot_setup.models import ShootSetup, ShootImage
# Register your models here.

@admin.register(ShootSetup)
class ShootAdmin(admin.ModelAdmin):
    list_display = ('id', 'project')

@admin.register(ShootImage)
class ShootImageAdmin(admin.ModelAdmin):
    pass