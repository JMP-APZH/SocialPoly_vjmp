from django.urls import path

from user.views import ListAllUsersView, SpecificUserView, RetrieveUpdateProfileView

urlpatterns = [
    path('list/', ListAllUsersView.as_view()),
    path('me/', RetrieveUpdateProfileView.as_view()),
    path('?search=<str:search_string>/', ListAllUsersView.as_view()),
    path('<int:user_id>/', SpecificUserView.as_view())
]
