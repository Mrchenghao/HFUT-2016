from __future__ import unicode_literals

from django.db import models

# Create your models here.
class User(models.Model):
	email = models.EmailField(primary_key=True)
	password = models.CharField(max_length=255)
	userName = models.CharField(max_length=30, unique=True)
	isConfirmed = models.BooleanField(default=False)

	def __unicode__(self):
		return self.userName

class Token(models.Model):
	token = models.CharField('token', max_length=50, unique=True, db_index=True)
	user = models.OneToOneField(User)
	lastTime = models.DateTimeField(auto_now=True)
	expire = models.BigIntegerField('expire')

	def __unicode__(self):
		return self.token