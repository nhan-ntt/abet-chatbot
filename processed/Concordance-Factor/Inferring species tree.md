Concordance Factor

Since IQ-TREE 2, we provide two measures for quantifying genealogical concordance in phylogenomic datasets: the gene concordance factor (gCF) and the site concordance factor (sCF). For every branch of a reference tree, gCF is defined as the percentage of “decisive” gene trees containing that branch. gCF is already in wide usage, but here we allow to calculate gCF while correctly accounting for variable taxon coverage among the gene trees. sCF is defined as the percentage of decisive alignment sites supporting a branch in the reference tree. sCF is a novel measure that is particularly useful when individual gene alignments are relatively uninformative, such that gene trees are uncertain. gCF and sCF complement classical measures of branch support (e.g. bootstrap) in phylogenetics by providing a full description of underlying disagreement among loci and sites.

If you use this feature please cite: 

__Minh B.Q., Hahn M.W., Lanfear R.__ (2020) New methods to calculate concordance factors for phylogenomic datasets. _Molecular Biology and Evolution_, 37:2727–2733. <https://doi.org/10.1093/molbev/msaa106>

For sCF we recommend that you use the more accurate version of sCF based on maximum likelihood (`--scfl` option instead of `--scf`) that is available since IQ-TREE v2.2.2. In that case please cite:

__Mo Y.K., Lanfear R., Hahn M.W., and Minh B.Q.__ (2022) Updated site concordance factors minimize effects of homoplasy and taxon sampling. _Bioinformatics_, in press. <https://doi.org/10.1093/bioinformatics/btac741>

> HINT: See [very nice tips on how to use and interpret concordance factors](http://www.robertlanfear.com/blog/files/concordance_factors.html) written by Rob Lanfear.
{: .tip}

### Inferring species tree

First, you need to infer a reference tree (e.g. a species tree), on which the concordance factors will be annotated. The species tree can be reconstructed by a concatenation/supermatrix approach or a coalescent/reconciliation/supertree approach. Here, we will use the concatenation approach in IQ-TREE. 

As an example, you can apply an [edge-linked proportional partition model](Complex-Models) with ultrafast bootstrap (1000 replicates; for comparison with concordance factors):

	iqtree2 -s ALN_FILE -p PARTITION_FILE --prefix concat -B 1000 -T AUTO

where `ALN_FILE` and `PARTITION_FILE` are your input files. `-T AUTO` is to detect the best number of CPU cores. Here we use a prefix `concat`, so that all output files (`concat.*`) do not interfere with analyses below. If `--prefix` is omitted, all output files will be `PARTITION_FILE.*`.

Moreover, IQ-TREE 2 provides a new convenient feature: if you have a directory with many (locus) alignments, you can specify this directory directly with `-p` option:

	iqtree2 -p ALN_DIR --prefix concat -B 1000 -T AUTO
	
IQ-TREE detects if `-p` argument is a directory and automatically load all alignment files and concatenate them into a supermatrix for the partition analysis.