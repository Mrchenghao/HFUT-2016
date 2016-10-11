# -*- coding:utf-8 -*-
from pymongo import MongoClient
from models import *
import json,re

client = MongoClient('localhost', 27017)
db = client['biodesignver']
collection = db['biodesignver']

def search_relation(key_word):
	search_result = collection.find_one({"main_gene":key_word })
	gene_realation = {}
	gene_realation['name'] = search_result['main_gene']
	gene_realation['children'] = search_result['related_gene']
	return gene_realation 

def search_genes(key_word):
	search_result = collection.find({"main_gene":re.compile(key_word)})
	gene_list = []
	for gene in search_result:
		gene_list.append(gene['main_gene'])
	return gene_list

def search_papers(gene_name):
	gene = Gene.objects.filter(name=gene_name).first()
	papers = Paper_Gene.objects.filter(gene=gene).order_by('paper_class')
	paper_list = []
	paper_class = -999
	p_list = []
	for paper in papers:
		if paper_class != paper.paper_class:
			paper_list.append(p_list)
			p_list = []
			paper_class = paper.paper_class
		p_list.append({
				'id': paper.id,
				'paper_id': paper.paper_id,
				'paper_title': paper.paper_title,
				'paper_link': paper.paper_link,
				'paper_keyword': paper.paper_keyword,
				'paper_abstract': paper.paper_abstract[8:],
				'paper_class': paper.paper_class
			})
		paper_class = paper.paper_class
	paper_list.append(p_list)
	del paper_list[0]
	return paper_list

def search_one_sentence(gene_name_one, gene_name_two):
	one_keysentences = One_KeySentence.objects.filter(gene_name_one=gene_name_one, gene_name_two=gene_name_two)
	sentence_list = []
	sList = []
	for sentence in one_keysentences:
		if sentence.sentence not in sList:
			sList.append(sentence.sentence) 
			sentence_list.append({
				'sentence': sentence.sentence,
				'paper_id': sentence.paper.paper_id,
				'paper_title': sentence.paper.paper_title,
				'paper_link': sentence.paper.paper_link,
				'paper_keyword': sentence.paper.paper_keyword,
				'paper_abstract': sentence.paper.paper_abstract[8:]
				})
	return sentence_list

def search_three_sentence(gene_name_one, gene_name_two):
	three_keysentences = Three_KeySentence.objects.filter(gene_name_one=gene_name_one, gene_name_two=gene_name_two)
	sentence_list = []
	for sentence in three_keysentences:
		sentence_list.append({
			'sentence': sentence.sentence,
			'paper_id': sentence.paper.paper_id,
			'paper_title': sentence.paper.paper_title,
			'paper_link': sentence.paper.paper_link,
			'paper_keyword': sentence.paper.paper_keyword,
			'paper_abstract': sentence.paper.paper_abstract[8:]
			})
	return sentence_list

def search_related_disease(gene_name):
	base_url = 'http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=Retrieve&db=Pubmed&dopt=Abstract&list_uids='
	gene_diseases = Gene_Disease.objects.filter(gene_name=gene_name)
	if not gene_diseases:
		return None
	disease_list = []
	disease_name_list = []
	for gene_disease in gene_diseases:
		if gene_disease.disease_name not in disease_name_list:
			disease_name_list.append(gene_disease.disease_name)
			disease_list.append({
				'disease_name': gene_disease.disease_name,
				'disease_class': gene_disease.disease_class,
				'paper_url': base_url + str(gene_disease.paper_id)
				})
	return disease_list