from django.apps import AppConfig
from apscheduler.schedulers.background import BackgroundScheduler

import zoneinfo


class TwitterConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'twitter'
