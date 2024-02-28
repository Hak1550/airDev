from django.apps import AppConfig


class PaymentConfig(AppConfig):
    name = 'payment'

    def ready(self) -> None:
        try:
            print("Importing Signals")
            from generic.signals import Signals
        except:
            print("Error occured in importing signals")

