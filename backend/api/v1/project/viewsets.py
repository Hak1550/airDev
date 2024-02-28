# from rest_framework.authtoken.serializers import AuthTokenSerializer
from api.v1.shoot_setup.serializers import ShootBackgroundUpdateSerializer
from project.models import Project, ProjectComms, ProjectFiles, ProjectLinks
from organisation.models import ORGANISATION_ROLES, OrganisationComms, OrganisationMemberMapping
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
import datetime
from django.db.models import Q
from gear.models import AirCamera, AirCameraAssignedToProject, AirConnectionsToShoot, AirInstanceAssignedToProject, AirOperatorAssignedToShoot, CameraAssignedToProject, Camera
from generic import permissions, api
from project import models
from . import serializers
from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from users.models import NO_ROLE, PRODUCER, User, Role, ROLES_BY_NAME
from shoot_setup.models import ShootImage, ShootSetup
from permission.models import ProjectPermissionMapping
from django.db import transaction
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

class DuplicateProject(APIView):
    from rest_framework.permissions import IsAuthenticated
    model = models.Project
    serializer_class = serializers.ProjectSerializer
    read_serializer_class = serializers.ReadProjectSerializer
    permission_classes = [IsAuthenticated,]

    @staticmethod
    def get_image_url(obj):
        if obj:
            image_url_in_bucket = obj.url
            if "media/" in obj.url:
                image_url_in_bucket = obj.url.split("media/")[1]
            return image_url_in_bucket

    def post(self, request, format=None, project_id=None):
        try:
            project_to_copy = self.model.objects.get(id=project_id)
            serializer = self.serializer_class(data=request.data.dict(), context={"request": request})
            with transaction.atomic():
                if serializer.is_valid():
                    new_project = serializer.save(owner=request.user, logo=self.get_image_url(project_to_copy.logo), cover_image=self.get_image_url(project_to_copy.cover_image))
                    for project_member in project_to_copy.members.all():
                        new_project.members.add(project_member)

                    # entry in project permission mapping table for role assignment
                    roles = Role.objects.all()
                    for role in roles:
                        new_project_permission = ProjectPermissionMapping.objects.create(project=new_project, role=role)
                        old_project_permission = ProjectPermissionMapping.objects.filter(project=project_to_copy, role=role).first()
                        for user in old_project_permission.users.all():
                            new_project_permission.users.add(user)


                    admin_permission_obj = ProjectPermissionMapping.objects.filter(project=new_project, role__name="ADMIN")
                    if admin_permission_obj.exists():
                        admin_permission_obj.first().users.add(request.user)
                        admin_permission_obj.first().save()


                    # copy setup object and images
                    new_shoot_setup = ShootSetup.objects.create(project=new_project)
                    old_shoot_setup = ShootSetup.objects.get(project=project_to_copy)
                    shoot_setupt_images = ShootImage.objects.filter(shoot=old_shoot_setup)
                    shoot_setupt_images_data = ShootBackgroundUpdateSerializer(instance=shoot_setupt_images, many=True).data
                    for shoot_images in shoot_setupt_images_data:
                        data = {
                            "shoot": new_shoot_setup,
                            # "background_image": shoot_images.get("background_url", ""),
                            "background_image_base64": shoot_images.get("background_image_base64", ""),
                            "image_name": shoot_images.get("image_name", "")
                        }
                        ShootImage.objects.create(**data)

                    if old_shoot_setup.selected_shoot_image:
                        selected_image = old_shoot_setup.selected_shoot_image
                        selected_image_obj = ShootImage.objects.filter(id=selected_image).first()
                        new_shoot_image_obj = ShootImage.objects.filter(shoot=new_shoot_setup).first()
                        if new_shoot_image_obj:
                            ShootSetup.objects.filter(project=new_project).update(selected_shoot_image=new_shoot_image_obj.id)
                    # ends here

                    # copy air camera assigned to project
                    air_cameras = []
                    air_camera_assigned_to_project_copy = AirCameraAssignedToProject.objects.filter(project=project_to_copy)
                    for air_camera in air_camera_assigned_to_project_copy:
                        acap = AirCameraAssignedToProject.objects.create(project=new_project, camera=air_camera.camera)
                        air_cameras.append(acap)
                    #ends

                    # copy air instance assigned to project
                    air_instance_assigned_to_project_copy = AirInstanceAssignedToProject.objects.filter(project=project_to_copy)
                    for air_instance in air_instance_assigned_to_project_copy:
                        AirInstanceAssignedToProject.objects.create(project=new_project, instance=air_instance.instance, instance_operators=air_instance.instance_operators, order=air_instance.order)
                    #ends

                    # copy air operator assigned to shoot
                    air_operators = []
                    air_operator_assigned_to_project_copy = AirOperatorAssignedToShoot.objects.filter(project=project_to_copy)
                    for air_operator in air_operator_assigned_to_project_copy:
                        aoas = AirOperatorAssignedToShoot.objects.create(project=new_project, operator=air_operator.operator, camera_operator_x=air_operator.camera_operator_x, camera_operator_y=air_operator.camera_operator_y, camera_operator_rotation=air_operator.camera_operator_rotation)
                        air_operators.append(aoas)
                    #ends

                    # copy air connections to shoot
                    air_connections_to_project_copy = AirConnectionsToShoot.objects.filter(project=project_to_copy)
                    for index, air_connection in enumerate(air_connections_to_project_copy):
                        no_of_assignee_to_camera = air_connection.camera_operators.all().count()
                        # print(no_of_assignee_to_camera)
                        # print(air_operators)
                        acs = AirConnectionsToShoot.objects.create(project=new_project,
                            camera_x=air_connection.camera_x,
                            camera_y=air_connection.camera_y,
                            camera_image_x=air_connection.camera_image_x,
                            camera_image_y=air_connection.camera_image_y,
                            camera_rotation=air_connection.camera_rotation,
                            camera_placeholder=air_connection.camera_placeholder,
                            camera=air_cameras[index])
                        for x in range(no_of_assignee_to_camera):
                            if air_operators:
                                acs.camera_operators.add(air_operators[0])
                                air_operators.pop(0)
                    #ends

                    # copy project files
                    project_files_copy = ProjectFiles.objects.filter(project=project_to_copy)
                    for project_file in project_files_copy:
                        ProjectFiles.objects.create(project=new_project, file=project_file.file)
                    #ends

                    # copy project links
                    project_links_copy = ProjectLinks.objects.filter(project=project_to_copy)
                    for project_link in project_links_copy:
                        ProjectLinks.objects.create(project=new_project, title=project_link.title, url=project_link.url)
                    #ends

                    # copy project comms
                    project_comms_copy = ProjectComms.objects.filter(project=project_to_copy)
                    for project_comm in project_comms_copy:
                        ProjectComms.objects.create(project=new_project,type=project_comm.type, title=project_comm.title, url=project_comm.url)
                    #ends

                    new_project_data = self.read_serializer_class(instance=new_project, context={"request": request}).data

        except:
            return Response({"Something went Wrong "})    
        return Response({"data": new_project_data})

