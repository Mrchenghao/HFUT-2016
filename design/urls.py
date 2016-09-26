from django.contrib import admin
from django.conf.urls import *
import views

urlpatterns = [
	url(r'^getChain$', views.getChain),
    url(r'^searchParts$', views.searchParts),
    url(r'^getParts$', views.getParts),
    url(r'^updateChain$', views.updateChain),
    url(r'^getARecommend$', views.getARecommend),
    url(r'^getMRecommend$', views.getMRecommend),
    url(r'^getBettwenRecommend$', views.getBettwenRecommend),
    url(r'^getBeforeRecommend$', views.getBeforeRecommend),
    url(r'^getResultImage$', views.getResultImage),
]