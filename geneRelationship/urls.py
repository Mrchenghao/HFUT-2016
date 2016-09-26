from django.contrib import admin
from django.conf.urls import *
import views

urlpatterns = [
	url(r'^searchGenes$', views.searchGenes),
    url(r'^getRelatedGene$', views.getRelatedGene),
    url(r'^randomGene$', views.randomGene),
    url(r'^getRelatedPaper$', views.getRelatedPaper),
]