class ChangeRoleView(APIView):
    model = ProjectPermissionMapping
    serializer_class = serializers.ProjectPermissionMappingSerializer

    def post(self, request, format=None, pro_id=None, user_id=None):
        new_role = self.request.data.get("role_name", None)
        if new_role:
            try:
                role_obj = Role.objects.get(name=new_role)
                user = User.objects.get(id=user_id)

                # all_project_permissions = user.project_users.filter(project_id=pro_id)
                # for permission in all_project_permissions:
                #     permission.users.remove(user)
                #     permission.save()

                permission_obj = self.model.objects.filter(project_id=pro_id, role=role_obj)
                
                print(permission_obj)
                if permission_obj.exists():
                    permission_obj.first().users.add(user)
                if role_obj != 5:
                    CameraAssignedToProject.objects.filter(
                        project_id=pro_id, camera_operator_id=user_id
                    ).update(camera_operator=None)
                return Response({"status": 200})
            except:
                return Response({"error": "Please pass valid role name"})
        else:
            return Response({"error": "Please pass valid post data"})

class removeRoleView(APIView):
    model = ProjectPermissionMapping
    serializer_class = serializers.ProjectPermissionMappingSerializer
    print("h")
    def post(self, request, format=None, pro_id=None, user_id=None):
        print('k')
        new_role = self.request.data.get("role_name", None)
        if new_role:
            try:
                role_obj = Role.objects.get(name=new_role)
                user = User.objects.get(id=user_id)
                print(user)
                permission_obj = self.model.objects.filter(project_id=pro_id, role=role_obj)
                print(permission_obj)
                
                if permission_obj.exists():
                    permission_obj.first().users.remove(user)
                    a=serializers.ProjectPermissionMappingSerializer(permission_obj,many=True).data
                    return Response({"status": 200,"permission_obj":a})
            except:
                return Response({"error": "Please pass valid role name"})       #     
        #         role_obj = Role.objects.get(name=new_role)
        #         user = User.objects.get(id=user_id)

        #         # all_project_permissions = user.project_users.filter(project_id=pro_id)
        #         # for permission in all_project_permissions:
        #         #     permission.users.remove(user)
        #         #     permission.save()

        #         permission_obj = self.model.objects.filter(project_id=pro_id, role=role_obj)
        #         print(permission_obj)
        #         if permission_obj.exists():
        #             permission_obj.first().users.add(user)
        #         if role_obj != 5:
        #             CameraAssignedToProject.objects.filter(
        #                 project_id=pro_id, camera_operator_id=user_id
        #             ).update(camera_operator=None)
        #         return Response({"status": 200})

        else:
            return Response({"error": "Please pass valid post data"})

