# -*- coding:utf-8 -*-

import os,django
os.environ["DJANGO_SETTINGS_MODULE"] = "BioDesignVer.settings"
django.setup()
from geneRelationship.models import Gene_Disease
import traceback
import json

def saveGene_DiseasetoDB(fileName):
	readFile = file(fileName)
	for f in readFile:
		gnee_disease_objects = json.loads(f)
	for gene_disease_object in gnee_disease_objects:
		try:
			gene_disease = Gene_Disease()
			gene_disease.gene_name = gene_disease_object['gene']
			gene_disease.disease_name = gene_disease_object['disease']
			gene_disease.disease_class = gene_disease_object['dis_class']
			gene_disease.paper_id = gene_disease_object['pubmedid']
			gene_disease.save()
		except:
			traceback.print_exc()

if __name__ == '__main__':
	saveGene_DiseasetoDB()