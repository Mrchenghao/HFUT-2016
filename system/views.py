# -*- coding:utf-8 -*-
from django.shortcuts import render
from django.db.models import Q
from django.http import HttpResponse, HttpResponseRedirect
from django.utils import timezone
# Create your views here.

def searchCompound(request):
	