from django.apps import AppConfig
import zoneinfo


class TwitterConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'twitter'

    def ready(self):
        print('Starting scheduler')
        from scheduler import executer
        executer.print_success()
