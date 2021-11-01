import requests

from linkedinauth import auth, headers

credentials = 'credentials.json'
access_token = auth(credentials) # Authenticate the API
headers = headers(access_token) # Make the headers to attach to the API call.


def user_info(headers):
    '''
    Get user information from Linkedin
    '''
    response = requests.get('https://api.linkedin.com/v2/me', headers=headers)
    user_info = response.json()
    return user_info


# Get user id to make a UGC post
user_info = user_info(headers)
urn = user_info['id']

# UGC will replace shares over time.
api_url = 'https://api.linkedin.com/v2/ugcPosts'
author = f'urn:li:person:{urn}'

message = 'Just coded my first automated post to LinkedIn with Python using LinkedIn API. Taking the opportunity to advertize my company ;-)'
link = 'https://www.apzuerich.ch/'

post_data = {
    "author": author,
    "lifecycleState": "PUBLISHED",
    "specificContent": {
        "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
                "text": message
            },
            "shareMediaCategory": "ARTICLE",
                "media": [
                    {
                        "status": "READY",

                        "originalUrl": link,

                    }
                ]
        }
    },
    "visibility": {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
}


if __name__ == '__main__':
    r = requests.post(api_url, headers=headers, json=post_data)
    r.json()