class AddMemberView(APIView):
    model = models.Project
    serializer_class = serializers.ProjectSerializer

    def get(self, request, format=None, pro_id=None, user_id=None):
        try:
            _status = status.HTTP_400_BAD_REQUEST
            obj = self.model.objects.get(pk=pro_id)
            serializer = self.serializer_class(obj, context={"request": request})
            obj_data = serializer.data
            user = self.request.user
            member = User.objects.filter(pk=user_id).first()
            if user.is_authenticated:
                if member in obj.members.all():
                    return Response({"error": "already member"}, status=_status)
                else:
                    role_obj = Role.objects.get(name=ROLES_BY_NAME["NO_ROLE"])
                    # check for organisation role of member
                    existing_producer_organisation = OrganisationMemberMapping.objects.filter(organisation=obj.organisation, user=member, role=ORGANISATION_ROLES[1][0]).exists()
                    if existing_producer_organisation:
                        role_obj = Role.objects.get(name=ROLES_BY_NAME["PRODUCER"])

                    existing_crew_organisation = OrganisationMemberMapping.objects.filter(organisation=obj.organisation, user=member, role=ORGANISATION_ROLES[2][0]).exists()    
                    if existing_crew_organisation:
                        role_obj = Role.objects.get(name=ROLES_BY_NAME["FIELD_CREW"])
                    
                    obj.members.add(member)
                    # entry in project permission mapping table for role assignment
                    user_obj = User.objects.get(pk=user_id)
                    permission_obj = ProjectPermissionMapping.objects.filter(
                        project=obj, role=role_obj
                    )
                    # need to set this user as crew for organisation
                    if permission_obj.exists():
                        permission_obj.first().users.add(member)
                    try:
                        already_member = OrganisationMemberMapping.objects.filter(organisation=obj.organisation, user=member).exists()    
                        if not already_member:
                            organisation_mapping = OrganisationMemberMapping(organisation=obj.organisation, user=member, role=ORGANISATION_ROLES[2][0])
                            organisation_mapping.save()
                    except:
                        return Response({"status": 0, "message": "Some Error occured !!"}, status=_status)
                    # if user != obj.owner:
                    #     self.send_notification(user, obj, obj_data)
                _status = status.HTTP_202_ACCEPTED
                return Response({"status": 1}, status=_status)
            else:
                return Response({"error": "user not authenticated"}, status=_status)
        except:
            return Response({"status": 0}, status=_status)

class RemoveMemberView(APIView):
    model = models.Project
    serializer_class = serializers.ProjectSerializer

    def get(self, request, format=None, pro_id=None, user_id=None):
        try:
            _status = status.HTTP_400_BAD_REQUEST
            obj = self.model.objects.get(pk=pro_id)
            serializer = self.serializer_class(obj, context={"request": request})
            obj_data = serializer.data
            user = self.request.user
            member = User.objects.filter(pk=user_id).first()
            if user.is_authenticated:
                print(obj.members.all())
                if member in obj.members.all():
                    obj.members.remove(member)
                    # delete entry from project permission mapping table for role assignment
                    user_obj = User.objects.get(pk=user_id)
                    obj_to_edit = ProjectPermissionMapping.objects.filter(
                        project=obj,users__id=user_id
                    )
                    for obj in obj_to_edit:
                        obj.users.remove(member)
                    _status = status.HTTP_202_ACCEPTED
                    return Response({"status": 1, "removed": True}, status=_status)
                else:
                    return Response({"error": "No user found"}, status=_status)
            else:
                return Response({"error": "user not authenticated"}, status=_status)
        except:
            return Response({"status": 0, "removed": False}, status=_status)


