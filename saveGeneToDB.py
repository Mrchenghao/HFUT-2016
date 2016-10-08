# -*- coding:utf-8 -*-
import os,django
os.environ["DJANGO_SETTINGS_MODULE"] = "BioDesignVer.settings"
django.setup()
from geneRelationship.models import *
from itertools import combinations
from geneRelationship.models import Gene
from fasta_reader import parse_fasta_str
import traceback
import urllib2
import json

def saveGene():
    geneIdList = getGeneIDList()
    for geneID in geneIdList:
        getGene(geneID)

def getGeneIDList():
    i = 0
    readFile = open('newGene.json', 'r')
    for n in readFile:
        js = json.loads(n)
    geneIdList = []
    while js:
        i += 1
        gene = js.pop(0)
        geneIdList.append(gene['gene_id'])
    readFile.close()
    print 'count: %s \n' % i
    return geneIdList

def getGene(gid):
    gene = Gene.objects.filter(gene_id=gid).first()
    if not gene:
        baseUrl = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&rettype=fasta&id='
        print 'geneid: %s \n' % gid
        req = urllib2.Request(baseUrl + gid)
        response = urllib2.urlopen(req)
        resStr = response.read()
        gene_dict = parse_fasta_str(resStr)
        for gn in gene_dict.keys():
            gid = gn.split('|')[1]
            #get detail information
            new_gene_obj = Gene(gene_id=gid)
            detail_info = retrive_gene_detain(gid)
            if detail_info == None:
                continue
            new_gene_obj.name = detail_info['name']
            new_gene_obj.definition = detail_info['definition']
            new_gene_obj.organism = detail_info['organism']
            new_gene_obj.ntseq = gene_dict[gn]
            new_gene_obj.ntseq_length = len(gene_dict[gn])
            try:
                new_gene_obj.save()
                return new_gene_obj
            except:
                pass

def retrive_gene_detain(gid):
    """
    get gene data from ncbi

    @param gid: gene id
    @type gid: str
    @return: gene information in dict or none
    @rtype: dict

    """
    #get information from ncbi
    baseUrl = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&retmode=json&version=2.0&id='
    
    try:
        req = urllib2.Request(baseUrl + gid)
        response = urllib2.urlopen(req)
        resStr = response.read()
        result = json.loads(resStr)
        infos = result['result'][gid]
        detail_info = dict()
        detail_info['name'] = infos['name']
        detail_info['definition'] = infos['description']
        detail_info['organism'] = infos['organism']['scientificname']
        return detail_info
    except:
        traceback.print_exc()
        print 'gid: %s \n' % gid
        return None

if __name__ == '__main__':
    saveGene()