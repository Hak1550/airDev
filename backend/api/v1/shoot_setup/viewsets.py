# from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from generic import permissions, api
from shoot_setup import models
from . import serializers
from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from users.models import User
from permission.models import ProjectPermissionMapping


class ShootByProjectView(APIView):
    model = models.ShootSetup
    serializer_class = serializers.ShootSerializer

    def get(self, request, format=None, pro_id=None):
        obj = self.model.objects.filter(project=pro_id).first()
        # print(obj)
        _status = status.HTTP_400_BAD_REQUEST
        if obj:
            serializer = self.serializer_class(obj, context={"request": request})
            obj_data = serializer.data
            print(obj_data)
            _status = status.HTTP_200_OK
            return Response({"data": obj_data, "status": _status}, status=_status)
        return Response(
            {"error": "Something went wrong. Please try again with different id!"}
        )


class ShootViewSet(api.APIModelViewSet):
    write_serializer_class = serializers.ShootSerializer
    update_serializer_class = serializers.ShootUpdateSerializer
    model = models.ShootSetup
    
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        project_ids = []
        try:
            projects_associated = ProjectPermissionMapping.objects.filter(
                user=self.request.user
            ).values("project")
            for project_associated in projects_associated:
                project_ids.append(project_associated.get("project", None))
        except:
            pass
        return models.ShootSetup.objects.filter(project__in=project_ids)

    def create(self, request, *args, **kwargs):
        serializer = self.write_serializer_class(
            data=request.data, context={"request": request}
        )
        _status = status.HTTP_400_BAD_REQUEST
        data = []
        if serializer.is_valid():
            serializer.save(director=request.user)
            _status = status.HTTP_201_CREATED
            data = serializer.data
        return Response(
            {"data": data, "status": _status, "error": serializer.errors},
            status=_status,
        )

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = serializers.ShootSerializer(instance)
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
        # print(data)
        instance = models.ShootSetup.objects.get(id=kwargs.get("pk"))
        # print(type(instance))   
        serializer = self.update_serializer_class(
            instance, data=data, context={"request": request}, partial=True
        )
        print(self.update_serializer_class(instance).data)
        # print(serializer.data)
        _status = status.HTTP_400_BAD_REQUEST
        if serializer.is_valid():
            serializer.save()
            # print(serializer)
            _status = status.HTTP_202_ACCEPTED
            return Response(
                {"status": _status, "project_id": instance.project_id,}, status=_status
            )
        else:
            return Response(
                {"status": _status, "error": serializer.errors}, status=_status
            )


class ShootBackgroundViewSet(generics.UpdateAPIView):
    queryset = models.ShootImage.objects.all()
    serializer_class = serializers.ShootBackgroundUpdateSerializer

    def update(self, request, *args, **kwargs):
        obj = models.ShootSetup.objects.get(id=kwargs.get("shoot_id"))
        _status = status.HTTP_400_BAD_REQUEST
        response = {"status": _status}
        if obj:
            resource_id = self.request.data.get("shoot_image_id", None)
            if resource_id:
                serializer = self.serializer_class(
                    instance=models.ShootImage.objects.get(id=resource_id),
                    data={
                        "background_image_base64": request.data,
                        "image_name": 'static name',
                        "shoot": obj.id,
                    },
                    context={"request": request},
                )
            else:
                serializer = self.serializer_class(
                    data={
                        "background_image_base64": request.data["background_image_base64"],
                        "image_name": request.data.get("background_image_name", "None"),
                        "shoot": obj.id,
                    },
                    context={"request": request},
                )
            if serializer.is_valid():
                image_obj = serializer.save()
                obj.selected_shoot_image = image_obj.id
                obj.save()
                response = {"status": _status, "project_id": obj.project_id}
            _status = status.HTTP_202_ACCEPTED
            return Response(response, status=_status)
        return Response(
            {"error": "Something went wrong. Please try again with different id!"}
        )


class ShootBackgroundDeleteViewSet(generics.DestroyAPIView):
    queryset = models.ShootImage.objects.all()
    serializer_class = serializers.ShootBackgroundUpdateSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]

    def delete(self, request, *args, **kwargs):
        try:
            shoot_image_id = kwargs.get("shoot_image_id")
            obj = models.ShootImage.objects.get(pk=shoot_image_id)
            shoot = obj.shoot
            if shoot.selected_shoot_image == obj.id:
                backgrounds = list(shoot.shoot_setup_background.all())
                backgrounds = list(filter(lambda b: b.id != obj.id, backgrounds))
                if len(backgrounds) > 0:
                    shoot.selected_shoot_image = backgrounds[0].id
                    shoot.save()
            obj.delete()
            _status = status.HTTP_202_ACCEPTED
            return Response({"status": 1}, status=_status)
        except:
            _status = status.HTTP_400_BAD_REQUEST
            return Response({"status": 0}, status=_status)
