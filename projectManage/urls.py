from django.contrib import admin
from django.views.generic import TemplateView,RedirectView
from django.conf.urls import *
import views

urlpatterns = [
    #url(r'^$', TemplateView.as_view(template_name = '../static/project_page/project_page.html')),
    url(r'^$', RedirectView.as_view(url='/static/project_page/project_page.html')),
    url(r'^getUserProject$', views.getUserProject),
    url(r'^getProjectDevices$', views.getProjectDevices),
    url(r'^getTracks$', views.getTracks),
    url(r'^createNewProject$', views.createNewProject),
    url(r'^deleteProject$', views.deleteProject),
   	url(r'^createProjectDevice$', views.createProjectDevice),
]