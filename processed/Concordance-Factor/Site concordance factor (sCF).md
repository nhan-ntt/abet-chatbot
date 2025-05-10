Concordance Factor

Since IQ-TREE 2, we provide two measures for quantifying genealogical concordance in phylogenomic datasets: the gene concordance factor (gCF) and the site concordance factor (sCF). For every branch of a reference tree, gCF is defined as the percentage of “decisive” gene trees containing that branch. gCF is already in wide usage, but here we allow to calculate gCF while correctly accounting for variable taxon coverage among the gene trees. sCF is defined as the percentage of decisive alignment sites supporting a branch in the reference tree. sCF is a novel measure that is particularly useful when individual gene alignments are relatively uninformative, such that gene trees are uncertain. gCF and sCF complement classical measures of branch support (e.g. bootstrap) in phylogenetics by providing a full description of underlying disagreement among loci and sites.

If you use this feature please cite: 

__Minh B.Q., Hahn M.W., Lanfear R.__ (2020) New methods to calculate concordance factors for phylogenomic datasets. _Molecular Biology and Evolution_, 37:2727–2733. <https://doi.org/10.1093/molbev/msaa106>

For sCF we recommend that you use the more accurate version of sCF based on maximum likelihood (`--scfl` option instead of `--scf`) that is available since IQ-TREE v2.2.2. In that case please cite:

__Mo Y.K., Lanfear R., Hahn M.W., and Minh B.Q.__ (2022) Updated site concordance factors minimize effects of homoplasy and taxon sampling. _Bioinformatics_, in press. <https://doi.org/10.1093/bioinformatics/btac741>

> HINT: See [very nice tips on how to use and interpret concordance factors](http://www.robertlanfear.com/blog/files/concordance_factors.html) written by Rob Lanfear.
{: .tip}

### Site concordance factor (sCF)

>**NOTE**: From version 2.2.2 IQ-TREE provides a new and more accurate sCF based on likelihood via `--scfl` option ([Mo et al., 2022]), whereas the original sCF is based on parsimony. You can download [this version from here](https://github.com/iqtree/iqtree2/releases/tag/v2.2.2).
 
Given the species tree `concat.treefile` and the alignment, you can calculate sCF for each branch of the species tree as the fraction of decisive alignment sites supporting that branch:

	# for version 2.2.2 or above
	iqtree2 -te concat.treefile -s ALN_FILE --scfl 100 --prefix concord
	# older versions
	iqtree2 -t concat.treefile -s ALN_FILE --scf 100 --prefix concord -T 10
	
`--scf` specifies the number of quartets (randomly sampled around each internal branch) for computing sCF. We recommend at least 100 quartets for stable sCF values. Note that running this command several times may lead to slightly different sCF due to randomness. To make it reproducible, you need to use `-seed` option to provide a random number generator seed.

Note that the `--scfl` option from IQ-TREE v2.2.2 will invoke model selection with ModelFinder and also tree search if you don't specify a tree with `-te` option. If you already have a best-fit model from a previous run, you can ignore ModelFinder (and thus speed up this run) by provide the model with `-m` option.

Instead of `-s`, you can alternatively provide a directory or a partition file. IQ-Tree then computes sCF for the concatenated alignment:

	# for version 2.2.2 or above
	iqtree2 -te concat.treefile -p ALN_DIR --scfl 100 --prefix concord
	# older versions
	iqtree2 -t concat.treefile -p ALN_DIR --scf 100 --prefix concord -T 10

Finally, you can combine gCF and sCF within a single run:

	# only for the original sCF
	iqtree2 -t concat.treefile --gcf loci.treefile -p ALN_DIR --scf 100 --prefix concord -T 10
	
Here, each branch of `concord.cf.tree` will be assigned (or appended) with `gCF/sCF` values and `concord.cf.stat` will be written with both gCF and sCF values.