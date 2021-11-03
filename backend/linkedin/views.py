"""
step 1
LinkedInuserAuth ==> ok


step 2
catch the authorization verifier code from the callback url ==> being done on the FrontEnd

step 3
get the access token stored in the user DB ==> ok
"""
import os

from django.contrib.auth import get_user_model
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from .linkedin_helpers import *
from .models import LinkedInPost
from .serialzers import LinkedInPostSerializer


User = get_user_model()

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


class LinkedinPost(GenericAPIView):

    queryset = LinkedInPost.objects.all()
    serializer_class = LinkedInPostSerializer


    def post(self, request, *args, **kwargs):

        user = User.objects.get(id=request.user.id)
    
        try:
            linkedin_access_token = user.linked_in_access_token
            linkedin_headers = headers(linkedin_access_token)  # Make the headers to attach to the API call.
            linkedin_me_url = os.environ.get('LINKEDIN_ME_URL')
            linkedin_post_url = os.environ.get('LINKEDIN_UGC_POST_URL')
            linkedin_user_info = user_info(linkedin_headers, linkedin_me_url)
            urn = linkedin_user_info['id']
            linkedin_author = f'urn:li:person:{urn}'  # called author in the linkedin model
            linkedin_post_message = request.data['content']  # comes from the FrontEnd
            linkedin_post_link = request.data['link'] if 'link' in request.data.keys() else ""
            linkedin_post_image = request.data['image'] if 'image' in request.data.keys() else ""
            has_media = linkedin_post_link != "" or linkedin_post_image != ""

            post_data = {
                "author": linkedin_author,
                "lifecycleState": "PUBLISHED",
                "specificContent": {
                    "com.linkedin.ugc.ShareContent": {
                        "shareCommentary": {
                            "text": linkedin_post_message
                        },
                        "shareMediaCategory": "NONE"
                    }
                },
                "visibility": {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
                }
            }

            post_data_with_media = {
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

            post_data_for_request = post_data_with_media if has_media else post_data

            response = requests.post(linkedin_post_url, headers=linkedin_headers, json=post_data_for_request)
            print(response.json())

            # SAVING POST TO THE DATABASE

            serializer = LinkedInPostSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(author=request.user, **serializer.validated_data)

            return Response({"message": "post successful."})

        except Exception as e:
            print(e)
            return Response({"error": str(e)})
