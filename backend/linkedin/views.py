"""
step 1
LinkedInuserAuth ==> ok


step 2
Paste the code from the redirect url

step 3
get the access token
"""
from rest_framework.response import Response
from rest_framework.views import APIView
from .linkedinauth_clean import *


class LinkedinAuth(APIView):

    def post(self, request):
        client_id = "775sxoz9x8xng1"
        client_secret = "xrcoFu0nElRY58uQ"
        api_url = 'https://www.linkedin.com/oauth/v2'
        redirect_uri = "https://djpp.propulsion-learn.ch/accounts/linkedin/connect/"

        try:
            response = authorize(api_url, client_id, redirect_uri)
            return Response({"url": response})
        except:
            return Response({"message":"shitcode overload. Program is shutting down."})
