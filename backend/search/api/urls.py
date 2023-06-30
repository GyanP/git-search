from django.urls import re_path

from .views import GitSearchView

app_name = 'search'

urlpatterns = [
    re_path('search/', GitSearchView.as_view(), name='search'),
    re_path('clear-cache/', GitSearchView.as_view(), name='clear_cache'),

]