class ProjectFilesViewset(viewsets.ModelViewSet):
    serializer_class = serializers.ProjectFilesSerializer
    model = models.ProjectFiles
    queryset = models.ProjectFiles.objects.all()

    def create(self, request, *args, ** kwargs):
        _status = status.HTTP_400_BAD_REQUEST
        files_data = request.FILES.getlist("files")
        try:
            project_id = self.request.data.get("project_id", "")
            project = models.Project.objects.get(id=project_id)
            if project:
                _status = status.HTTP_201_CREATED
                for file in files_data:
                    models.ProjectFiles.objects.create(project=project, file=file)
                return Response({"result": "done"}, status=_status)
        except:
            pass
        return Response({"result": "Some Error Occured !"}, status=_status)

    def get_project_files(self, request, project_id=None):
        files = models.ProjectFiles.objects.filter(project=project_id)
        files_data = serializers.ProjectFilesSerializer(files, many=True).data
        _status = status.HTTP_200_OK
        return Response({"result": files_data}, status=_status)

class ProjectCommsViewset(viewsets.ModelViewSet):
    serializer_class = serializers.ProjectCommsSerializer
    model = models.ProjectComms
    queryset = models.ProjectComms.objects.all()
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    search_fields = [
        'type',
        'title'
    ]

    def create(self, request, *args, ** kwargs):
        _status = status.HTTP_400_BAD_REQUEST
        comms_data = request.data.get('comms', list())
        try:
            project_id = self.request.data.get("project_id", "")
            project = models.Project.objects.get(id=project_id)
            if project:
                _status = status.HTTP_201_CREATED
                for comm_data in comms_data:
                    self.model.objects.create(project=project, **comm_data)
                return Response({"result": request.data}, status=_status)
        except:
            pass
        return Response({"result": "Some Error Occured !"}, status=_status)

    def get_project_comms(self, request, project_id=None):
        files = models.ProjectComms.objects.filter(project=project_id)
        files_data = serializers.ProjectCommsSerializer(files, many=True).data
        _status = status.HTTP_200_OK
        return Response({"result": files_data}, status=_status)

class ProjectLinksViewset(viewsets.ModelViewSet):
    serializer_class = serializers.ProjectLinksSerializer
    model = models.ProjectLinks
    queryset = models.ProjectLinks.objects.all()

    def create(self, request, *args, ** kwargs):
        _status = status.HTTP_400_BAD_REQUEST
        links_data = request.data.get('links', list())
        try:
            project_id = self.request.data.get("project_id", "")
            project = models.Project.objects.get(id=project_id)
            if project:
                _status = status.HTTP_201_CREATED
                for link_data in links_data:
                    self.model.objects.create(project=project, **link_data)
                return Response({"result": request.data}, status=_status)
        except:
            pass
        return Response({"result": "Some Error Occured !"}, status=_status)

    def get_project_links(self, request, project_id=None):
        files = models.ProjectLinks.objects.filter(project=project_id)
        files_data = serializers.ProjectLinksSerializer(files, many=True).data
        _status = status.HTTP_200_OK
        return Response({"result": files_data}, status=_status)

class AllProjectsView(generics.ListAPIView):
    model = models.Project
    serializer_class = serializers.ProjectSerializer
    # permission_classes = [IsAuthenticated,]
    pagination_class = api.RegularResultsSetPagination
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filterset_fields = ["name"]
    search_fields = [
        'name']


    def get_queryset(self, *args, **kwargs):
        project_ids = []
        try:
            print("hello")
            projects_associated = ProjectPermissionMapping.objects.filter(
                users__id=self.request.user.id, project__is_removed=False
            ).values("project")
            for project_associated in projects_associated:
                project_ids.append(project_associated.get("project", None))
        except:
            pass
        return models.Project.objects.filter(pk__in=project_ids)

