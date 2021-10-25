from django.urls import path

from user.views import ListAllUsersView, RetrieveUpdateDeleteUserView, SpecificUserView

urlpatterns = [
    path('users/list/', ListAllUsersView.as_view()),
    path('users/me/', RetrieveUpdateDeleteUserView.as_view()),
    path('users/?search=<str:search_string>/', ListAllUsersView.as_view()),
    path('users/<int:user_id>/', SpecificUserView.as_view())
]
