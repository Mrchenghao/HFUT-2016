# -*- coding:utf-8 -*-

import os,django
os.environ["DJANGO_SETTINGS_MODULE"] = "BioDesignVer.settings"
django.setup()
from geneRelationship.models import Gene_Disease
import json

def saveGene_DiseasetoDB():
	readFile = file('resultDisease.json')
	for f in readFile:
		gnee_disease = json.loads(f)