from __future__ import unicode_literals
from accounts.models import User
from django.db import models

# Create your models here.

class Tracks(models.Model):
    track    = models.CharField(max_length=64)

    def __unicode__(self):
        return self.track

    class Meta:
        db_table = 'bio_tracks'

class Functions(models.Model):
    function = models.CharField(max_length=255, null=True)

    def __unicode__(self):
        return self.function

    class Meta:
        db_table = 'bio_functions'

class Project(models.Model):
    project_name = models.CharField(max_length=64)
    creator      = models.ForeignKey(User)
    create_time  = models.DateTimeField(auto_now_add=True)
    function     = models.ForeignKey(Functions, null=True)
    track        = models.ForeignKey(Tracks, null=True)

    def __unicode__(self):
        return self.project_name

    class Meta:
        db_table = 'bio_project'

class Chain(models.Model):
    sequence = models.CharField(max_length=255,null=True)
    project  = models.ForeignKey(Project)
    name = models.CharField(max_length=64, null=False)
    isModified = models.BooleanField(default=True)
    image_file_path = models.CharField(max_length=255, null=True)
    def __unicode__(self):
        return self.sequence

    class Meta:
        db_table = 'bio_chain'

