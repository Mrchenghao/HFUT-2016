# -*- coding:utf-8 -*-
from django.shortcuts import render
from projectManage.models import *
from accounts.models import *
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from utils.functionTools.generalFunction import noneIfEmptyString,noneIfNoKey,myError
from search_relation import search_relation, search_genes, search_papers
from system.gene import get_gene_info
import json
import string
import random


# Create your views here.

def randomGene(request):
	try:
		data = json.loads(request.body)
		try:
			token = Token.objects.filter(token=data['token']).first()
			user = token.user
		except:
			raise myError('Please Log In.')
		gene_file = open('gene_name.json', 'r')
		gene_list = json.loads(gene_file.read())
		gene_name = random.choice(gene_list)
		search_result = search_relation(gene_name)
		if len(search_result['children']) > 10:
			search_result['children'] = search_result['children'][:10]
		for gene in search_result['children']:
			gene_name = gene['name']
			temp_result = search_relation(gene_name)
			if len(temp_result['children']) > 10:
				gene['children'] = temp_result['children'][:10]
			else:
				gene['children'] = temp_result['children']
		gene_json = open('gene.json', 'w')
		gene_json.write(json.dumps(search_result))
		gene_json.close()
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
		with open('data.json', 'wb') as out_put:
			out_put.write(json.dumps(result))
		return HttpResponse(json.dumps(result), content_type='application/json')

def searchGenes(request):
	try:
		data = json.loads(request.body)
		try:
			token = Token.objects.filter(token=data['token']).first()
			user = token.user
		except:
			raise myError('Please Log In.')
		keyword = data['keyword']
		search_result = search_genes(keyword)
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


def getGeneInfo(request):
	try:
		data = json.loads(request.body)
		try:
			token = Token.objects.filter(token=data['token']).first()
			user = token.user
		except:
			raise myError('Please Log In.')
		gene_name = data['gene_name']
		gene = Gene.objects.filter(name=gene_name).first()
		gene_id = gene.gene_id
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

def getRelatedGene(request):
	try:
		data = json.loads(request.body)
		try:
			token = Token.objects.filter(token=data['token']).first()
			user = token.user
		except:
			raise myError('Please Log In.')
		gene_name = data['gene_name']
		realated_gene_list = []
		realated_genes = search_relation(gene_name)
		if realated_genes['children'] > 10:
			realated_genes['children'] = realated_genes['children'][:10]
		print realated_genes
		result = {
			'successful': True,
			'data': realated_genes,
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

def getRelatedPaper(request):
	try:
		data = json.loads(request.body)
		try:
			token = Token.objects.filter(token=data['token']).first()
			user = token.user
		except:
			raise myError('Please Log In.')
		gene_name = data['gene_name']
		realated_paper_list = search_papers(gene_name)
		print realated_paper_list
		result = {
			'successful': True,
			'data': realated_paper_list,
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

def getOneSentence(request):
	try:
		data = json.loads(request.body)
		try:
			token = Token.objects.filter(token=data['token']).first()
			user = token.user
		except:
			raise myError('Please Log In.')
		gene_name_one = data['gene_name_one']
		gene_name_two = data['gene_name_two']
		
		result = {
			'successful': True,
			'data': realated_paper_list,
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
