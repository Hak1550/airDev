# from rest_framework.authtoken.serializers import AuthTokenSerializer

import json
from organisation.models import Organisation
from users.models import UserInformation
from payment.models import INVOICE_STATUS_TYPES, PACKAGE_TYPES, Package
from gear.models import AirCamera, AirInstance, AirInstanceActivityTracker, AirInstanceBillingTracker, AirInstanceHoursTracker, OrganisationOwnedCamera, AirCameraAssignedToProject
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from generic import permissions, api
from gear import models
from . import serializers
from rest_framework import status
from project.models import Project
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import mixins, viewsets, generics        
from datetime import datetime, timedelta
import pytz
from django.conf import settings
from django.db import transaction
from payment.stripe_payment import Customer, Invoice, Subscription, CheckOutSession
from rest_framework.views import APIView

class CameraViewSet(api.APIModelViewSet):
    write_serializer_class = serializers.CameraSerializer
    queryset = models.Camera.objects.all()
    model = models.Camera
    permission_classes = [permissions.IsProducer]

    # @action(detail=False)

    def create(self, request, *args, **kwargs):
        serializer = self.write_serializer_class(
            data=request.data, context={"request": request}
        )
        _status = status.HTTP_400_BAD_REQUEST
        data = []
        if serializer.is_valid():
            serializer.save()
            _status = status.HTTP_201_CREATED
            data = serializer.data
        return Response(
            {"data": data, "status": _status, "error": serializer.errors},
            status=_status,
        )

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = serializers.CameraSerializer(instance)
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
            instance, data=data, context={"request": request}
        )
        _status = status.HTTP_400_BAD_REQUEST
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            _status = status.HTTP_201_CREATED
        return Response(
            {"data": data, "status": _status, "error": serializer.errors},
            status=_status,
        )


class AirCameraViewSet(api.APIModelViewSet):
    write_serializer_class = serializers.AirCameraSerializer
    update_serializer_class = serializers.AirCameraUpdateSerializer
    queryset = models.AirCamera.objects.all()
    model = models.AirCamera
    permission_classes = [IsAuthenticated]

    @classmethod
    def is_valid(self, air_id):
        return models.AirCamera.objects.filter(air_id=air_id, is_available=True).exists()

    def is_valid_camera(self, request, *args, **kwargs):
        air_id = kwargs.get("air_id", "")
        response = self.is_valid(air_id)
        return Response({"exist": response})

    def get_camera_air_id(self, request, *args, **kwargs):
        air_id = kwargs.get("air_id", "")
        is_valid = self.is_valid(air_id)
        if is_valid:
            camera = models.AirCamera.objects.get(air_id=air_id)
            serializer = serializers.AirCameraSerializer(camera)
            data = serializer.data
            return Response({"result": data})
        return Response({"result": None, "error": "Please Pass valid Air Id"})

    def create(self, request, *args, **kwargs):
        serializer = self.write_serializer_class(
            data=request.data, context={"request": request}
        )
        _status = status.HTTP_400_BAD_REQUEST
        data = []
        if serializer.is_valid():
            serializer.save()
            _status = status.HTTP_201_CREATED
            data = serializer.data
        return Response(
            {"data": data, "status": _status, "error": serializer.errors},
            status=_status,
        )

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = serializers.AirCameraSerializer(instance)
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
        serializer = self.update_serializer_class(
            instance, data=data, context={"request": request}
        )
        _status = status.HTTP_400_BAD_REQUEST
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            _status = status.HTTP_200_OK
        return Response(
            {"data": data, "status": _status, "error": serializer.errors},
            status=_status,
        )


