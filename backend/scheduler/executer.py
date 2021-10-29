from apscheduler.schedulers.background import BackgroundScheduler
from twitter.views import GetAllTweets


def print_success():
    scheduler = BackgroundScheduler()
    tweets = GetAllTweets()
    scheduler.add_job(tweets.get_queryset, "interval", seconds=10, id='1', replace_existing=True)
