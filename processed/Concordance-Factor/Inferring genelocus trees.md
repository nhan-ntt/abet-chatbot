Concordance Factor

Since IQ-TREE 2, we provide two measures for quantifying genealogical concordance in phylogenomic datasets: the gene concordance factor (gCF) and the site concordance factor (sCF). For every branch of a reference tree, gCF is defined as the percentage of “decisive” gene trees containing that branch. gCF is already in wide usage, but here we allow to calculate gCF while correctly accounting for variable taxon coverage among the gene trees. sCF is defined as the percentage of decisive alignment sites supporting a branch in the reference tree. sCF is a novel measure that is particularly useful when individual gene alignments are relatively uninformative, such that gene trees are uncertain. gCF and sCF complement classical measures of branch support (e.g. bootstrap) in phylogenetics by providing a full description of underlying disagreement among loci and sites.

If you use this feature please cite: 

__Minh B.Q., Hahn M.W., Lanfear R.__ (2020) New methods to calculate concordance factors for phylogenomic datasets. _Molecular Biology and Evolution_, 37:2727–2733. <https://doi.org/10.1093/molbev/msaa106>

For sCF we recommend that you use the more accurate version of sCF based on maximum likelihood (`--scfl` option instead of `--scf`) that is available since IQ-TREE v2.2.2. In that case please cite:

__Mo Y.K., Lanfear R., Hahn M.W., and Minh B.Q.__ (2022) Updated site concordance factors minimize effects of homoplasy and taxon sampling. _Bioinformatics_, in press. <https://doi.org/10.1093/bioinformatics/btac741>

> HINT: See [very nice tips on how to use and interpret concordance factors](http://www.robertlanfear.com/blog/files/concordance_factors.html) written by Rob Lanfear.
{: .tip}

### Inferring gene/locus trees

We now construct a set of gene/locus trees. One can manually do a for-loop, but IQ-TREE 2 provides a new convenient option `-S` to compute individual locus trees given a partition file or a directory:

	iqtree2 -s ALN_FILE -S PARTITION_FILE --prefix loci -T AUTO
	# or
	iqtree2 -S ALN_DIR --prefix loci -T AUTO

In the second case, IQ-TREE automatically detects that `ALN_DIR` is a directory and will load all alignment files within the directory. So `-S` takes the same argument as `-p` except that it performs model selection (ModelFinder) and tree inference separately for each partition/alignment. The output files are similar to those from a partitioned analysis, except that `loci.treefile` now contains a set of trees.