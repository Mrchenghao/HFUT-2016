from pymongo import MongoClient
import json,re

client = MongoClient('localhost', 27017)
db = client['biodesignver']
collection = db['biodesignver']

search_relation(key_word):
    return collection.find_one({"main_gene":key_word })

search_genes(key_word):
    return collection.find({"main_gene":re.compile(key_word)})