# -*- coding:utf-8 -*-
import os,django
os.environ["DJANGO_SETTINGS_MODULE"] = "BioDesignVer.settings"
django.setup()
from geneRelationship.models import *
from itertools import combinations
import json