from django.contrib import admin
from django.views.generic import TemplateView
from django.conf.urls import *
import views

urlpatterns = [
	url(r'^$', views.projectView),
    url(r'^getUserProject$', views.getUserProject),
#     url(r'^login$', views.login),
#     # url(r'^logout$', views.logout),
#     # url(r'^user/change_info$', views.change_info),
#     # url(r'^user/change_password$', views.change_password),
#     # url(r'^user/confirm$', views.confirm),
#     # url(r'^user/reconfirm$', views.reconfirm),
]