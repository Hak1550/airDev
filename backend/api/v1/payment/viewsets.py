from urllib import request
from api.v1.payment.serializers import AddSubscriptionItemSerializer, ChangeDefaultPaymentMethodSerializer, InvoiceSerializer, PackageSerializer, PaymentIntentSerializer, PaymentMethodSerializer, PaymentMethodUpdateSerializer, PaymentSessionSerializer, PurchaseSubcriptionSerializer, UpdateSubscriptionItemSerializer
from generic.common import InvoiceModel
from gear.models import AirInstanceActivityTracker, AirInstanceHoursTracker, OrganisationOwnedCamera, AirInstanceBillingTracker
from users.models import UserInformation, User
from organisation.models import Organisation
from payment.models import INVOICE_STATUS_TYPES, Invoice, Package, PurchaseSubscription
from rest_framework import status, viewsets, permissions
from rest_framework import generics
from django.db import transaction
from rest_framework.response import Response
from payment.stripe_payment import CheckOutSession, PaymentIntent, PaymentMethod, Product, Subscription, Customer, EphemeralKey, SubscriptionItem
import environ
import stripe
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

env = environ.Env()

class PackageViewSet(viewsets.ModelViewSet):
    model = Package
    serializer_class = PackageSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Package.objects.all()

class InvoiceViewSet(viewsets.ModelViewSet):
    model = Invoice
    serializer_class = InvoiceSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    http_method_names = ["get"]

    def get_queryset(self, *args, **kwargs):
        organisation = Organisation.objects.get(owner=self.request.user)
        return self.model.objects.filter(organisation=organisation)

