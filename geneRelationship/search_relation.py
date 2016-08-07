# -*- coding:utf-8 -*-
from pymongo import MongoClient
import json,re

client = MongoClient('localhost', 27017)
db = client['biodesignver']
collection = db['biodesignver']

def search_relation(key_word):
	search_result = collection.find_one({"main_gene":key_word })
	gene_realation = {}
	gene_realation['main_gene'] = search_result['main_gene']
	gene_realation['related_gene'] = search_result['related_gene']
	return gene_realation 

def search_genes(key_word):
	search_result = collection.find({"main_gene":re.compile(key_word)})
	gene_list = []
	for gene in search_result:
		gene_list.append(gene['main_gene'])
	return gene_list