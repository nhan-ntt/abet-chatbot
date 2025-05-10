Estimating amino acid substitution models

Amino acid substitution models are a key component in phylogenetic analyses of protein sequences. Most, if not all, analyses use [empirical amino-acid models](Substitution-Models#protein-models), which were obtained from protein databases; but there has been no useful tool to estimate them for modern datasets at hand. Therefore, we introduced QMaker ([Minh et al., 2021]) as a fast and convenient tool as part of IQ-TREE version 2 to infer a replacement matrix Q for any set of protein alignments. 

If you use QMaker or new models (Q.pfam, Q.plant, Q.mammal, Q.bird, Q.insect, Q.yeast), please cite:

>  Bui Quang Minh, Cuong Cao Dang, Le Sy Vinh, and Robert Lanfear (2021), QMaker: Fast and Accurate Method to Estimate Empirical Models of Protein Evolution. _Systematic Biology_ 70: 1046–1060. <https://doi.org/10.1093/sysbio/syab010>

### Estimating a non-reversible model

QMaker assumes time-reversible models, an assumption designed for computational convenience but not for biological reality. A variant of QMaker, called nQMaker ([Dang et al., 2022]), can estimate _non-reversible_ models and _rooted_ trees from any set of protein alignments.

If you use nQMaker or any new non-reversible models (NQ.pfam, NQ.plant, NQ.mammal, NQ.bird, NQ.insect, NQ.yeast), please cite:

> Cuong Cao Dang, Bui Quang Minh, Hanon McShea, Joanna Masel, Jennifer Eleanor James, Le Sy Vinh, and Robert Lanfear (2022), nQMaker: estimating time non-reversible amino acid substitution models. Systematic Biology 71: 1110–1123. <https://doi.org/10.1101/2021.10.18.464754>


To estimate a non-reversible model for a concatenated alignment, you can use `--model-joint NONREV+FO` option instead of `--model-joint GTR20+FO`:

	# step 1: infer an single edge-linked tree with reversible models as initial models
	iqtree2 --seed 1 -T AUTO -s alignment.nex -p train.nex -m MFP -mset LG,WAG,JTT -cmax 4 --prefix train_plant
	
	# step 2: estimate a join non-reversible matrix across all loci
	iqtree2 -seed 1 -T AUTO -s alignment.nex -p train_plant.best_model.nex -te train_plant.treefile --model-joint NONREV+FO --prefix plant_NONREV_FO
	
	# step 3: extract the resulting non-reversible matrix
	grep -A 22 "can be used as input for IQ-TREE" plant_NONREV_FO.iqtree | tail -n21 > NQ.plant

The resulting `NQ.plant` matrix may now look like:

    -1.061624 0.007785 0.002655 0.022039 0.006589 0.014742 0.062839 0.090131 0.001704 0.002323 0.003087 0.001751 0.012195 0.012809 0.041760 0.320267 0.210023 0.003323 0.000857 0.244743
    0.008289 -1.080907 0.020365 0.000987 0.026624 0.177551 0.001802 0.086672 0.075705 0.009088 0.021643 0.491866 0.024868 0.000653 0.006541 0.072228 0.039720 0.013123 0.000986 0.002196
    0.004032 0.019786 -1.313687 0.267488 0.005393 0.008927 0.032858 0.067708 0.062829 0.023892 0.000094 0.252395 0.000094 0.000094 0.000094 0.438096 0.096599 0.000094 0.027919 0.005295
    0.041666 0.003896 0.227284 -0.890796 0.000094 0.000094 0.400738 0.099378 0.050443 0.002720 0.000094 0.007025 0.000094 0.000094 0.000094 0.027181 0.013001 0.000094 0.009413 0.007395
    0.051903 0.094902 0.010786 0.000094 -0.893500 0.026469 0.000094 0.037475 0.106883 0.010559 0.070577 0.000094 0.000094 0.102084 0.000094 0.236907 0.000094 0.012537 0.099632 0.032222
    0.013065 0.194182 0.039046 0.017941 0.000305 -1.075698 0.292962 0.027675 0.095402 0.001329 0.081175 0.209181 0.004369 0.000094 0.062599 0.012804 0.017520 0.000094 0.000094 0.005861
    0.064413 0.000094 0.012826 0.355911 0.000094 0.181070 -0.822679 0.053530 0.003000 0.000094 0.002512 0.097327 0.005370 0.000094 0.005713 0.002772 0.012020 0.000094 0.000094 0.025650
    0.187614 0.053999 0.033263 0.066321 0.009740 0.014380 0.058840 -0.621387 0.003268 0.000094 0.005951 0.015482 0.000094 0.000544 0.000094 0.145278 0.009973 0.000144 0.000094 0.016213
    0.033332 0.235841 0.278083 0.091410 0.023465 0.257662 0.049843 0.011802 -1.428426 0.004130 0.053383 0.021902 0.000094 0.007900 0.054172 0.039777 0.000094 0.000094 0.250585 0.014858
    0.023950 0.001632 0.004395 0.002772 0.003342 0.000717 0.000094 0.000837 0.000094 -1.493125 0.272227 0.010394 0.124246 0.059446 0.000094 0.003597 0.087965 0.000297 0.003057 0.893969
    0.026527 0.011287 0.000094 0.000094 0.002177 0.021633 0.001975 0.000094 0.012033 0.226203 -0.745614 0.000094 0.089496 0.149580 0.006638 0.026123 0.003215 0.013687 0.002033 0.152631
    0.017415 0.341123 0.171696 0.006194 0.000094 0.105871 0.089788 0.009665 0.007083 0.009163 0.002472 -0.829488 0.013473 0.000094 0.003097 0.013503 0.038477 0.000094 0.000094 0.000094
    0.000094 0.043168 0.007303 0.000094 0.011450 0.011888 0.047858 0.000094 0.004725 0.350677 0.567158 0.061171 -1.532577 0.026166 0.000094 0.027269 0.182166 0.012220 0.014137 0.164845
    0.007119 0.004300 0.000094 0.000094 0.023494 0.000094 0.002681 0.008815 0.000094 0.054752 0.348000 0.001664 0.026142 -0.836377 0.000094 0.051269 0.011247 0.006273 0.217177 0.072974
    0.115066 0.035090 0.000094 0.011471 0.000094 0.046128 0.005991 0.007020 0.013780 0.000094 0.071513 0.009870 0.000094 0.000094 -0.550036 0.167147 0.048381 0.001156 0.005462 0.011491
    0.238188 0.080851 0.127209 0.032161 0.040145 0.018437 0.014191 0.071781 0.006455 0.002646 0.050029 0.035037 0.001082 0.032565 0.125243 -1.151350 0.243892 0.000094 0.012692 0.018650
    0.361018 0.036699 0.129824 0.003747 0.000094 0.010391 0.015700 0.012775 0.000630 0.135648 0.002005 0.101363 0.080632 0.000094 0.013000 0.417972 -1.388325 0.000094 0.000094 0.066546
    0.014117 0.017973 0.000094 0.000094 0.025311 0.008866 0.000094 0.034917 0.015069 0.000094 0.068188 0.000094 0.000094 0.037263 0.000094 0.016805 0.000094 -0.251399 0.012044 0.000094
    0.000094 0.000094 0.010861 0.001684 0.031664 0.000094 0.001058 0.000094 0.132692 0.000094 0.000094 0.000094 0.000094 0.405258 0.006474 0.003214 0.000094 0.007815 -0.601659 0.000094
    0.203068 0.005150 0.004281 0.000094 0.003602 0.000454 0.018986 0.008201 0.003052 0.638676 0.198251 0.009524 0.040070 0.033033 0.008064 0.000094 0.062714 0.000094 0.007267 -1.244676

    0.076646 0.049413 0.038372 0.049451 0.010780 0.037824 0.063761 0.052468 0.015186 0.065770 0.104298 0.072672 0.019435 0.049968 0.035179 0.078294 0.045874 0.013490 0.033377 0.087742

> HINT: To assess the statistical support of the root position with bootstraping (-B 1000 option), users can use [this tutorial](Rootstrap).

To estimate a non-reversible model from a folder of alignments:

	# step 1: infer a separate tree for each alignment with reversible models as initial models
	iqtree2 -seed 1 -T AUTO -S train_plant -mset LG,WAG,JTT -cmax 4 -pre train_plant
	
	# step 2: estimate a join non-reversible matrix across all alignments
	iqtree2 -seed 1 -T AUTO -S train_plant.best_model.nex -te train_plant.treefile --model-joint NONREV+FO --init-model LG -pre train_plant.NONREV

	# step 3: extract the resulting non-reversible matrix
	grep -A 22 "can be used as input for IQ-TREE" train_plant.NONREV.iqtree | tail -n21 > NQ.plant