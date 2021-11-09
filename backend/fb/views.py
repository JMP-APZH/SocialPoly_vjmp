import os
from facebook import GraphAPI
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from fb.models import FacebookPost
from fb.serializers import FacebookSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from apscheduler.schedulers.background import BackgroundScheduler


User = get_user_model()
app_id = client_id = os.environ.get('FACEBOOK_APP_ID')
app_secret = client_secret = os.environ.get('FACEBOOK_APP_SECRET')
redirect_uri = os.environ.get('FACEBOOK_REDIRECT_URI')
redirect_uri_encoded = os.environ.get('FACEBOOK_REDIRECT_URI_ENCODED')
code = 'AQChfeVu--0t0YeG8I9cv9WhEvGporOzaXknTDgT52z0QzqS_cp0dvaKbkm_NGp4RhTvdNP67UXqb3TUvwERe_znEy9F-jcY0LDoFnZXLMObkiF4yfdLJ-FdsW2s49_QfOZmnUZc9ZJdKfyn9oRcac8gqqn6STTXsIai6q530ol2GTH7Epirj5r8hCjoT1DPMo0YUX_04PKlPOPgQjlDXS_3xRwXbBVWMad8iSOsUPUz6vwtRfuA8JOjk4STY2yx60lSwDr7ULEHb-_Qev433LDp2JGftVgwrfVqPjGXGW4GpuGe4PljWkvZl1I0jYoudEvbD1neFiO_qDaWhuKXPiFkNxYiNDUMSbA97qeuoEw8WZj__2bjapqnc9KNmumK9QQ'
state = 987654321


class SendPost(GenericAPIView):
    serializer_class = FacebookSerializer
    queryset = FacebookPost.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=self.request.user)

        access_token = 'EAAMENll1rP8BAGcZAKTaO42ZCQB8NZCeTZAnM9E6sEsXZBWHe5hStJtoXj17EZB9H03ZB8EzabLrJZBQCFy9Y4TuMfypebPAUiIr1dtYZABuyO9voi4LF7b7WUwWm8RjIbWR0mKuUsvGgWbxdUl9pXFQarolTuYda880yRFi6oT4yLYZCdFYAHfMAr2mzDddXNhZB3M8DrEz6RweCXW4gUoX60T'
        graph = GraphAPI(access_token)
        post = request.data['content']
        page_owner = "me"
        appears_on = "feed"

        if 'send_time' in request.data.keys():
            trigger = request.data['send_time']
            scheduler = BackgroundScheduler()
            def job(page_id, page_type, content):
                graph.put_object(page_id, page_type, message=content)

            scheduler.add_job(job, 'date', run_date=trigger, id=post, args=[page_owner, appears_on, post],
                              replace_existing=True)
            scheduler.start()
            return Response({'page Id: ': "success"})
        else:
            graph.put_object(page_owner, appears_on, message=post)
            return Response({'page Id: ': "success"})

class Auth(APIView):

    def get(self, request):
        # perms = ["manage_pages", "publish_pages"]
        access_token = 'EAAMENll1rP8BAJkr4VNHZBYYsWg1qNjmB1IGPZCZCwpAx5Al9jSXtmKZCCYoCtv09SXY6ioCY24xyzy4e5erYl1CAqQ3go97ErHSC0lV6CvjPWCXNIOvMQefgBvQ1MhXHDCTL1N571ctbmalAnpqdp0lsyCi7D9WhfXOvO1Egv7pP6xt7UwUNJMlHlQHnYmZB0Wgw3umFZAk8VjzmlQmSKZBCizr6yTchPbJHP1bmk8U1av39UQ3wnRcId5kbUDZBLEZD'
        graph = GraphAPI(access_token=access_token)
        fb_login_url = graph.get_auth_url(app_id, redirect_uri)
        # received_acces_token = graph.get_access_token_from_code(code, redirect_uri, app_id, app_secret)
        # facebook_code_url = f"https://www.facebook.com/v6.0/dialog/oauth?client_id={app_id}&redirect_uri={redirect_uri_encoded}&state={state}"
        return Response({'auth url: ': fb_login_url})


class GetToken(APIView):
    def get(self, request):
        facebook_token_url = f"https://www.graph.facebook.com/v6.0/oauth/access_token?redirect_uri={redirect_uri_encoded}&client_id={client_id}&client_secret={client_secret}&code=AQDcK3PfJKYEetM6Lhasdc94OejQ49ArzqRlAd6kxlaGIqBQ3dn_GZV8MsftUmKO_1ZjHUzwQdMQjInh11oGqIIBnLxxLDoeYfYgmXNBer51rALgj6o_r1jGP0wr0z3fbedVzNKiIg08jE7bW-jBoFMXqStkM9z4XlOiHuYLkAZIMLfDo4vqVGqUxa_vWEompDsyotOV0O8aP269HaFaa0lnY2gtNVD8lsyt47xn-3MxeOLwbVmfbBIUELi0N7WzOzPrZdo-jnYAVJEj-NUNj62vH7GVgT8k7Ib8gyJBTb_bAeybC2XPS9WWokp4mX-z-f7HSPG7-7itS_dqRylFWquajJSBlHdfbNvG-mFLNcxSVEL3Uzk01LAoUPaqlVFww4c"
        return Response({'token url: ': facebook_token_url})


class GetLastPosts(APIView):
    def get(self, request):
        access_token = 'EAAMENll1rP8BAOxFKnsD2UJO4wMIFy1yYQu7MZBZBp16DmvWijHlKH5MBoTVss15LwCZALsGDXxBCtlipQGbxP0venthmByvo1ZBY86zhXQbBWCuUXrU0BHpkOfcffZCST2nMuZBKBbMJUrFBtffbLlx6vFFHy5x6i9xpZCbjZAml8DrwoqZB5sI5VBvfsp3VHhda1C36RAFff2k86ZA4h41g9'
        graph = GraphAPI(access_token)
        feed = graph.get_objects(112589361217762)
        return Response({'users feed': feed})
