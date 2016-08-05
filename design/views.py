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

def getChain(request):
    try:
        data = json.loads(request.body)
        token = Token.objects.filter(token=data['token']).first()
        project_id = data['project_id']
        project = Project()
        project = Project.objects.filter(id=project_id).first()
        if token.user != project.creator:
            raise myError('Check Failed.')
        chain = Chain.objects.filter(id=data['chain_id']).first()
        sequence = chain.sequence
        if sequence.startswith('_'):
            sequence = sequence[1:]
        if sequence.endswith('_'):
            sequence = sequence[:-1]
        sequenceList = sequence.split('_')
        partList = []
        for seq in sequenceList:
            part = Parts.objects.filter(part_id=seq).first()
            partList.append({
                    'part_name': part.part_name,
                    'part_type': part.part_type
                })
        result = {
            'successful': True,
            'data': partList,
            'error': {
                'id': '',
                'msg': '',
            },
        }
    except myError, e:
        result = {
            'successful': False,
            'error': {
                'id': '3',
                'msg': e.value,
            }
        }
    except Exception,e:
        result = {
            'successful': False,
            'error': {
                'id': '1024',
                'msg': e.args
            }
        }
    finally:
        return HttpResponse(json.dumps(result), content_type='application/json')

def searchParts(request):
    try:
        data = json.loads(request.body)
        token = Token()
        token = Token.objects.filter(token=data['token']).first()
        user = User()
        user = token.user
        keyword = data['keyword']
        try:
            funcs = data['funcs']
        except:
            funcs = None
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
        if searchResult.successful:
            result = {
                'successful': True,
                'data': searchResult,
                'error': {
                    'id': '',
                    'msg': '',
                }
            }
        else:
            raise myError('Check Failed.')
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
        chainid = data['chain_id']
        chain = Chain()
        chain = Chain.objects.filter(id=data['chain_id']).first()
        if len(data['chain_info']):
            seq = ''
            for chain_item in data['chain_info']:
                if seq:
                    print chain_item
                    seq += '_' + str(chain_item[u'id'])
                else:
                    print chain_item
                    seq += str(chain_item[u'id'])
        chain.sequence = seq
        chain.save()
        result = {
            'successful': True,
            'data': seq,
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