class AirInstanceRaiseInvoiceView(generics.GenericAPIView):

    def get(self, request, air_instance_id=None):
        from django.db.models import Sum
        import math 
        from gear.models import AirInstanceHoursTracker
        from payment.models import Invoice as Invoice_Model
        _status = status.HTTP_400_BAD_REQUEST
        timezone = pytz.timezone(settings.TIME_ZONE)
        current_date_time = datetime.now(timezone)
        gap_7_days = current_date_time - timedelta(days = 7)
        data = AirInstanceHoursTracker.objects.values("instance","instance__organisation__owner").filter(time__gte=gap_7_days, is_paid=False, calculated=False).order_by('instance').annotate(total_hours=Sum('hours_used'))
        package = Package.objects.filter(package_type=PACKAGE_TYPES[2][0]).first()
        description = "Your invoice for the instance used for the period : "+ str(gap_7_days.strftime("%d %B %Y"))+ " - "+str(current_date_time.strftime("%d %B %Y"))
        for instance in data:
            user_information = UserInformation.objects.get(user=instance['instance__organisation__owner'])
            charges = math.ceil(instance['total_hours']) * int(package.price)
            invoice_item = Invoice.createItem(amount=charges, customer=user_information.stripe_customer_id, currency='usd', description=description)
            invoice = Invoice.create(
                customer=user_information.stripe_customer_id,
                description=description,
                metadata={
                    "week_start": gap_7_days,
                    "week_end": current_date_time,
                    "instance": instance['instance']
                }
            )
            finalize_invoice = Invoice.finalize_invoice(invoice.id)
            air_instance = AirInstance.objects.get(id=instance['instance'])
            AirInstanceBillingTracker(
                instance = air_instance,
                total_hours = instance['total_hours'],
                amount = charges,
                week_start = gap_7_days,
                week_end = current_date_time,
                latest_invoice_id = finalize_invoice['id']
            ).save()
            # organisation = Organisation.objects.get(owner=user_information.user)
            # Invoice_Model(
            #     organisation = organisation,
            #     amount=charges, 
            #     invoice_id=finalize_invoice['id'], 
            #     invoice_url = finalize_invoice['invoice_pdf'],
            #     status=INVOICE_STATUS_TYPES[0][0]
            # ).save()
            AirInstanceHoursTracker.objects.filter(instance=air_instance, time__gte=gap_7_days).update(calculated=True)
        print("task ends here!!!")
        _status = status.HTTP_200_OK
        return Response({"status": 1}, status=_status)

class AirInstanceStopView(generics.GenericAPIView):

    def get(self, request, air_instance_id=None):
        _status = status.HTTP_400_BAD_REQUEST
        try:
            instance = AirInstance.objects.get(id=air_instance_id)
        except ObjectDoesNotExist:
            return Response({"error": "No Air Instance Found with given Id"}, status = _status)
        previous_activity = AirInstanceActivityTracker.objects.filter(instance=instance).latest('time')
        if previous_activity.activity_type == 'stop':
            return Response({"error": "Given Air Instance is not Active, Please Start the instance first"}, status = _status)
        with transaction.atomic():
            timezone = pytz.timezone(settings.TIME_ZONE)
            current_time = datetime.now(timezone)
            AirInstanceActivityTracker(
                instance = instance,
                time = datetime.fromtimestamp(current_time.timestamp()),
                activity_type = 'stop'
            ).save()

            time_delta = current_time - previous_activity.time
            total_hours = round(((time_delta.total_seconds() / 60) / 60), 2)

            AirInstanceHoursTracker(
                instance = instance,
                hours_used = total_hours,
                time = datetime.fromtimestamp(current_time.timestamp())
            ).save()

        _status = status.HTTP_200_OK
        return Response({"status": 1}, status=_status)

class AirInstanceStartView(generics.GenericAPIView):

    def get(self, request, air_instance_id=None):
        _status = status.HTTP_400_BAD_REQUEST
        try:
            instance = AirInstance.objects.get(id=air_instance_id)
        except ObjectDoesNotExist:
            return Response({"error": "No Air Instance Found with given Id"}, status = _status)
        try:
            previous_activity = AirInstanceActivityTracker.objects.filter(instance=instance).latest('time')
            if previous_activity.activity_type == 'start':
                return Response({"error": "Given Air Instance Already Active"}, status = _status)
        except:
            pass
        timezone = pytz.timezone(settings.TIME_ZONE)
        AirInstanceActivityTracker(
            instance = instance,
            time = datetime.fromtimestamp(datetime.now(timezone).timestamp()),
            activity_type = 'start'
        ).save()
        _status = status.HTTP_200_OK
        return Response({"status": 1}, status=_status)

