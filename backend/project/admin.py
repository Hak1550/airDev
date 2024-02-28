from django.contrib import admin
from project.models import Project, ProjectComms, ProjectFiles, ProjectLinks
# Register your models here.


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id','project_id', 'name')


@admin.register(ProjectFiles)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id','project', 'file', 'created_at', 'updated_at')


@admin.register(ProjectComms)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id','project', 'type', 'title', 'url', 'created_at', 'updated_at')


@admin.register(ProjectLinks)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id','project', 'title', 'url', 'created_at', 'updated_at')