# -*- coding:utf-8 -*-
from django.shortcuts import render
from projectManage.models import *
from accounts.models import *
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from utils.functionTools.generalFunction import noneIfEmptyString,noneIfNoKey,myError
import json
import string


# Create your views here.

def searchGenes(request):
	try:
        data = json.loads(request.body)
        try:
            token = Token.objects.filter(token=data['token']).first()
            user = token.user
        except:
            raise myError('Please Log In.')
        keyword = data['keyword']
        searchResult = search_genes(keyword)
        if searchResult['successful']:
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

