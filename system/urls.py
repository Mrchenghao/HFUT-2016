from django.contrib import admin
from django.conf.urls import *
import views

urlpatterns = [
	url(r'^searchCompound$', views.searchCompound),
    url(r'^getCompound$', views.getCompound),
    url(r'^getGene$', views.getGene),
    url(r'^getRelatedCompound$', views.getRelatedCompound),
    # url(r'^getARecommend$', views.getARecommend),
    # url(r'^getMRecommend$', views.getMRecommend),
]