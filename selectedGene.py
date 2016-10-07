# -*- coding:utf-8 -*-
import json

def getGeneList():
    readFile = open('bio_gene.json', 'r')
    for n in readFile:
        js = json.loads(n)
    geneNameList = []
    while js:
        gene = js.pop(0)
        geneNameList.append(gene['gene_name'])
    readFile.close()
    return geneNameList

def selectGene(gene_name):
    selectFile = open('disease.json', 'r')
    for f in selectFile:
        select = json.loads(f)
    selectList = []
    for s in select:
        print s
        if s['gene'] == gene_name:
            selectList.append(s)
    return selectList

if __name__ == '__main__':
    resultFile = open('resultDisease.json', 'a')
    geneList = getGeneList()
    selectLists = []
    for gene_name in geneList:
       selectList = selectGene(gene_name)
       selectLists.extend(selectList)
    resultFile.write(json.dumps(selectLists))