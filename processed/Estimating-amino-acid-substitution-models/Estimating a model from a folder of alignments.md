Estimating amino acid substitution models

Amino acid substitution models are a key component in phylogenetic analyses of protein sequences. Most, if not all, analyses use [empirical amino-acid models](Substitution-Models#protein-models), which were obtained from protein databases; but there has been no useful tool to estimate them for modern datasets at hand. Therefore, we introduced QMaker ([Minh et al., 2021]) as a fast and convenient tool as part of IQ-TREE version 2 to infer a replacement matrix Q for any set of protein alignments. 

If you use QMaker or new models (Q.pfam, Q.plant, Q.mammal, Q.bird, Q.insect, Q.yeast), please cite:

>  Bui Quang Minh, Cuong Cao Dang, Le Sy Vinh, and Robert Lanfear (2021), QMaker: Fast and Accurate Method to Estimate Empirical Models of Protein Evolution. _Systematic Biology_ 70: 1046–1060. <https://doi.org/10.1093/sysbio/syab010>

### Estimating a model from a folder of alignments

We will now estimate a reversible model from a folder of alignments. Please first download the file [plant_10alignments.zip](data/plant_10alignments.zip). There is a sub-folder named `train_plant` in the downloaded folder. We use `-S` option instead of `-s` and `-p` options to allow each alignment having a separate tree. This -S option is typically used with a folder of alignments. The three commands are:

	# step 1: infer a  separate tree for each alignment with reversible models as initial models
	iqtree2 -seed 1 -T AUTO -S train_plant -mset LG,WAG,JTT -cmax 4 -pre train_plant
	
	# step 2: estimate a join reversible matrix across all alignments
	iqtree2 -seed 1 -T AUTO -S train_plant.best_model.nex -te train_plant.treefile --model-joint GTR20+FO --init-model LG -pre train_plant.GTR20

	# step 3: extract the resulting reversible matrix
	grep -A 21 "can be used as input for IQ-TREE" train_plant.GTR20.iqtree | tail -n20 > Q.plant