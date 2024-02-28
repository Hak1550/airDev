from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import viewsets

router = DefaultRouter()
router.register("", viewsets.ProjectViewSet, basename="project")

project_files_router = DefaultRouter()
project_files_router.register('', viewsets.ProjectFilesViewset, basename='project-files')

project_comms_router = DefaultRouter()
project_comms_router.register('', viewsets.ProjectCommsViewset, basename='project-comms')

project_links_router = DefaultRouter()
project_links_router.register('', viewsets.ProjectLinksViewset, basename='project-links')

app_name = "project"

urlpatterns = [
    path('all-projects', viewsets.AllProjectsView.as_view(), name='all-projects'),
    path("<int:project_id>/duplicate-project/", viewsets.DuplicateProject.as_view()),
    path("project-links/", include(project_links_router.urls)),
    path("get-project-links/<int:project_id>", viewsets.ProjectLinksViewset.as_view({'get':'get_project_links'}), name="prpject-links"),
    path("project-comms/", include(project_comms_router.urls)),
    path("get-project-comms/<int:project_id>", viewsets.ProjectCommsViewset.as_view({'get':'get_project_comms'}), name="prpject-comms"),
    path("project-file/", include(project_files_router.urls)),
    path("get-project-files/<int:project_id>", viewsets.ProjectFilesViewset.as_view({'get':'get_project_files'}), name="prpject-files"),
    path("", include(router.urls)),
    path("<int:pro_id>/<int:user_id>/add_member/", viewsets.AddMemberView.as_view()),
    path(
        "<int:pro_id>/<int:user_id>/remove_member/", viewsets.RemoveMemberView.as_view()
    ),
    path("<int:pro_id>/<int:user_id>/change_role", viewsets.ChangeRoleView.as_view()),
    path("<int:pro_id>/<int:user_id>/remove_role/", viewsets.removeRoleView.as_view()),
    path("related-project/<str:air_id>/", viewsets.RelatedProjectByAirIdView.as_view()),
    path("collaborator-projects/<int:collaborator_id>/", viewsets.CollaboratorProjectsView.as_view())
]
