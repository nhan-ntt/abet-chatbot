Concordance Factor

Since IQ-TREE 2, we provide two measures for quantifying genealogical concordance in phylogenomic datasets: the gene concordance factor (gCF) and the site concordance factor (sCF). For every branch of a reference tree, gCF is defined as the percentage of “decisive” gene trees containing that branch. gCF is already in wide usage, but here we allow to calculate gCF while correctly accounting for variable taxon coverage among the gene trees. sCF is defined as the percentage of decisive alignment sites supporting a branch in the reference tree. sCF is a novel measure that is particularly useful when individual gene alignments are relatively uninformative, such that gene trees are uncertain. gCF and sCF complement classical measures of branch support (e.g. bootstrap) in phylogenetics by providing a full description of underlying disagreement among loci and sites.

If you use this feature please cite: 

__Minh B.Q., Hahn M.W., Lanfear R.__ (2020) New methods to calculate concordance factors for phylogenomic datasets. _Molecular Biology and Evolution_, 37:2727–2733. <https://doi.org/10.1093/molbev/msaa106>

For sCF we recommend that you use the more accurate version of sCF based on maximum likelihood (`--scfl` option instead of `--scf`) that is available since IQ-TREE v2.2.2. In that case please cite:

__Mo Y.K., Lanfear R., Hahn M.W., and Minh B.Q.__ (2022) Updated site concordance factors minimize effects of homoplasy and taxon sampling. _Bioinformatics_, in press. <https://doi.org/10.1093/bioinformatics/btac741>

> HINT: See [very nice tips on how to use and interpret concordance factors](http://www.robertlanfear.com/blog/files/concordance_factors.html) written by Rob Lanfear.
{: .tip}

### Gene concordance factor (gCF)

Given the species tree `concat.treefile` and the set of locus trees `loci.treefile` computed above, you can calculate gCF for each branch of the species tree as the fraction of decisive gene trees concordant with this branch:

	iqtree2 -t concat.treefile --gcf loci.treefile --prefix concord
 	
Note that `-t` accepts any reference tree (e.g., by coalescent/reconciliation approach) and `--gcf` accepts any set of trees (e.g. locus trees and bootstrap trees), which may contain a subset of taxa from the reference tree. IQ-Tree will write three files:

* `concord.cf.tree`: Newick tree with gCF assigned for each internal branch of the reference tree. If the reference tree already has some branch label (such as bootstrap support in this case), gCF will be appended to the existing label separated by a `/`.
* `concord.cf.branch`: Newick tree with internal branch IDs.
* `concord.cf.stat`: A tab-separated table with gCF and gDF (gene discordance factor) for every internal branch (rows of the table). The ID column can be linked with `concord.cf.branch` file. This file can be read in R to do some plot (see below).

If you omit `--prefix`, all output files will be written to `concat.treefile.*`.