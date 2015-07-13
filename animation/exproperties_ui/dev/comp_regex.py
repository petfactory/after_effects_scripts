'''Regex ytest to create comp, layer and effect from string'''
import re

s = 'comp("Comp 1").layer("Layer 1").effect("val")("slider")'
comp_pattern = re.compile('(comp)\("([\w\d ]*)"\)')
layer_pattern = re.compile('(layer)\("([\w\d ]*)"\)')
effect_pattern = re.compile('(layer)\("([\w\d ]*)"\)')

#print(dir(re))
cm = re.search(comp_pattern, s)
lm = re.search(layer_pattern, s)

if cm:
	print(cm.groups())

if lm:
	print(lm.groups())