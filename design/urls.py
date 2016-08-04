from django.contrib import admin
from django.conf.urls import *
import views

urlpatterns = [
    url(r'^searchParts$', views.searchParts),
    url(r'^getParts$', views.getParts),
    url(r'^updateChain$', views.updateChain),
    url(r'^getARecommend$', views.getARecommend),
    url(r'^getMRecommend$', views.getMRecommend),
]