Concordance Factor

Since IQ-TREE 2, we provide two measures for quantifying genealogical concordance in phylogenomic datasets: the gene concordance factor (gCF) and the site concordance factor (sCF). For every branch of a reference tree, gCF is defined as the percentage of “decisive” gene trees containing that branch. gCF is already in wide usage, but here we allow to calculate gCF while correctly accounting for variable taxon coverage among the gene trees. sCF is defined as the percentage of decisive alignment sites supporting a branch in the reference tree. sCF is a novel measure that is particularly useful when individual gene alignments are relatively uninformative, such that gene trees are uncertain. gCF and sCF complement classical measures of branch support (e.g. bootstrap) in phylogenetics by providing a full description of underlying disagreement among loci and sites.

If you use this feature please cite: 

__Minh B.Q., Hahn M.W., Lanfear R.__ (2020) New methods to calculate concordance factors for phylogenomic datasets. _Molecular Biology and Evolution_, 37:2727–2733. <https://doi.org/10.1093/molbev/msaa106>

For sCF we recommend that you use the more accurate version of sCF based on maximum likelihood (`--scfl` option instead of `--scf`) that is available since IQ-TREE v2.2.2. In that case please cite:

__Mo Y.K., Lanfear R., Hahn M.W., and Minh B.Q.__ (2022) Updated site concordance factors minimize effects of homoplasy and taxon sampling. _Bioinformatics_, in press. <https://doi.org/10.1093/bioinformatics/btac741>

> HINT: See [very nice tips on how to use and interpret concordance factors](http://www.robertlanfear.com/blog/files/concordance_factors.html) written by Rob Lanfear.
{: .tip}

### Putting it all together

If you have separate alignments for each locus in a folder, then perform the following commands:

	# infer a concatenation-based species tree with 1000 ultrafast bootstrap and an edge-linked partition model
	iqtree2 -p ALN_DIR --prefix concat -B 1000 -T AUTO
	
	# infer the locus trees
	iqtree2 -S ALN_DIR --prefix loci -T AUTO
	
	# compute gene concordance factors
	iqtree2 -t concat.treefile --gcf loci.treefile --prefix concord
	
	# compute site concordance factor using likelihood with v2.2.2
	iqtree2 -te concat.treefile -p ALN_DIR --scfl 100 --prefix concord2

If you have a single concatenated alignment with a partition file that defines loci:

	# infer a concatenation-based species tree with 1000 ultrafast bootstrap and an edge-linked partition model
	iqtree2 -s ALN_FILE -p PARTITION_FILE --prefix concat -B 1000 -T AUTO

	# infer the locus trees
	iqtree2 -s ALN_FILE -S PARTITION_FILE --prefix loci -T AUTO

	# compute gene concordance factors
	iqtree2 -t concat.treefile --gcf loci.treefile --prefix concord
	
	# compute site concordance factor using likelihood with v2.2.2
	iqtree2 -te concat.treefile -s ALN_FILE --scfl 100 --prefix concord2
	

Note that you can adjust `-T 10` if you have fewer/larger CPU cores.