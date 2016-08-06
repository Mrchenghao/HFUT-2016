# -*- coding:utf-8 -*-
from django.shortcuts import render
from django.db.models import Q
from django.http import HttpResponse, HttpResponseRedirect
from django.utils import timezone
from system.gene import search_compound, get_compound_info, get_gene_info
from projectManage.models import *
from accounts.models import *
from utils.functionTools.generalFunction import noneIfEmptyString,noneIfNoKey,myError
from system.gene import gene_graph
import json
import string

# Create your views here.

def searchCompound(request):
	try:
		data = json.loads(request.body)
		try:
			token = Token.objects.filter(token=data['token']).first()
			user = token.user
		except:
			raise myError('Please Log In.')
		keyword = data['keyword']
		search_result = search_compound(keyword)
		result = {
			'successful': True,
			'data': search_result,
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

def getCompound(request):
	try:
		data = json.loads(request.body)
		try:
			token = Token.objects.filter(token=data['token']).first()
			user = token.user
		except:
			raise myError('Please Log In.')
		compound_id = data['compound_id']
		get_result = get_compound_info(compound_id)
		result = {
			'successful': get_result[0],
			'data': get_result[1],
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

def getGene(request):
	try:
		data = json.loads(request.body)
		try:
			token = Token.objects.filter(token=data['token']).first()
			user = token.user
		except:
			raise myError('Please Log In.')
		gene_id = data['gene_id']
		get_result = get_gene_info(gene_id)
		result = {
			'successful': get_result[0],
			'data': get_result[1],
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

def getRelatedCompound(request):
	try:
		data = json.loads(request.body)
		try:
			token = Token.objects.filter(token=data['token']).first()
			user = token.user
		except:
			raise myError('Please Log In.')
		cstr = data['related_id']
		graph = gene_graph(cstr, None)
		graph.cal_graph()
		graph_result = graph.get_graph()
		result = {
			'successful': True,
			'data': graph_result,
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