class DeactivateCameraView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, air_id=None):
        _status = status.HTTP_400_BAD_REQUEST
        try:
            camera = AirCamera.objects.get(air_id=air_id)
            onboarded_camera = OrganisationOwnedCamera.objects.filter(camera=camera,is_active=True,is_paid=True).first()
            if onboarded_camera.organisation.owner != request.user:
                return Response({"error": "You are not allowed to perform this action."}, status = _status)
            stripe_subscription_id = onboarded_camera.stripe_subscription_id
            stripe_subscription_obj = Subscription.delete(stripe_subscription_id)
            if stripe_subscription_obj and stripe_subscription_obj['status'] == 'canceled':
                onboarded_camera.is_deactivated = True
                onboarded_camera.save()
                camera.is_available = True
                camera.save()
                AirCameraAssignedToProject.objects.filter(camera=camera).delete()
                _status = status.HTTP_200_OK
                return Response({"status": 1}, status=_status)
            else:
                _status = status.HTTP_400_BAD_REQUEST
                return Response({"status": 0}, status=_status) 
        except Exception as e:
            return Response({"error": str(e)}, status = _status)

class OnboardCameraViewSet(viewsets.GenericViewSet,
      mixins.CreateModelMixin,  
      mixins.RetrieveModelMixin,
      mixins.UpdateModelMixin):
    serializer_class = serializers.OnboardAirCameraSerializer
    # update_serializer_class = serializers.AirCameraUpdateSerializer
    queryset = models.OrganisationOwnedCamera.objects.all()
    model = models.OrganisationOwnedCamera
    permission_classes = [IsAuthenticated]

    def get_my_cameras(self, request, organisation_id=None):
        cameras = self.model.objects.filter(organisation=organisation_id)
        files_data = self.serializer_class(cameras, many=True).data
        _status = status.HTTP_200_OK
        return Response({"result": files_data}, status=_status)

    @classmethod
    def is_valid(self, air_id):
        return models.AirCamera.objects.filter(air_id=air_id, is_available=True).exists()

    def is_valid_camera(self, request, *args, **kwargs):
        air_id = kwargs.get("air_id", "")
        response = self.is_valid(air_id)
        return response

    def create(self, request, *args, **kwargs):
        air_id = request.data.get('air_id', '')
        if not air_id:
            return Response({
                "data": "Please provide AIR ID"
            }, status = status.HTTP_400_BAD_REQUEST)
        check_valid = self.is_valid_camera(request, air_id=air_id)
        _status = status.HTTP_400_BAD_REQUEST
        if check_valid:
            with transaction.atomic():
                user_information = UserInformation.objects.get(user=request.user)
                if not user_information.stripe_customer_id:
                    name = user_information.first_name + " " + user_information.last_name
                    address = {
                        "line1": "Demo Client Address",
                        "country": "us"
                    }
                    shipping = {
                        "address": address,
                        "name": name
                    }
                    customer = Customer.create(email=user_information.user.email, name=name, address=address, shipping=shipping)
                    stripe_cus_id = customer['id']
                    user_information.stripe_customer_id = stripe_cus_id
                    user_information.save()
                    return Response(
                        {"data": "Please add payment method", "status": _status},
                        status=_status,
                    )
                camera = AirCamera.objects.get(air_id=air_id)
                # updated_request = request.POST.copy()
                # updated_request.update({'camera': camera.id})
                serializer = self.serializer_class(
                    data=request.data, context={"request": request}
                )
                _status = status.HTTP_400_BAD_REQUEST
                data = []
                if serializer.is_valid():
                    package = Package.objects.filter(package_type=PACKAGE_TYPES[1][0]).first()
                    if not serializer.validated_data.get('mode', None):
                        if package.type == 1:
                            mode = 'subscription'
                    else:
                        mode = serializer.validated_data.get('mode', 'payment')
                    checkout_session = CheckOutSession.create(
                        line_items=[
                            {
                            "price": package.stripe_price_id,
                            "quantity": 1
                            },
                        ],
                        mode = mode,
                        customer = user_information.stripe_customer_id,
                        success_url = settings.APP_BASE_URL + "settings/assets?payment_status=success",
                        cancel_url = settings.APP_BASE_URL + "settings/assets?payment_status=cancel",
                    )
                    serializer.save(camera=camera, payment_session_id=checkout_session['id'])
                    # self.create_subscription_item(package, checkout_session)
                    # old code
                    # serializer.save(camera=camera)
                    # _status = status.HTTP_201_CREATED
                    # data = serializer.data
                    # camera.is_available=False
                    # camera.organisation_associated = serializer.validated_data.get("organisation")
                    # camera.save()
                    # organisation = serializer.validated_data.get("organisation")
                    # organisation.camera.add(camera.id)
                    # old code ends here
                return Response(
                    {"data": checkout_session, "status": _status, "error": serializer.errors},
                    status=_status,
                )
        else:
            return Response({
                "data": "Please provide available AIR ID"
            }, status = status.HTTP_400_BAD_REQUEST)

    # def create_second(self, request, *args, **kwargs):
    #     from payment.stripe_payment import CheckOutSession
    #     air_id = request.data.get('air_id')
    #     check_valid = self.is_valid_camera(request, air_id=air_id)
    #     if check_valid:
    #         camera = AirCamera.objects.get(air_id=air_id)
    #         serializer = self.serializer_class(
    #             data=request.data, context={"request": request}
    #         )
    #         _status = status.HTTP_400_BAD_REQUEST
    #         checkout_session = []
    #         if serializer.is_valid():
    #             package = Package.objects.filter(package_type=PACKAGE_TYPES[1][0]).first()
    #             user_information = UserInformation.objects.get(user=request.user)
    #             checkout_session = CheckOutSession.create(
    #                 line_items=[
    #                     {
    #                     "price": package.stripe_price_id,
    #                     "quantity": 1
    #                     },
    #                 ],
    #                 mode = 'subscription',
    #                 customer=user_information.stripe_customer_id,
    #                 success_url="https://example.com/success",
    #                 cancel_url="https://example.com/cancel",
    #             )
    #             print(checkout_session)
    #             serializer.save(camera=camera)
    #             _status = status.HTTP_201_CREATED
    #         return Response(
    #             {"data": checkout_session, "status": _status, "error": serializer.errors},
    #             status=_status,
    #         )
    #     else:
    #         return Response({
    #             "data": "Some Error Occured"
    #         })

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = serializers.OnboardAirCameraSerializer(instance)
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
        serializer = self.serializer_class(
            instance, data=data, context={"request": request} , partial=True
        )
        _status = status.HTTP_400_BAD_REQUEST
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            _status = status.HTTP_200_OK
        return Response(
            {"data": data, "status": _status, "error": serializer.errors},
            status=_status,
        )


