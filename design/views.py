# -*- coding:utf-8 -*-

"""

@author:    ZhangAYongqin
"""
from django.shortcuts import render
from models import *
from projectManage.models import *
from accounts.models import *
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.hashers import make_password, check_password
from search_part import ambiguousSearch, getPart
from utils.functionTools.generalFunction import noneIfEmptyString,noneIfNoKey,myError
from recommend import *
from search_part import *
import json
import string
import random

# Create your views here.
def searchParts(request):
    try:
        data = json.loads(request.body)
        token = Token()
        token = Token.objects.filter(token=data.data['token']).first()
        user = User()
        user = token.user
        keyword = data.data['keyword']
        try:
            funcs = data.data['funcs']
        except:
            funcs = ''
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
        token = Token.objects.filter(token=data.data['token']).first()
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
        token = Token.objects.filter(token=data.data['token']).first()
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

def getARecommend(request):
    try:
        data = json.loads(request.body)
        token = Token()
        token = Token.objects.filter(token=data.data['token']).first()
        chainStr = data.data['seq']
        try:
            funcsStr = data.data['funcs']
        except:
            funcsStr = ''
        if chainStr.startswith('_'):
            chainStr = chainStr[1:]
        if chainStr.endswith('_'):
            chainStr = chainStr[:-1]
        recommend_list = getApriorRecommend(chainStr, funcStr)
        result = {
            'successful': True,
            'data': recommend_list,
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

def getMRecommend(request):
    try:
        data = json.loads(request.body)
        token = Token()
        token = Token.objects.filter(token=data.data['token']).first()
        part_id = data.data['part_id']    
        recommend_list = getMarkovRecommend(part_id)
        if not recommend_list:
            result = {
            'successful': False,
            'error': {
                'id': '',
                'msg': '',
            }
        }
        else:
            result = {
                'successful': True,
                'data': recommend_list,
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
