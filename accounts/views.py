# -*- coding: utf-8 -*-
from django.shortcuts import render
from models import *
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
import json
import string
import random
# Create your views here.

def noneIfEmptyString(value):
	if value == "":
		return None
	return value

def noneIfNoKey(dict, key):
	if key in dict:
		value = dict[key]
		if value == "":
			return None
		return value
	return None

class myError(Exception):
	def __init__(self, value):
		self.value = value
	def __str__(self):
		return repr(self.value)

def indexView(request):
	return render(request, 'login_register/login_register.html')

def getRegister(request):
	return render(request, 'login_register/login_register.html')

def register(request):
	try:
		data = json.loads(request.body)
		userName = data['username']
		print userName
		email = data['email']
		print email
		password = data['password']
		print password
		repassword = data['repassword']
		print repassword
		existEmail = User.objects.filter(email=email).first()
		if existEmail:
			raise myError('该邮箱已被注册!')
		existName = User.objects.filter(userName=userName).first()
		if existName:
			raise myError('该用户名已被注册!')
		if password != repassword:
			raise myError('两次密码不同!')
		user = User()
		user.userName = userName
		user.password = make_password(password)
		user.email = email
		# send_verificationEmail(email)
		user.save()
		result = {
		'successful': True,
		'error': {
			'id': '',
			'msg': '',
			},
		}
	except myError, e:
		result = {
			'successful': False,
			'error': {
				'id': '1',
				'msg': e.value
			}
		}
	except Exception,e:
		result = {
		'successful': False,
		'error': {
			'id': '1024',
			'msg': e.args,
			},
		}
	finally:
		return HttpResponse(json.dumps(result), content_type="application/json")

def getLogin(request):
	return render(request, 'login_register/login_register.html')

def login(request):
	if request.method == 'GET':
		getLogin(request)
	try:
		data = json.loads(request.body)
		print data
		userName = data['username']
		password = data['password']
		print password
		customerUser = User()
		customerUser = User.objects.filter(userName=userName).first()
		if not customerUser:
			raise myError("该用户不存在")
		if(check_password(password, customerUser.password)):
			token = Token()
			token = Token.objects.filter(user=customerUser)
			if(len(token) != 0):
				token.delete()
		else:
			raise myError('登录名或密码错误')
		confirmed = customerUser.isConfirmed
		customerToken = ''.join(random.sample(string.ascii_letters + string.digits, 30))
		token = Token()
		token.token = customerToken
		token.user = customerUser
		token.expire = '-1'
		token.save()
		result = {
			'data': {
				'confirmed': confirmed,
				'token': customerToken,
				'expire': -1,
			},
			'successful': True,
			'error': {
				'id': '',
				'msg': '',
			},
		}
	except myError, e:
		result = {
			'successful': False,
			'error': {
				'id': '1',
				'msg': e.value
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

# def logout(request):
# 	try:
# 		data = json.loads(request.body)
# 		customerToken = data['token']
# 		token = Token()
# 		token = Token.objects.get(token=customerToken)
# 		token.delete()
# 		result = {
# 			'successful': True,
# 			'error': {
# 				'id': '',
# 				'msg': '',
# 			},
# 		}
# 	except Exception as e:
# 		result = {
# 			'successful': False,
# 			'error': {
# 				'id': '1024',
# 				'msg': e.args
# 			}
# 		}
# 	finally:
# 		return HttpResponse(json.dumps(result), content_type='application/json')

# def change_password(request):
# 	try:
# 		data = json.loads(request.body)
# 		user = User()
# 		token = Token()
# 		token = Token.objects.get(token=data['token'])
# 		user = token.user
# 		if(not check_password(data['user']['old_password'],user.password)):
# 			raise myError('原密码输入错误!')
# 		user.password = make_password(data['user']['new_password'])
# 		user.save()
# 		result = {
# 			'successful': True,
# 			'error': {
# 				'id': '',
# 				'msg': ''
# 			}
# 		}
# 	except myError, e:
# 		result = {
# 			'successful': False,
# 			'error': {
# 				'id': '3',
# 				'msg': e.value,
# 			}
# 		}
# 	except Exception, e:
# 		result = {
# 			'successful': False,
# 			'error': {
# 				'id': '1024',
# 				'msg': e.args,
# 			}
# 		}
# 	finally:
# 		return HttpResponse(json.dumps(result), content_type='application/json')