from __future__ import unicode_literals
from accounts.models import User
from django.db import models

# Create your models here.

class Parts(models.Model):
	part_id          = models.IntegerField(primary_key=True)
	ok               = models.BooleanField(default=True)
	part_name        = models.CharField(max_length=255)
	short_desc       = models.CharField(max_length=255,null=True)
	description      = models.TextField(null=True)
	part_type        = models.CharField(max_length=20,null=True)
	author           = models.CharField(max_length=200,null=True)
	status           = models.CharField(max_length=20,null=True)
	dominant         = models.BooleanField(default=True)
	discontinued     = models.IntegerField(null=True)
	part_status      = models.CharField(max_length=40,null=True)
	sample_status    = models.CharField(max_length=40,null=True)
	p_status_cache   = models.CharField(max_length=1000,null=True)
	s_status_cache   = models.CharField(max_length=1000,null=True)
	in_stock         = models.BooleanField(default=True)
	results          = models.CharField(max_length=20, null=True)
	favorite         = models.IntegerField(null=True)
	specified_u_list = models.TextField(null=True)
	deep_u_list      = models.TextField(null=True)
	deep_count       = models.IntegerField(null=True)
	ps_string        = models.TextField(null=True)
	scars            = models.CharField(max_length=20,null=True)
	barcode          = models.CharField(max_length=50,null=True)
	notes            = models.TextField(null=True)
	source           = models.TextField(null=True)
	nickname         = models.CharField(max_length=50,null=True)
	premium          = models.IntegerField(null=True)
	categories       = models.CharField(max_length=500,null=True)
	sequence         = models.TextField(null=True)
	sequence_length  = models.IntegerField(null=True)
	part_url         = models.CharField(max_length=255, null=True)
	score            = models.FloatField(null=True)

	def __unicode__(self):
		return self.part_name

	class Meta:
		db_table = 'bio_parts'

class Part_Parameters(models.Model):
	part = models.ForeignKey(Parts)
	name = models.CharField(max_length=256)
	value = models.CharField(max_length=256)

	class Meta:
		db_table = 'bio_part_parameters'

class Part_Twins(models.Model):
	part_1 = models.ForeignKey(Parts)
	part_2 = models.ForeignKey(Parts, related_name='FK_PART_TWIN2', db_column='part_2_id')

	class Meta:
		db_table = 'bio_part_twins'

class Features(models.Model):
	feature_id = models.IntegerField(primary_key=True)
	title = models.CharField(max_length=128, null=True)
	feature_type = models.CharField(max_length=128, null=True)
	direction = models.CharField(max_length=256, null=True)
	startpos = models.IntegerField(null=True)
	endpos = models.IntegerField(null=True)
	
	class Meta:
		db_table = 'bio_features'

class Part_Features(models.Model):
	part = models.ForeignKey(Parts)
	Feature = models.ForeignKey(Features)

	class Meta:
		db_table = 'bio_part_features'

class Tracks(models.Model):
	track = models.CharField(max_length=64)

	def __unicode__(self):
		return self.track

	class Meta:
		db_table = 'bio_tracks'

class Functions(models.Model):
	function = models.CharField(max_length=255, null=True)

	def __unicode__(self):
		return self.function

	class Meta:
		db_table = 'bio_functions'

class Project(models.Model):
	project_name = models.CharField(max_length=64)
	creator = models.ForeignKey(User)
	create_time = models.DateTimeField(auto_now_add=True)
	function = models.ForeignKey(Functions, null=True)
	track = models.ForeignKey(Tracks, null=True)

	def __unicode__(self):
		return self.project_name

	class Meta:
		db_table = 'bio_project'

class Chain(models.Model):
	sequence = models.TextField(null=True)
	project = models.ForeignKey(Project)
	name = models.CharField(max_length=64, null=False)
	isModified = models.BooleanField(default=True)
	image_file_path = models.CharField(max_length=255, null=True)
	def __unicode__(self):
		return self.sequence

	class Meta:
		db_table = 'bio_chain'

class Track_Functions(models.Model):
	track = models.ForeignKey(Tracks)
	function = models.ForeignKey(Functions)

	def __unicode__(self):
		return '%s %s' % (self.track, self.function)

	class Meta:
		db_table = 'bio_track_function'


