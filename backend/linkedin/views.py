"""
step 1
LinkedInuserAuth ==> ok


step 2
catch the authorization verifier code from the callback url ==> being done on the FrontEnd

step 3
get the access token stored in the user DB ==> ok
"""
import os

from rest_framework.response import Response
from rest_framework.views import APIView
from .linkedin_helpers import *


class LinkedinAuth(APIView):

    def post(self, request):

        client_id = os.environ.get('LINKEDIN_CLIENT_ID')
        api_url = os.environ.get('LINKEDIN_API_URL')
        redirect_uri = os.environ.get('LINKEDIN_REDIRECT_URI')

        try:
            response = authorize(api_url, client_id, redirect_uri)
            return Response({"url": response})
        except Exception as e:
            print(e)
            return Response({"error":str(e)})