class AirInstanceViewSet(api.APIModelViewSet):
    write_serializer_class = serializers.AirInstanceSerializer
    read_serializer_class = serializers.AirInstanceReadSerializer
    update_serializer_class = serializers.AirInstanceUpdateSerializer
    queryset = models.AirInstance.objects.all()
    model = models.AirInstance
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.write_serializer_class(
            data=request.data, context={"request": request}
        )
        _status = status.HTTP_400_BAD_REQUEST
        data = []
        if serializer.is_valid():
            serializer.save()
            _status = status.HTTP_201_CREATED
            data = serializer.data
        return Response(
            {"data": data, "status": _status, "error": serializer.errors},
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
        serializer = self.update_serializer_class(
            instance, data=data, context={"request": request}
        )
        _status = status.HTTP_400_BAD_REQUEST
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            _status = status.HTTP_201_CREATED
        return Response(
            {"data": data, "status": _status, "error": serializer.errors},
            status=_status,
        )


class GearAssignedViewSet(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    @classmethod
    def get_organisation_owned_data(self, camera):
        org_own_cam = OrganisationOwnedCamera.objects.filter(camera=camera).first()
        data = serializers.OrganisationOwnedCameraSerializer(org_own_cam).data
        return data

    def get(self, request, project_id):
        try:
            # project_id = self.kwargs["project_id"]
            query = self.request.query_params.get("query")
            project = Project.objects.get(id=project_id)

            if query:
                condition = Q(
                    Q(camera__owner_name=query)
                    | Q(camera__nick_name=query)
                    | Q(camera__air_id=query)
                )
                cameras = project.assigned_cameras.filter(condition).all()
                condition = Q(
                    Q(instance__owner_name=query)
                    | Q(instance__nick_name=query)
                    | Q(instance__air_id=query)
                )
                instances = project.assigned_instances.filter(condition).all()
            else:
                cameras = project.assigned_cameras.all()
                instances = project.assigned_instances.all()

            cameras = [
                {
                    "id": obj.camera.id,
                    "owner_name": obj.camera.owner_name,
                    "nick_name": obj.camera.nick_name,
                    "lan_ip": obj.camera.lan_ip,
                    "public_ip": obj.camera.public_ip,
                    "air_id": obj.camera.air_id,
                    "internal_record_format": obj.camera.internal_record_format,
                    "status": obj.camera.status,
                    "external_stream_format": obj.camera.external_stream_format,
                    "organisation_owned_camera": self.get_organisation_owned_data(obj.camera)
                }
                for obj in cameras
            ]

            instances = [
                {
                    "id": obj.instance.id,
                    "owner_name": obj.instance.owner_name,
                    "instance_type": obj.instance.instance_type,
                    "vmix_licence_number": obj.instance.vmix_licence_number,
                    "instance_regioin": obj.instance.instance_regioin,
                    "instance_size": obj.instance.instance_size,
                    "nick_name": obj.instance.nick_name,
                    "lan_ip": obj.instance.lan_ip,
                    "public_ip": obj.instance.public_ip,
                    "air_id": obj.instance.air_id,
                    "status": obj.instance.status,
                    "order": obj.order,
                    "user": {
                        "id": obj.instance_operators.id,
                        "name": obj.instance_operators.userinformation.first_name
                        + " "
                        + obj.instance_operators.userinformation.last_name,
                        "profile_image": obj.instance_operators.userinformation.profile_image.url
                        if obj.instance_operators.userinformation.profile_image
                        else None,
                    }
                    if obj.instance_operators
                    else None,
                }
                for obj in instances
            ]

            data = {"cameras": cameras, "instances": instances}

            _status = status.HTTP_200_OK
            return Response({"data": data, "status": _status}, status=_status)
        except Exception as e:
            _status = status.HTTP_400_BAD_REQUEST
            return Response(
                {"data": {}, "status": _status, "error": str(e)},
                status=_status,
            )

    def post(self, request, project_id):
        # try:
            # project = Project.objects.get(id=project_id)
            request_data = request.data
            action_type = request_data.get("action_type")

            if action_type == "add-camera":
                data = {
                    "project_id": project_id,
                    "camera_id": request_data["camera_id"],
                }
                print(data)
                assigned_camera = (
                    models.AirCameraAssignedToProject.objects.get_or_create(**data)
                )
                print(assigned_camera)
                users = request_data.get("users", [])
                for user in users:
                    assigned_camera.camera_operators.add(user)

                assigned_camera[0].save()
            elif action_type == "add-instance":
                data = {
                    "project_id": project_id,
                    "instance_id": request_data["instance_id"],
                }
                assigned_instance = (
                    models.AirInstanceAssignedToProject.objects.get_or_create(**data)
                )
                users = request_data.get("users", [])
                for user in users:
                    assigned_instance.camera_operators.add(user)
                assigned_instance[0].save()
            elif action_type == "delete-camera":
                models.AirCameraAssignedToProject.objects.filter(
                    project_id=project_id, camera_id=request_data["camera_id"]
                ).delete()
            elif action_type == "delete-instance":
                models.AirInstanceAssignedToProject.objects.filter(
                    project_id=project_id, instance_id=request_data["instance_id"]
                ).delete()
                #-----------------remove-instance-operator--------------
            elif action_type == "remove-instance-operator":
                order = int(request_data["order"])
                air_instance_id=request_data.get("air_instance_id", None)
                instance_operator_id = request_data.get("instance_operator_id",None)
                data = {
                    "project_id":project_id,
                    "order":order,
                    "air_instance_id":air_instance_id,
                    "instance_operator_id":instance_operator_id
                        }
                if instance_operator_id:
                    air_instance =models.AirInstanceAssignedToProject.objects.filter(
                        project_id=project_id, instance_operators_id = instance_operator_id,
                    ).update(instance_operators= None)
                    print(air_instance) 
                    if air_instance == 0:
                        _status = status.HTTP_200_OK
                        return Response(
                    {"data": data, "status": _status, "error": "operator not found"},
                    status=_status,
                )
                _status = status.HTTP_200_OK

                return Response(
                    {"data": data, "status": _status, "error": []},
                    status=_status,
                )
                #-----------------end-remove-instance-operator--------------
            elif action_type == "assign-instance-to-nav":
                order = int(request_data["order"])
                air_instance_id = request_data.get("air_instance_id", None)
                instance_operator_id = request_data.get("instance_operator_id", None)

                # models.AirInstanceAssignedToProject.objects.filter(project_id=project_id,
                #                                                    order=order).update(order=0)

                if instance_operator_id:
                    models.AirInstanceAssignedToProject.objects.filter(
                        project_id=project_id,
                        instance_operators_id=instance_operator_id,
                    ).update(instance_operators=None)
                    air_instance = models.AirInstanceAssignedToProject.objects.filter(
                        instance_id=air_instance_id, project_id=project_id
                    )
                    instance = air_instance.first()
                    instance.instance_operators_id = int(instance_operator_id)
                    instance.save()
                    # a=serializers.AirInstanceAssignedToProjectSerializer(instance).data
                else:
                    models.AirInstanceAssignedToProject.objects.filter(
                        project_id=project_id, order=order
                    ).update(order=0)
                    air_instance = models.AirInstanceAssignedToProject.objects.filter(
                        instance_id=air_instance_id, project_id=project_id
                    )
                    instance = air_instance.first()
                    instance.instance_operators = None
                    instance.order = order
                    instance.save()
                    # a=serializers.AirInstanceAssignedToProjectSerializer(instance).data
            _status = status.HTTP_200_OK

            return Response(
                {"data": {}, "status": _status, "error": []},
                status=_status,
            )
        # except Exception as ex:
        #     _status = status.HTTP_400_BAD_REQUEST
            # return Response(
            #     {"data": {}, "status": _status, "error": str(ex)},
            #     status=_status,
            # )


class GearListViewSet(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            # project_id = self.kwargs["project_id"]
            query = self.request.query_params.get("query")

            if query:
                condition = Q(
                    Q(owner_name=query) | Q(nick_name=query) | Q(air_id=query)
                )
                cameras = models.AirCamera.objects.filter(condition)
                instances = models.AirInstance.objects.filter(condition)
            else:
                cameras = models.AirCamera.objects.all()
                instances = models.AirInstance.objects.all()

            cameras = [
                {
                    "id": camera.id,
                    "owner_name": camera.owner_name,
                    "nick_name": camera.nick_name,
                    "lan_ip": camera.lan_ip,
                    "public_ip": camera.public_ip,
                    "air_id": camera.air_id,
                    "internal_record_format": camera.internal_record_format,
                    "status": camera.status,
                    "external_stream_format": camera.external_stream_format,
                }
                for camera in cameras
            ]

            instances = [
                {
                    "id": instance.id,
                    "owner_name": instance.owner_name,
                    "instance_type": instance.instance_type,
                    "instance_size": instance.instance_size,
                    "nick_name": instance.nick_name,
                    "lan_ip": instance.lan_ip,
                    "public_ip": instance.public_ip,
                    "air_id": instance.air_id,
                    "status": instance.status,
                }
                for instance in instances
            ]

            data = {"cameras": cameras, "instances": instances}

            _status = status.HTTP_200_OK
            return Response({"data": data, "status": _status}, status=_status)
        except Exception as e:
            _status = status.HTTP_400_BAD_REQUEST
            return Response(
                {"data": {}, "status": _status, "error": str(e)},
                status=_status,
            )


class UpdateCameraStatusView(APIView):
    permission_classes = (permissions.ThirdPartyPermission,)

    def post(self, request, *args, **kwargs):
        try:
            cam_status = request.data.get("status")
            air_id = kwargs.get('air_id', "")
            if not AirCamera.objects.filter(air_id=air_id).exists():
                return Response({"message": "AIR Id not registered"}, status=status.HTTP_400_BAD_REQUEST)
            timezone = pytz.timezone(settings.TIME_ZONE)
            AirCamera.objects.filter(air_id=air_id).update(last_activity=datetime.now(timezone), camera_field_status=cam_status)
            return Response({"statue": cam_status, "message": "Updated"}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "Some Error Occured"}, status=status.HTTP_400_BAD_REQUEST)


class GetCameraStatusView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        try:
            import datetime
            result = {}
            air_ids = kwargs.get('air_ids', "")
            air_ids_arr = air_ids.split(",")
            timezone = pytz.timezone(settings.TIME_ZONE)
            time_with_delta = datetime.datetime.now(timezone) - datetime.timedelta(minutes = 5)
            for air_id in air_ids_arr:
                camera = AirCamera.objects.values("last_activity", "camera_field_status").get(air_id=air_id)
                result[air_id] = {
                        "last_activity": camera['last_activity'],
                        "status": camera['camera_field_status'] if camera['last_activity'] > time_with_delta else 0
                    }
            return Response({"result": result}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "Some Error Occured"}, status=status.HTTP_400_BAD_REQUEST)