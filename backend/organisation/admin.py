from django.contrib import admin
from organisation.models import Collection, CollectionItem, MediaMetadata, Organisation, OrganisationComms, OrganisationMemberMapping, UrlTags
# Register your models here.


@admin.register(Organisation)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id','name')

@admin.register(OrganisationMemberMapping)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'organisation', 'user', 'role')

@admin.register(OrganisationComms)
class OrganisationCommsAdmin(admin.ModelAdmin):
    list_display = ('id', 'organisation', 'type', 'title', 'url', 'is_copy_to_projects', 'created_at')

@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'organisation', 'name')

@admin.register(CollectionItem)
class CollectionItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'collection', 'organisation', 'key', 'thumbnail_url', 'bucket')

admin.site.register(UrlTags)
admin.site.register(MediaMetadata)