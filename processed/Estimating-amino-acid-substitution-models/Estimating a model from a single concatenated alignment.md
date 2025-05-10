Estimating amino acid substitution models

Amino acid substitution models are a key component in phylogenetic analyses of protein sequences. Most, if not all, analyses use [empirical amino-acid models](Substitution-Models#protein-models), which were obtained from protein databases; but there has been no useful tool to estimate them for modern datasets at hand. Therefore, we introduced QMaker ([Minh et al., 2021]) as a fast and convenient tool as part of IQ-TREE version 2 to infer a replacement matrix Q for any set of protein alignments. 

If you use QMaker or new models (Q.pfam, Q.plant, Q.mammal, Q.bird, Q.insect, Q.yeast), please cite:

>  Bui Quang Minh, Cuong Cao Dang, Le Sy Vinh, and Robert Lanfear (2021), QMaker: Fast and Accurate Method to Estimate Empirical Models of Protein Evolution. _Systematic Biology_ 70: 1046–1060. <https://doi.org/10.1093/sysbio/syab010>

### Estimating a model from a single concatenated alignment

We first demonstrate the estimation of a reversible model for a clade-specific dataset. Please download and extract the [sample training data](data/plant_10loci.zip). This example data was subsampled from a plant dataset ([Ran et al., 2018]). There are two files in the downloaded folder: 

* `alignment.nex` contains the alignment in NEXUS format.
* `train.nex` contains the training partitions  in NEXUS format.

The estimation (training) then can be accomplished with three commands in IQ-TREE. The first command is:

	# step 1: infer an single edge-linked tree with reversible models as initial models
	iqtree2 --seed 1 -T AUTO -s alignment.nex -p train.nex -m MFP -mset LG,WAG,JTT -cmax 4 --prefix train_plant

- `-seed 1` sets the random seed.
- `-T AUTO` sets the number of computing threads to automatically detection, `-T 10` will let IQ-TREE utilize up to 10 CPU threads.
- `-s alignment.nex` specifies the NEXUS file containing the concatenated alignment.
- `-p train.nex` specifies the NEXUS file containing the training loci, `-p` option will estimate an edge-linked partition model with a single tree topology shared across all loci. This -p option is typically used with concatenation tree estimation that assumes a single species tree but rescale the branch lengths of the locus trees. It was shown to perform best among other partition models ([Duchêne et al., 2019]).
Note: If you don't have the partition file `train.nex`, simply ignore the `-p` option.
- `-mset LG,WAG,JTT` defines the initial candidate matrices to reduce computational burden.
- `-cmax 4` restricts up to four categories for the rate heterogeneity across sites.
- `--prefix train_plant` or `-pre train_plant` sets the name of the output files. 

This will run ModelFinder to find the best model for each loci. The best models and the best trees will be saved to `train_plant.best_model.nex` and to `train_plant.treefile`, respectively. These two files will be used as the input for the second command that estimate a join reversible matrix:

	# step 2: estimate a join non-reversible matrix across all loci
	iqtree2 -seed 1 -T AUTO -s alignment.nex -p train_plant.best_model.nex -te train_plant.treefile --init-model LG --model-joint GTR20+FO --prefix plant_GTR20_FO
- `--init-model LG` option specifies the initial matrix
- `-p train_plant.best_model.nex` and `-te train_plant.treefile` options specify the best models and trees found in step 1.

The resulting matrix (`Q.plant`) which is included in the file `plant_GTR20_FO.iqtree` can be obtained with the command:

	# step 3: extract the resulting reversible matrix
	grep -A 21 "can be used as input for IQ-TREE" plant_GTR20_FO.iqtree | tail -n20 > Q.plant

We can  open `Q.plant` in a text viewer as below, or use with IQ-TREE (e.g. `-m Q.plant` option). The `Q.plant` is in PAML format, it contains the lower diagonal part of the AA exchange rates matrix and 20 AA frequencies.

    0.120955
    0.048462 0.458565
    0.436023 0.037551 4.799928
    0.470505 1.707355 0.338537 0.000100
    0.261114 3.736017 0.605443 0.147890 0.286279
    0.837596 0.016734 0.388965 5.815020 0.000100 4.138646
    1.939708 1.199364 0.911021 1.413132 0.681747 0.419571 0.886564
    0.232927 3.431828 4.195096 1.867861 1.850593 4.826298 0.328092 0.170808
    0.118245 0.101767 0.246939 0.041486 0.186430 0.018556 0.000100 0.000100 0.015294
    0.137216 0.190052 0.000100 0.000100 0.362263 0.642152 0.028449 0.025460 0.554159 2.930110
    0.135127 5.915805 3.499350 0.090416 0.000100 2.539190 1.229355 0.196033 0.301659 0.149798 0.013760
    0.359701 0.983896 0.049506 0.000100 0.380313 0.236000 0.389444 0.000100 0.031711 5.188215 4.848803 0.701453
    0.203942 0.034729 0.000100 0.000100 1.671509 0.000100 0.000100 0.048554 0.091040 1.015749 3.012478 0.000154 0.873360
    1.317722 0.441669 0.000100 0.128632 0.000100 1.357928 0.123957 0.048531 0.824914 0.000100 0.502828 0.122503 0.000100 0.000100
    3.425467 1.067776 4.114253 0.435618 2.788606 0.280845 0.104001 1.549784 0.361033 0.041339 0.384561 0.290811 0.188779 0.615963 2.474679
    4.260751 0.715157 2.261495 0.178679 0.000100 0.277338 0.227034 0.186275 0.000100 1.909182 0.041874 0.966718 3.385793 0.072074 0.806596 4.938908
    0.245284 0.698218 0.000100 0.000100 1.273897 0.161369 0.000100 0.405661 0.536027 0.012605 0.896675 0.000100 0.341461 0.993273 0.031731 0.131122 0.000100
    0.012568 0.009986 0.621948 0.200102 2.122422 0.031013 0.010158 0.000100 5.748250 0.031443 0.000100 0.000100 0.156847 7.335297 0.173676 0.241389 0.000100 1.228204
    2.630085 0.043992 0.071593 0.042649 0.326353 0.036449 0.277692 0.162678 0.140434 9.733184 1.730443 0.035985 1.921040 0.678498 0.149578 0.089526 0.989870 0.000100 0.234116
    
    0.076028 0.051084 0.039819 0.051496 0.012072 0.038467 0.064409 0.052997 0.017632 0.064148 0.102707 0.073142 0.019406 0.048651 0.034180 0.077354 0.046007 0.011774 0.033201 0.085428

The amino-acid order in this file is:

     A   R   N   D   C   Q   E   G   H   I   L   K   M   F   P   S   T   W   Y   V
    Ala Arg Asn Asp Cys Gln Glu Gly His Ile Leu Lys Met Phe Pro Ser Thr Trp Tyr Val