class Teams(models.Model):
	team_id = models.IntegerField(primary_key=True)
	team_name = models.CharField(max_length=64)
	track = models.ForeignKey(Tracks)
	function = models.ForeignKey(Functions)
	year = models.CharField(max_length=16)

	def __unicode__(self):
		return self.team_name

	class Meta:
		db_table = 'bio_team'

class Team_Parts(models.Model):
	team = models.ForeignKey(Teams)
	part = models.ForeignKey(Parts)

	def __unicode__(self):
		return self.team.team_name

	class Meta:
		db_table = 'bio_team_parts'

class Paper(models.Model):
	paper_id = models.CharField(max_length=128, primary_key=True)
	paper_name = models.CharField(max_length=255, null=True)
	paper_file_location = models.CharField(max_length=256, null=True)
	paper_url = models.CharField(max_length=255, null=True)
	def __unicode__(self):
		return self.paper_name

	class Meta:
		db_table = 'bio_paper'

class Part_Papers(models.Model):
	part = models.ForeignKey(Parts)
	paper = models.ForeignKey(Paper)
	def __unicode__(self):
		return self.part.part_name + ' ' + self.paper.paper_name

	class Meta:
		db_table = 'bio_part_papers'

class Compound(models.Model):
    compound_id = models.CharField(primary_key=True, max_length=32)
    name = models.CharField(max_length=255, null=True)
    nicknames = models.TextField(null=True)
    formula = models.CharField(max_length=255)
    exact_mass = models.FloatField(null=True)
    mol_mass = models.FloatField(null=True)

    def __unicode__(self):
        return self.name

    class Meta:
        db_table = 'bio_compound' 

class Gene(models.Model):
    gene_id = models.CharField(primary_key=True, max_length=32)
    name = models.CharField(max_length=64)
    nicknames = models.TextField(null=True)
    definition = models.TextField(null=True)
    organism_short = models.CharField(max_length=16)
    organism = models.CharField(max_length=256)
    position = models.CharField(max_length=16)
    ntseq_length = models.IntegerField()
    ntseq = models.TextField(null=True)

    def __unicode__(self):
        return self.name

    class Meta:
        db_table = 'bio_gene' 

class Reaction(models.Model):
    reaction_id = models.CharField(primary_key=True, max_length=32)
    name = models.CharField(max_length=255)
    definition = models.TextField(null=True)
    equation = models.TextField(null=True)

    def __unicode__(self):
        return self.name

    class Meta:
        db_table = 'bio_reactions' 

class Reaction_Compound(models.Model):
    reaction = models.ForeignKey(Reaction)
    compound = models.ForeignKey(Compound)
    isReactant = models.BooleanField(default=False)
    isResultant = models.BooleanField(default=False)
    amount = models.IntegerField(null=True, default=1)

    def __unicode__(self):
        return self.reaction_id

    class Meta:
        db_table = 'bio_reaction_compounds' 

class Compound_Gene(models.Model):
    compound = models.ForeignKey(Compound)
    gene = models.ForeignKey(Gene)

    def __unicode__(self):
        return self.compound.id

    class Meta:
        db_table = 'bio_compound_gene'

class Part_Gene(models.Model):
    part = models.ForeignKey(Parts)
    gene = models.ForeignKey(Gene)
    score = models.FloatField()

    def __unicode__(self):
        return self.score

    class Meta:
        db_table = 'bio_part_gene'

class Organism(models.Model):
    organism_id = models.CharField(primary_key=True, max_length=32)
    organism_short = models.CharField(max_length=16, null=True)
    organism_name = models.TextField(null=True)

    def __unicode__(self):
        return self.organism_short

    class Meta:
        db_table = 'bio_organism'

class Pathway(models.Model):
    pathway_id = models.CharField(primary_key=True, max_length=32)
    pathway_name = models.CharField(max_length=255, null=True)
    organism = models.ForeignKey(Organism)

    def __unicode__(self):
        return self.pathway_name

    class Meta:
        db_table = 'bio_pathway'

class Pathway_Compound(models.Model):
    pathway = models.ForeignKey(Pathway)
    compound = models.ForeignKey(Compound)
    score = models.IntegerField(null=True)

    def __unicode__(self):
        return self.pathway.pathway_name

    class Meta:
        db_table = 'bio_pathway_compound'
