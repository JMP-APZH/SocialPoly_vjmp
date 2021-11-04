from django.urls import path

from draft.views import CreateDraft, SearchTweetView, RetrieveUpdateDeleteDraftView

urlpatterns = [
    path('create/', CreateDraft.as_view()),
    path('search/', SearchTweetView.as_view()),
    path('update/<int:id>/', RetrieveUpdateDeleteDraftView.as_view())
]