class PaymentIntentView(generics.GenericAPIView):
    # authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PaymentIntentSerializer

    def create_payment_intent_sheet(cls, cus_id, amount, stripe_product_id):
        ephemeralKey = EphemeralKey.create(
            customer=cus_id,
            stripe_version=env.str("STRIPE_VERSION", '2022-08-01'),
        )
        paymentIntent = PaymentIntent.create(
            amount=amount,
            currency=env.str("STRIPE_CURRENCY", 'usd'),
            customer=cus_id,
            payment_method_types=["card"],
            metadata= {
                "stripe_product_id": stripe_product_id
            }
        )

        return {
            "paymentIntent": paymentIntent.client_secret,
            "ephemeralKey": ephemeralKey.secret,
            "customer": cus_id,
            "stripe_product_id": stripe_product_id
        }

    def post(self, request, *args, **kwargs):
        try:
            user = request.user
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                print(serializer.validated_data)
                user_information = UserInformation.objects.get(user=request.user)
                if not user_information.stripe_customer_id:
                    customer = Customer.create(email=user.email)
                    stripe_cus_id = customer['id']
                    user_information.stripe_customer_id = stripe_cus_id
                    user_information.save()
                else:
                    stripe_cus_id = user_information.stripe_customer_id
                amount = serializer.validated_data.get('amount', 100)
                stripe_product_id = serializer.validated_data.get('stripe_product_id', None)
                response = self.create_payment_intent_sheet(stripe_cus_id, amount, stripe_product_id)
                return Response(response, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_200_OK)
        except Exception as e:
                return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PurchaseSubscriptionAPIView(generics.GenericAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = PurchaseSubcriptionSerializer
    
    def create_card_source(self, validated_data, token):
        user_information = UserInformation.objects.get(
            user=self.request.user
        )
        payment_method = PaymentMethod.attach(
            token,
            user_information.stripe_customer_id,
        )
        Customer.modify(user_information.stripe_customer_id, {"default_payment_method": payment_method.id})
        return payment_method['id'], user_information

    def create_subscription(self, request, validated_data, purchase_sub_obj):
        stripe_price_id = validated_data['package'].stripe_price_id
        user_information = UserInformation.objects.get(
            user=self.request.user
        )
        # payment_method_id, user_information = self.create_card_source(validated_data, request.data['token'])
        payment_method_id = request.data['token']
        stripe_subcription_obj = Subscription.create(
            customer=user_information.stripe_customer_id,
            items=[
                {"price": stripe_price_id},
            ],
        )
        self.update_subscription(purchase_sub_obj, stripe_subcription_obj, payment_method_id)
        return stripe_subcription_obj

    def update_subscription(self, purchase_sub_obj, stripe_subcription_obj, payment_method_id):
        
        PurchaseSubscription.objects.filter(id=purchase_sub_obj.id).update(
            stripe_subscription_id=stripe_subcription_obj['id'], is_active=True,
            status=stripe_subcription_obj['status'], payment_card_id=payment_method_id, invoice_id=stripe_subcription_obj['latest_invoice']
        )

    def existing_subscription(self, request, validated_data):
        purchase_subscription_object = PurchaseSubscription.objects.filter(package=validated_data['package'], user=request.user, is_active=True, is_paid=True)
        return True if purchase_subscription_object else False

    def inactive_other_subscriptions(self, request):
        PurchaseSubscription.objects.filter(user=request.user).update(is_active=False)

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'user': request.user}
        )
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    validated_data = serializer.validated_data
                    existing_subscription = self.existing_subscription(request, validated_data)
                    if not existing_subscription:
                        self.inactive_other_subscriptions(request)
                        purchase_sub_obj = serializer.save(user=request.user)
                        stripe_subcription_obj = self.create_subscription(request, validated_data, purchase_sub_obj)
                        return Response({'success': True, 'message': 'Subscription created successfully', 'data':stripe_subcription_obj}, status=status.HTTP_201_CREATED)
                    return Response({'success': False, 'message': "Already Subscribed"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'success': False, 'message': str(e)},
                                status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangeDefaultPaymentMethodView(generics.GenericAPIView):
    serializer_class = ChangeDefaultPaymentMethodSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'user': request.user}
        )
        if serializer.is_valid():
            if request.user.id:
                user_information = UserInformation.objects.get(user=request.user)
                Customer.modify(user_information.stripe_customer_id, {"default_payment_method": serializer.validated_data['payment_method_id']})
                return Response({'success': True, 'message': "Done"}, status=status.HTTP_202_ACCEPTED)
            return Response({'success': False, 'message': "Please Provide User"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentMethodView(generics.GenericAPIView):
    serializer_class = PaymentMethodSerializer
    update_serializer_class = PaymentMethodUpdateSerializer

    def patch(self, request, id=None):
        serializer = self.update_serializer_class(
            data=request.data, context={'user': request.user}
        )
        id = request.data.get("id", None)
        if serializer.is_valid() and id:
            try: 
                user = request.user
                user_information = UserInformation.objects.get(user=user)
                payment_method = PaymentMethod.modify(
                        id,
                        card={
                            "exp_month": serializer.validated_data['exp_month'],
                            "exp_year": serializer.validated_data['exp_year']
                        },
                        billing_details= {
                            "email": serializer.validated_data['email'],
                            "name": serializer.validated_data['name'],
                            "address": serializer.validated_data['address']
                        }
                    )
                if serializer.validated_data.get('default', None):
                    # setting payment method defualt for customer
                    Customer.modify(user_information.stripe_customer_id, {"default_payment_method": payment_method.id})
                customer = Customer.retrieve(user_information.stripe_customer_id)
                return Response({'success': True, "payment_method": payment_method, "customer": customer}, status=status.HTTP_200_OK)
            except:
                return Response({'success': False, 'message': "Something Error Happened"}, status=status.HTTP_400_BAD_REQUEST)                
        return Response({'success': False, 'message': "Something Went Wrong", "error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        try:
            user_information = UserInformation.objects.get(user=request.user)
            stripe_customer_id = user_information.stripe_customer_id
            if stripe_customer_id:
                customer = Customer.retrieve(stripe_customer_id)
                payment_methods = Customer.list_payment_methods(stripe_customer_id, "card")
                return Response({"success": True, "payment_methods": payment_methods, "customer": customer}, status=status.HTTP_202_ACCEPTED)
        except:
            return Response({'success': False, 'message': "Something Went Wrong"}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request, *args, **kwargs):
        
        serializer = self.serializer_class(
            data=request.data, context={'user': request.user}
        )
        if serializer.is_valid():
            user = request.user
            try:
                user_information = UserInformation.objects.get(user=user)
                stripe_customer_id = user_information.stripe_customer_id
                # creating payment method
                payment_method = PaymentMethod.create(
                    type="card",
                    card={
                        "number": serializer.validated_data['number'],
                        "exp_month": serializer.validated_data['exp_month'],
                        "exp_year": serializer.validated_data['exp_year'],
                        "cvc": serializer.validated_data['cvc']
                    },
                    billing_details= {
                        "email": serializer.validated_data['email'],
                        "name": serializer.validated_data['name'],
                        "address": serializer.validated_data['address']
                    }
                )
                if not user_information.stripe_customer_id:
                    name = user_information.first_name + " " + user_information.last_name
                    customer = Customer.create(email=user.email, name=name, address=serializer.validated_data['address'], shipping=serializer.validated_data['address'])
                    stripe_customer_id = customer['id']
                    user_information.stripe_customer_id = stripe_customer_id
                    user_information.save()

                # attaching payment method to a customer
                payment_method_updated = PaymentMethod.attach(
                    payment_method['id'],
                    stripe_customer_id,
                )
                if serializer.validated_data['default']:
                    # setting payment method defualt for customer
                    Customer.modify(user_information.stripe_customer_id, {"default_payment_method": payment_method_updated.id})
                customer = Customer.retrieve(stripe_customer_id)
            except:
                return Response({'success': False, 'message': "Something Went Wrong"}, status=status.HTTP_400_BAD_REQUEST)    
            return Response({'success': True, 'stripe_pm_id': payment_method_updated['id'], "payment_method": payment_method_updated, "customer": customer}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AddNewSubscriptionItemView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AddSubscriptionItemSerializer

    def _create_subscription_item(self, subscription_item, stripe_price_id):
        package = Package.objects.get(stripe_price_id=stripe_price_id)
        PurchaseSubscription(
                user=self.request.user, 
                package=package,
                stripe_subscription_id=subscription_item['subscription'],
                stripe_subscription_item_id=subscription_item['id'],
                quantity = subscription_item['quantity'],
                status="active"
                ).save()

    def create_subscription_item(self, subscription_id, stripe_price_id):
        subscription_item = SubscriptionItem.create(subscription=subscription_id, 
            price=stripe_price_id,
            quantity=1
        )
        self._create_subscription_item(subscription_item, stripe_price_id)
        return subscription_item

    def post(self, request, *args, **kwargs):
        try:
            _status = status.HTTP_400_BAD_REQUEST
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                _status = status.HTTP_200_OK
                subscription_id = serializer.validated_data.get('subscription_id', None)
                stripe_price_id = serializer.validated_data.get('stripe_price_id', None)
                self.create_subscription_item(subscription_id, stripe_price_id)
                updated_subscription = Subscription.retrieve(subscription_id)
                return Response(updated_subscription, status=_status)
            return Response(serializer.errors, status=_status)
        except Exception as e:
                return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UpdateSubscriptionItemView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UpdateSubscriptionItemSerializer
    
    def update_subscription_item(self, subscription_item):
        updated_subscription_item = SubscriptionItem.modify(subscription_item.id, quantity = subscription_item.quantity + 1)
        return updated_subscription_item

    def post(self, request, *args, **kwargs):
        try:
            _status = status.HTTP_400_BAD_REQUEST
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                _status = status.HTTP_200_OK
                subscription_item_id = serializer.validated_data.get('subscription_item_id', None)
                current_subscription_item = SubscriptionItem.retrieve(subscription_item_id)
                updated_list_items = self.update_subscription_item(current_subscription_item)
                return Response(updated_list_items, status=_status)
            return Response(serializer.errors, status=_status)
        except Exception as e:
                return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class PaymentSessionView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PaymentSessionSerializer

    def create_subscription_item(self, package, checkout_session):
        PurchaseSubscription(
                    user=self.request.user, 
                    package=package,
                    payment_session_id=checkout_session.id,
                    status="In Progress"
                    ).save()

    def existing_subscription(self, package):
        purchase_subscription_object = PurchaseSubscription.objects.filter(package=package, user=self.request.user, is_active=True, is_paid=True)
        return True if purchase_subscription_object else False

    def create_payment_session(cls, cus_id, stripe_price_id, mode, quantity):
        package = Package.objects.get(stripe_price_id=stripe_price_id)
        exist = cls.existing_subscription(package)
        if not exist:
            checkout_session = CheckOutSession.create(
                line_items=[
                    {
                    "price": stripe_price_id,
                    "quantity": quantity
                    },
                ],
                mode = mode,
                customer = cus_id,
                success_url = settings.APP_BASE_URL + "settings/assets?payment_status=success",
                cancel_url = settings.APP_BASE_URL + "settings/assets?payment_status=cancel",
            )
            cls.create_subscription_item(package, checkout_session)
            return checkout_session
        return {"error": "Already Subscribed to this package"}

    def post(self, request, *args, **kwargs):
        try:
            _status = status.HTTP_400_BAD_REQUEST
            user = request.user
            print(user)
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                _status = status.HTTP_200_OK
                user_information = UserInformation.objects.get(user=request.user)
                if not user_information.stripe_customer_id:
                    customer = Customer.create(email=user.email)
                    stripe_cus_id = customer['id']
                    user_information.stripe_customer_id = stripe_cus_id
                    user_information.save()
                else:
                    stripe_cus_id = user_information.stripe_customer_id
                stripe_price_id = serializer.validated_data.get('stripe_price_id', None)
                product = Package.objects.get(stripe_price_id=stripe_price_id)
                if not serializer.validated_data.get('mode', None):
                    if product.type == 1:
                        mode = 'subscription'
                else:
                    mode = serializer.validated_data.get('mode', 'payment')
                quantity = serializer.validated_data.get('quantity', 1)
                checkout_session = self.create_payment_session(stripe_cus_id, stripe_price_id, mode, quantity)
                if checkout_session.get("error", None):
                    _status = status.HTTP_400_BAD_REQUEST
                return Response(checkout_session, status=_status)
            return Response(serializer.errors, status=_status)
        except Exception as e:
                return Response({'success': False, 'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)



# class WebhookConnectView(views.APIView):

#     @csrf_exempt
#     def post(self, request):
#         payload = request.body

#         # Verify the events with stripe signature!
#         sig_header = request.headers.get('stripe-signature')
#         try:
#             event = Webhook.construct(
#                 payload=payload,
#                 sig_header=sig_header,
#                 secret=webhook_secret_connect
#             )
#         except ValueError as e:
#             return Response({"failed": str(e)}, status=status.HTTP_400_BAD_REQUEST)
#         except stripe.error.SignatureVerificationError as e:
#             return Response({"failed": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#         # Handle update account event
#         if event["type"] == "account.updated":
#             stripe_account = event["data"]["object"]
#             StripeAccount.update_account(stripe_account)
#         elif event["type"] in PAYOUT_EVENT_TYPES:
#             stripe_payout = event["data"]["object"]
#             Payout.update(stripe_payout, account_id=event["account"])

#         return Response({"success": True}, status=status.HTTP_200_OK)



class WebhookView(generics.GenericAPIView):
    endpoint_secret = settings.STRIPE_SIGNING_SECRET
    from generic.common import InvoiceModel

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        # try:
            from datetime import datetime
            event = None
            payload = request.body
            sig_header = request.headers.get('stripe-signature', '')
            try:
                event = stripe.Webhook.construct_event(
                    payload, sig_header, self.endpoint_secret
                )
            except ValueError as e:
                # Invalid payload
                raise e
            except stripe.error.SignatureVerificationError as e:
                # Invalid signature
                raise e

            # Handle the event
            # if event['type'] == 'payment_intent.succeeded':
            #     payment_intent = event['data']['object']
            #     print(payment_intent)
            # # ... handle other event types
            # elif event['type'] == 'customer.subscription.updated':
            #     subsription = event['data']['object']
            #     print(subsription)
            if event["type"] == "checkout.session.completed":
                object = event['data']['object']
                subscription = Subscription.retrieve(object['subscription'])
                # activate subscription
                purchase_storage = PurchaseSubscription.objects.filter(payment_session_id=object['id']).update(
                    stripe_subscription_id=object['subscription'], is_active=True, is_paid=True,
                    status=object['status'], end_date=datetime.fromtimestamp(subscription['current_period_end']), stripe_pm_id=subscription['default_payment_method'],
                    invoice_id=subscription['latest_invoice'], stripe_subscription_item_id=subscription['items']['data'][0]['id']
                )

                org_own_cam_check = OrganisationOwnedCamera.objects.filter(payment_session_id=object['id']).exists()
                if org_own_cam_check:
                    org_own_cam = OrganisationOwnedCamera.objects.get(payment_session_id=object['id'])    
                    org_own_cam.stripe_subscription_id = object['subscription']
                    org_own_cam.latest_invoice_id = subscription['latest_invoice']
                    org_own_cam.start_date = datetime.fromtimestamp(subscription['current_period_start'])
                    org_own_cam.end_date = datetime.fromtimestamp(subscription['current_period_end'])
                    org_own_cam.is_paid = True
                    org_own_cam.is_active = True
                    org_own_cam.is_expired = False
                    org_own_cam.save()
                    # updating air camera
                    camera = org_own_cam.camera
                    camera.is_available=False
                    camera.organisation_associated = org_own_cam.organisation
                    camera.save()
                    # updating camera n organisation
                    org_own_cam.organisation.camera.add(camera.id)

                # raise_invoice = InvoiceModel.raise_invoice(subscription['latest_invoice'])
            elif event['type'] == "customer.subscription.updated":
                print('subscription updated event', event['data']['object'])
                # Whenever we update the subscription or its items
                subscription = event['data']['object']
                for item in subscription['items']['data']:
                    if subscription['status'] == 'active':
                        PurchaseSubscription.objects.filter(stripe_subscription_id=subscription['id'], stripe_subscription_item_id=item.id).update(
                        is_active=True, is_paid=True,
                        status=subscription['status'], end_date=datetime.fromtimestamp(subscription['current_period_end']), stripe_pm_id=subscription['default_payment_method'],
                        invoice_id=subscription['latest_invoice'], quantity = item['quantity']
                        )
                        # raise_invoice = InvoiceModel.raise_invoice(subscription['latest_invoice'])
                pass
            elif event['type'] == "payment_intent.succeeded":
                # print(event)
                pass
            elif event['type'] == 'invoice.payment_succeeded':
                invoice = event['data']['object']
                # print(invoice)
                if invoice['status'] == 'paid':
                    # check for onboard camera invoice
                    OrganisationOwnedCamera.objects.filter(latest_invoice_id=invoice['id']).update(is_paid=True, is_active=True, is_expired=False)
                    # invoice entry
                    user_information = UserInformation.objects.filter(stripe_customer_id=invoice['customer']).first()
                    if user_information:
                        organisation = Organisation.objects.get(owner=user_information.user)
                        Invoice.objects.create(
                            organisation = organisation,
                            amount=invoice['amount_paid'], 
                            invoice_id=invoice['id'], 
                            invoice_url = invoice['invoice_pdf'],
                            status=INVOICE_STATUS_TYPES[1][0]
                        )

                    # for instance payment updates
                    air_instance_billing = AirInstanceBillingTracker.objects.filter(latest_invoice_id=invoice['id']).first()
                    if air_instance_billing:
                        air_instance_billing.is_paid = True
                        air_instance_billing.status = INVOICE_STATUS_TYPES[1][1]
                        air_instance_billing.save()

                        AirInstanceActivityTracker.objects.filter(instance__id=int(invoice['metadata']['instance']), time__gte=datetime.fromtimestamp(int(invoice['metadata']['week_start'])), time__lte=datetime.fromtimestamp(int(invoice['metadata']['week_end']))).update(calculated=True)
                        AirInstanceHoursTracker.objects.filter(instance__id=int(invoice['metadata']['instance']), time__gte=datetime.fromtimestamp(int(invoice['metadata']['week_start'])), time__lte=datetime.fromtimestamp(int(invoice['metadata']['week_end']))).update(is_paid=True)
                # if invoice['status'] == 'paid' and invoice['subscription']:
                #     PurchaseSubscription.objects.filter(stripe_subcription_id=invoice['subscription']).update(
                #         status=invoice['status'], is_paid=True
                #     )
                #     user_information = UserInformation.objects.get(stripe_customer_id=invoice['customer'])
                #     try:
                #         organisation = Organisation.objects.get(owner=user_information.user)
                #         Invoice(organisation=organisation, invoice=invoice['invoice_pdf'], status=2).save()
                #     except:
                #         pass
                # print(invoice)
            else:
                # print('Unhandled event type {}'.format(event['type']))
                pass

            return Response({True})
        # except:
        #     return Response({False})