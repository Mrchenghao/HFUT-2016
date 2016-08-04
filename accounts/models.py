from __future__ import unicode_literals

from django.db import models

# Create your models here.
class User(models.Model):
	userName = models.CharField(max_length=30, primary_key=True)
	email = models.EmailField(unique=True)
	password = models.CharField(max_length=255)
	isConfirmed = models.BooleanField(default=False)

	def __unicode__(self):
		return self.name

	class Meta:
		db_table = 'bio_user'

class Token(models.Model):
	token = models.CharField('token', max_length=64, unique=True, db_index=True)
	user = models.OneToOneField(User)
	lastTime = models.DateTimeField(auto_now=True)
	expire = models.BigIntegerField('expire')

	def __unicode__(self):
		return self.token

	class Meta:
		db_table = 'bio_usersafety'
