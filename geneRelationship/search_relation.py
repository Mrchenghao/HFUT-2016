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
	papers = Paper_Gene.objects.filter(gene=gene)
	paperList = []
	for paper in papers:
		paperList.append({
				'paper_id': paper.paper_id,
				'paper_title': paper.paper_title,
				'paper_link': paper.paper_link,
				'paper_keyword': paper.paper_keyword,
				'paper_abstract': paper.paper_abstract[8:]
			})
	return paperList

def search_one_sentence(gene_name_one, gene_name_two):
	one_keysentences = One_KeySentence.objects.filter(gene_name_one=gene_name_one, gene_name_two=gene_name_two)
	sentenceList = []
	sList = []
	for sentence in one_keysentences:
		if sentence.sentence not in sList:
			sList.append(sentence.sentence) 
			sentenceList.append({
				'sentence': sentence.sentence,
				'paper_id': sentence.paper.paper_id,
				'paper_title': sentence.paper.paper_title,
				'paper_link': sentence.paper.paper_link,
				'paper_keyword': sentence.paper.paper_keyword,
				'paper_abstract': sentence.paper.paper_abstract[8:]
				})
	return sentenceList

def search_three_sentence(gene_name_one, gene_name_two):
	three_keysentences = Three_KeySentence.objects.filter(gene_name_one=gene_name_one, gene_name_two=gene_name_two)
	sentenceList = []
	for sentence in three_keysentences:
		sentenceList.append({
			'sentence': sentence.sentence,
			'paper_id': sentence.paper.paper_id,
			'paper_title': sentence.paper.paper_title,
			'paper_link': sentence.paper.paper_link,
			'paper_keyword': sentence.paper.paper_keyword,
			'paper_abstract': sentence.paper.paper_abstract[8:]
			})
	return sentenceList