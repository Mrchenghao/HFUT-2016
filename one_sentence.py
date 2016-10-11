import os,django
os.environ["DJANGO_SETTINGS_MODULE"] = "BioDesignVer.settings"
django.setup()
from geneRelationship.models import *
from itertools import combinations
from fasta_reader import parse_fasta_str
import traceback
import urllib2
import json

def saveOneSentenceToDB():
	readFile = open('singleSentence.json', 'r')
	for n in readFile:
		sentenceList = json.loads(n)
	while sentenceList:
		sentence = sentenceList.pop(0)
		# print sentence
		geneNameList = list(combinations(sentence['gene_list'], 2))
		# print geneNameList
		for geneName in geneNameList:
			try:
				one_keySentence = One_KeySentence()
				geneName_one =  geneName[0].replace("'", '')
				geneName_one = geneName_one.strip()[1:]
				print geneName_one
				geneName_two = geneName[1].replace("'", '')
				geneName_two = geneName_two.strip()[1:]
				print geneName_two
				one_keySentence.gene_name_one = geneName_one
				one_keySentence.gene_name_two = geneName_two
				one_keySentence.sentence = sentence['sentence']
				paper_gene = Paper_Gene.objects.filter(paper_id=sentence['paper_id'][3:]).first()
				one_keySentence.paper = paper_gene
				one_keySentence.save()
			except:
				continue

def saveThreeSentenceToDB():
	readFile = open('3sentence.json', 'r')
for n in readFile:
	sentenceList = json.loads(n)
while sentenceList:
	sentence = sentenceList.pop(0)
	# print sentence
	geneNameList = list(combinations(sentence['gene_list'], 2))
	# print geneNameList
	for geneName in geneNameList:
		try:
			three_keySentence = Three_KeySentence()
			geneName_one = geneName[0].replace("'", '')
			geneName_one = geneName_one.strip()[1:]
			print geneName_one
			geneName_two = geneName[1].replace("'", '')
			geneName_two = geneName_two.strip()[1:]
			print geneName_two
			three_keySentence.gene_name_one = geneName_one
			three_keySentence.gene_name_two = geneName_two
			three_keySentence.sentence = sentence['sentence']
			paper_gene = Paper_Gene.objects.filter(paper_id=sentence['paper_id'][3:]).first()
			three_keySentence.paper = paper_gene
			three_keySentence.save()
		except:
			continue