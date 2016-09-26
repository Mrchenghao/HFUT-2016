from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Gene(models.Model):
    gene_id = models.CharField(primary_key=True, max_length=32)
    name = models.CharField(max_length=64)
    nicknames = models.TextField(null=True)
    definition = models.TextField(null=True)
    organism_short = models.CharField(max_length=16)
    organism = models.CharField(max_length=256)
    position = models.CharField(max_length=16)
    ntseq_length = models.IntegerField()
    ntseq = models.TextField(null=True)

    def __unicode__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'bio_gene'

class Paper_Gene(models.Model):
    paper_id = models.CharField(max_length=32)
    paper_title = models.CharField(max_length=255)
    paper_keyword = models.CharField(max_length=255, default=None)
    paper_abstract = models.TextField()
    paper_link = models.CharField(max_length=255)
    gene = models.ForeignKey(Gene)

    def __unicode__(self):
        return self.paper_id

    class Meta:
        db_table = 'bio_paper_gene'