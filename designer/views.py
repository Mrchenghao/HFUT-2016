# -*- coding:utf-8 -*-

"""

@author:    ZhangAYongqin
"""
from django.shortcuts import render
from models import *
from projectManage.molels import *
from accounts.models import *
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.hashers import make_password, check_password
from search_part import ambiguousSearch, getPart
from utils.functionTools.generalFunction import noneIfEmptyString,noneIfNoKey,myError
import json
import string
import random

# Create your views here.
def searchParts(request):
    try:
        data = json.loads(request.body)
        token = Token()
        token = Token.objects.filter(token=data['token']).first()
        user = User()
        user = token.user
        keyword = data.data['keyword']
        searchResult = ambiguousSearch(keyword, funcs)
        result = {
            'successful': True,
            'data': searchResult,
            'error': {
                'id': '',
                'msg': '',
            }
        }
    except Exception, e:
        result = {
            'successful': False,
            'error': {
                'id': '',
                'msg': e.args,
            }
        }
    finally:
        return HttpResponse(json.dumps(result), content_type='application/json')

def getParts(request):
    try:
        data = json.loads(request.body)
        token = Token()
        token = Token.objects.filter(token=data['token']).first()
        user = User()
        user = token.user
        partname = data.data['partname']
        searchResult = getPart(partname)
        result = {
            'successful': True,
            'data': searchResult,
            'error': {
                'id': '',
                'msg': '',
            }
        }
    except Exception, e:
        result = {
            'successful': False,
            'error': {
                'id': '',
                'msg': e.args,
            }
        }
    finally:
        return HttpResponse(json.dumps(result), content_type='application/json')


def updateChain(request):
    try:
        data = json.loads(request.body)
        token = Token()
        token = Token.objects.filter(token=data['token']).first()
        user = User()
        user = token.user
        partname = data.data['partname']
        searchResult = getPart(partname)
        result = {
            'successful': True,
            'data': searchResult,
            'error': {
                'id': '',
                'msg': '',
            }
        }
    except Exception, e:
        result = {
            'successful': False,
            'error': {
                'id': '',
                'msg': e.args,
            }
        }
    finally:
        return HttpResponse(json.dumps(result), content_type='application/json')