class ProjectViewSet(api.APIModelViewSet):
    write_serializer_class = serializers.ProjectSerializer
    read_serializer_class = serializers.ReadProjectSerializer
    # queryset = models.Project.objects.all(owner=self.request.user)
    pagination_class = api.RegularResultsSetPagination
    model = models.Project
    permission_classes = [permissions.IsProjectOwnerOrProducerORReadOnly]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filterset_fields = ["name", "client", "status"]
    search_fields = [
        'name', 'client']
    
    def destroy(self, request, pk=None):
        try:
            _status = status.HTTP_204_NO_CONTENT
            project = self.model.objects.get(id=pk)
            user_permission = OrganisationMemberMapping.objects.filter(Q(organisation=project.organisation.id), Q(user=request.user), (Q(role=ORGANISATION_ROLES[0][0]) | Q(role=ORGANISATION_ROLES[1][0])))
            print(user_permission)
            print(request.user)
            if user_permission:
                self.perform_destroy(project)
                return Response({}, status=_status)
            else:
                print("2")
                user_project_producer = ProjectPermissionMapping.objects.filter(project=project, users__id__icontains=request.user.id, role = PRODUCER).exists()
                if user_project_producer:
                    self.perform_destroy(project)
                return Response({}, status=_status)
        except:
            return Response({"Something Went Wrong !!"}, status=status.HTTP_400_BAD_REQUEST)
            

    def get_queryset(self):
        project_ids = []
        # print("hell")
        try:
            projects_associated = ProjectPermissionMapping.objects.filter(
                users__id=self.request.user.id, project__is_removed=False
            ).exclude(role=NO_ROLE).values("project")
            for project_associated in projects_associated:
                project_ids.append(project_associated.get("project", None))
        except:
            pass
        return models.Project.objects.filter(pk__in=project_ids)

    @classmethod
    def copy_organisation_comms(cls, project):
        org_comms = OrganisationComms.objects.filter(organisation=project.organisation, is_copy_to_projects=True)
        for org_comm in org_comms:
            ProjectComms(
                project=project, 
                type = org_comm.type,
                title = org_comm.title,
                url = org_comm.url
                ).save()

    def create(self, request, *args, **kwargs):
        serializer = self.write_serializer_class(
            data=request.data, context={"request": request}
        )
        _status = status.HTTP_400_BAD_REQUEST
        data = []
        if serializer.is_valid():
            project_instance = serializer.save(owner=request.user)
            _status = status.HTTP_201_CREATED
            data = serializer.data
            # entry in project permission mapping table for role assignment
            roles = Role.objects.all()
            for role in roles:
                ProjectPermissionMapping.objects.create(project=project_instance, role=role)


            org_owner = serializer.validated_data['organisation'].owner

            # adding creater as admin and producer
            admin_permission_obj = ProjectPermissionMapping.objects.filter(project=project_instance, role__name="ADMIN")
            if admin_permission_obj.exists():
                admin_permission_obj.first().users.add(org_owner)
                admin_permission_obj.first().save()
                project_instance.members.add(org_owner)
            
            admin_permission_obj = ProjectPermissionMapping.objects.filter(project=project_instance, role__name="PRODUCER")
            if admin_permission_obj.exists():
                admin_permission_obj.first().users.add(request.user)
                admin_permission_obj.first().save()
                project_instance.members.add(request.user)
            # ends here

            # if org_owner:
            #     if org_owner != request.user:
            #         admin_permission_obj = ProjectPermissionMapping.objects.filter(project=project_instance, role__name="PRODUCER")
            #         if admin_permission_obj.exists():
            #             admin_permission_obj.first().users.add(request.user)
            #             admin_permission_obj.first().save()
            #             project_instance.members.add(request.user)

            # entry for shoot set up screen
            shoot_obj, created = ShootSetup.objects.get_or_create(
                project=project_instance,
            )
            result_project = Project.objects.get(id=project_instance.id)
            # copy org comms into project
            self.copy_organisation_comms(result_project)
            result_project_data = self.read_serializer_class(result_project, context={"request": request}).data
        else:
            return Response(
            {"data": data, "status": _status, "error": serializer.errors},
            status=_status,
        )
        return Response(
            {"data": result_project_data, "status": _status, "error": serializer.errors},
            status=_status,
        )

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.read_serializer_class(instance)
            data = serializer.data
            _status = status.HTTP_202_ACCEPTED
            _error = None
        except ObjectDoesNotExist as e:
            _status = status.HTTP_404_NOT_FOUND
            _error = e
            data = {}
        return Response(
            {"data": data, "status": _status, "error": _error}, status=_status
        )

    def update(self, request, *args, **kwargs):
        data = self.request.data
        instance = self.get_object()
        serializer = self.write_serializer_class(
            instance, data=data, context={"request": request}, partial=True
        )
        _status = status.HTTP_400_BAD_REQUEST
        if serializer.is_valid():
            serializer.save()
            data = self.read_serializer_class(instance, context={"request": request}).data
            _status = status.HTTP_201_CREATED
            return Response(
                {"data": data, "status": _status, "error": serializer.errors},
                status=_status,
            )
        else:
            return Response(
                {"status": _status, "error": serializer.errors}, status=_status
            )


