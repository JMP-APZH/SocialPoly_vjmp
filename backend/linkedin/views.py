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

"""
class LinkedinPost(APIView):
            
    def post(self, request, *args, **kwargs):

        user = User.objects.get(id=request.user.id)
    
        try:
            client_id = os.environ.get('LINKEDIN_CLIENT_ID')
            client_secret = os.environ.get('LINKEDIN_CLIENT_SECRET')
            redirect_uri = os.environ.get('LINKEDIN_REDIRECT_URI')
            linkedin_user_info = user_info(linkedin_headers,linkedin_me_url)
            linkedin_token = refresh_token(request.data['linked_in_auth_code'], client_id, client_secret, redirect_uri, access_token_url)
            
            urn = linkedin_user_info['id']
            
            ugc_post_url = os.environ.get('LINKEDIN_UGC_POST_URL')
            linkedin_author = f'urn:li:person:{urn}'
            
            #linkedin_post_message = # comes from the FrontEnd
            #linkedin_post_link = idem
            #linkedin_post_image = idem
            
            post_data = {
                "author": linkedin_author,
                "lifecycleState": "PUBLISHED",
                "specificContent": {
                    "com.linkedin.ugc.ShareContent": {
                        "shareCommentary": {
                            "text": linkedin_post_message
                        },
                        "shareMediaCategory": "ARTICLE",
                            "media": [
                                {
                                    "status": "READY",
            
                                    "originalUrl": linkedin_post_link,
            
                                }
                            ]
                    }
                },
                "visibility": {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
                }
            }

            
            
            access_token_url = os.environ.get('LINKEDIN_ACCESS_TOKEN_URL')            
            serializer = UserSerializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(post_id=linkedin_post_id, headers=headers, json=post_data, **serializer.validated_data)
            return Response(serializer.validated_data)
        except Exception as e:
            print(e)
            return Response({"error":"something went wrong"})
"""