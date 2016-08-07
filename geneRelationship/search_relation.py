from pymongo import MongoClient
import json

client = MongoClient('localhost', 27017)
db = client['biodesignver']
collection = db['biodesignver']

search_relation(key_word):
    return collection.find_one({"main_gene":key_word })