class CollaboratorProjectsView(APIView):
    from rest_framework.permissions import AllowAny, IsAuthenticated
    serializer_class = serializers.ProjectSerializer
    permission_classes = [IsAuthenticated,]

    def get(self, request, format=None, collaborator_id=None):
        try:
            organisation_mapping = OrganisationMemberMapping.objects.get(id=collaborator_id)
            user = organisation_mapping.user
            projects = ProjectPermissionMapping.objects.values('project').filter(users__id=user.id, project__organisation=organisation_mapping.organisation)
            project_ids = [p['project'] for p in projects]
            collaborator_projects = Project.objects.filter(id__in=project_ids)
            project_serializer = self.serializer_class(collaborator_projects, many=True).data
            return Response({"response": project_serializer})
        except:
            return Response({"response": []})

class RelatedProjectByAirIdView(APIView):
    serializer_class = serializers.ProjectSerializer
    model = models.Project

    def get(self, request, format=None, air_id=None):
        user = request.user
        _status = status.HTTP_400_BAD_REQUEST
        if user:
            try:
                camera_instance = AirCamera.objects.get(air_id=air_id)
                if camera_instance:
                    today = datetime.datetime.today()

                    # camera with the air id found -> first validation
                    related_projects_permitted = (
                        ProjectPermissionMapping.objects.select_related("project")
                            .filter(
                            project__shoot_date__gte=today, project__status=1, users=user
                        )
                            .order_by("-project__shoot_date", "project__shoot_time")
                    )
                    serializer = None
                    for related_project_permitted in related_projects_permitted:
                        # for checking cameras_assigned with air_id:\
                        camera_assigned = (AirCameraAssignedToProject.objects.select_related(
                                "camera"
                            ).filter(
                                project=related_project_permitted.project,
                                camera__air_id=air_id,
                            )[:1]
                        )
                        if camera_assigned:
                            serializer = self.serializer_class(
                                instance=related_project_permitted.project
                            )
                            _status = status.HTTP_202_ACCEPTED
                    if serializer:
                        return Response(
                            {"data": serializer.data, "status": _status}, status=_status
                        )
                    else:
                        Response({"error": "No Results Found"}, status=_status)

                else:
                    return Response(
                        {"error": "Please pass valid AIR ID"}, status=_status
                    )
            except:
                return Response({"error": "Please pass valid AIR ID"}, status=_status)
        return Response({"error": "No Results Found"}, status=_status)

#
# class AddAirCameraViewSet(GenericAPIView):
#     permission_classes = [permissions.CustomPermission]
#
#     def post(self, request, *args, **kwargs):
#         try:
#             data = request.data
#             users = data.pop("users")
#             project_id = request.kwargs["project_id"]
#             camera_id = request.kwargs["camera_id"]
#
#             queryset = AirCameraAssignedToProject.objects.filter(
#                 project_id=project_id, camera_id=camera_id
#             )
#
#             if queryset.exists():
#                 obj = queryset.first()
#                 obj.update(**data)
#                 obj.users.clear()
#             else:
#                 air_camera_data = {
#                     "project_id": project_id,
#                     "camera_id": camera_id,
#                     **data,
#                 }
#                 obj = AirInstanceAssignedToProject.objects.create(**air_camera_data)
#
#             for user in users:
#                 obj.camera_operators.add(user)
#             obj.save()
#
#             return Response(
#                 {"status": "OK"},
#                 status=status.HTTP_200_OK,
#             )
#         except Exception as ex:
#             return Response(
#                 {"status": "error", "error": str(ex)},
#                 status=status.HTTP_200_OK,
#             )
#
#
# class AddInstanceViewSet(GenericAPIView):
#     permission_classes = [permissions.CustomPermission]
#
#     def post(self, request, *args, **kwargs):
#         try:
#             instances = request.data
#             project_id = request.kwargs["project_id"]
#             AirInstanceAssignedToProject.objects.filter(project_id=project_id).delete()
#             for instance in instances:
#                 users = instance.pop("users")
#                 obj = AirInstanceAssignedToProject.objects.create(**instance)
#                 for user in users:
#                     obj.users.add(user)
#                 obj.save()
#
#             return Response(
#                 {"status": "OK"},
#                 status=status.HTTP_200_OK,
#             )
#         except Exception as ex:
#             return Response(
#                 {"status": "error", "error": str(ex)},
#                 status=status.HTTP_200_OK,
#             )
