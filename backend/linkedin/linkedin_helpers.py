import random
import requests
import string


def authorize(api_url, client_id, redirect_uri):
    # Request authentication URL
    csrf_token = create_CSRF_token()
    params = {
        'response_type': 'code',
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'state': csrf_token,
        'scope': 'r_liteprofile,r_emailaddress,w_member_social'
    }

    response = requests.get(f'{api_url}/authorization', params=params)
    return response.url


def headers(access_token):
    '''
    Make the headers to attach to the API call.
    '''
    headers = {
        'Authorization': f'Bearer {access_token}',
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
    }
    return headers


def create_CSRF_token():
    '''
    This function generate a random string of letters.
    It is not required by the Linkedin API to use a CSRF token.
    However, it is recommended to protect against cross-site request forgery
    For more info on CSRF https://en.wikipedia.org/wiki/Cross-site_request_forgery
    '''
    letters = string.ascii_lowercase
    token = ''.join(random.choice(letters) for i in range(20))
    return token


def refresh_token(auth_code, client_id, client_secret, redirect_uri,access_token_url):
    '''
    Exchange a Refresh Token for a New Access Token.
    '''

    data = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'redirect_uri': redirect_uri,
        'client_id': client_id,
        'client_secret': client_secret
    }

    response = requests.post(access_token_url, data=data, timeout=30)
    response = response.json()
    access_token = response['access_token']
    print(access_token)
    return access_token


def user_info(headers,linkedin_me_url):
    '''
    Get user information from Linkedin
    '''
    response = requests.get(linkedin_me_url, headers=headers)
    user_info = response.json()
    return user_info