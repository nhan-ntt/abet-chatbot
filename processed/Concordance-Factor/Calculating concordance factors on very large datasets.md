Concordance Factor

Since IQ-TREE 2, we provide two measures for quantifying genealogical concordance in phylogenomic datasets: the gene concordance factor (gCF) and the site concordance factor (sCF). For every branch of a reference tree, gCF is defined as the percentage of “decisive” gene trees containing that branch. gCF is already in wide usage, but here we allow to calculate gCF while correctly accounting for variable taxon coverage among the gene trees. sCF is defined as the percentage of decisive alignment sites supporting a branch in the reference tree. sCF is a novel measure that is particularly useful when individual gene alignments are relatively uninformative, such that gene trees are uncertain. gCF and sCF complement classical measures of branch support (e.g. bootstrap) in phylogenetics by providing a full description of underlying disagreement among loci and sites.

If you use this feature please cite: 

__Minh B.Q., Hahn M.W., Lanfear R.__ (2020) New methods to calculate concordance factors for phylogenomic datasets. _Molecular Biology and Evolution_, 37:2727–2733. <https://doi.org/10.1093/molbev/msaa106>

For sCF we recommend that you use the more accurate version of sCF based on maximum likelihood (`--scfl` option instead of `--scf`) that is available since IQ-TREE v2.2.2. In that case please cite:

__Mo Y.K., Lanfear R., Hahn M.W., and Minh B.Q.__ (2022) Updated site concordance factors minimize effects of homoplasy and taxon sampling. _Bioinformatics_, in press. <https://doi.org/10.1093/bioinformatics/btac741>

> HINT: See [very nice tips on how to use and interpret concordance factors](http://www.robertlanfear.com/blog/files/concordance_factors.html) written by Rob Lanfear.
{: .tip}

### Calculating concordance factors on very large datasets

If you have a dataset which takes a long time to analyse on your machine, there are a couple of adjustments you can make to the above process to keep things as fast as possible. 

Specifically, because the new version of the site concordance factor uses likelihoods, we can make sure to re-use as much information as possible. 

So, suppose that in the first step of the analysis you ran the command as above:

	iqtree2 -s ALN_FILE -p PARTITION_FILE --prefix concat -B 1000 -T AUTO

That command will have figured out for you the model of evolution, all the parameters of that model, and the branch lengths of the corresponding tree. We can re-use all of that useful information in the final step. It just takes a little bit of effort to find what you need.

First we'll get the model parameters we need. If you take a look at the end of the `concat.iqtree` file you will find a little section called `ALISIM COMMAND`. You can find it like this on mac/linux (or just open the `concat.iqtree` file in a text editor and scroll to the end:

	tail concat.iqtree

You should see something like this:

	ALISIM COMMAND
	--------------
	--alisim simulated_MSA -t concat.treefile -m "Q.plant+I{0.177536}+R8{0.147295,0.0935335,0.114418,0.190578,0.108376,0.538389,0.113777,0.804005,0.0898871,1.30004,0.137297,1.95653,0.0958285,3.48597,0.0155849,6.09904}" --length 432014

That bit after the `-m` (not including the `--length` stuff) is what you need to specify the Maximum Likelihood model parameters when you run the `--scfl` command. Note that it's vital that you use the model from YOUR analysis, not the example provided here. (That's why this bit is an a longer and more detailed section at the end of the tutorial.)

We also want to re-use the branch lengths we calculated in step 1, and we can do that easily with the `-blfix` option.

To put all of that together, we are going to change the final command of the tutorial above, where we calculate the site concordance factors from one of these two options (depending on if your alignments are per-locus, or all concatentated):


	# simple command, with per-locus alignments
	# compute site concordance factor using likelihood with v2.2.2
	iqtree2 -te concat.treefile -p ALN_DIR --scfl 100 --prefix concord2

	# simple command, with concatenated alignments
	# compute site concordance factor using likelihood with v2.2.2
	iqtree2 -te concat.treefile -s ALN_FILE --scfl 100 --prefix concord2

To one of these, where we add the two extra commands via `-blfix` and `-m`, to fix all the parameters we already calculated. A reminder - do NOT use the exact commandlines above. You have to replace everything after the `-m` with what you found in your own `concat.iqtree` file:

	# faster analysis, using pre-computed model parameters, with per-locus alignments
	# compute site concordance factor using likelihood with v2.2.2
	iqtree2 -te concat.treefile -p ALN_DIR --scfl 100 --prefix concord2 -blfix -m "Q.plant+I{0.177536}+R8{0.147295,0.0935335,0.114418,0.190578,0.108376,0.538389,0.113777,0.804005,0.0898871,1.30004,0.137297,1.95653,0.0958285,3.48597,0.0155849,6.09904}"

	# faster analysis, using pre-computed model parameters, with concatenated alignments
	# compute site concordance factor using likelihood with v2.2.2
	iqtree2 -te concat.treefile -s ALN_FILE --scfl 100 --prefix concord2 -blfix -m "Q.plant+I{0.177536}+R8{0.147295,0.0935335,0.114418,0.190578,0.108376,0.538389,0.113777,0.804005,0.0898871,1.30004,0.137297,1.95653,0.0958285,3.48597,0.0155849,6.09904}"

All this does is tells IQ-TREE to use the model parameters and branch lengths you already calculated. On large datasets this can save a lot of analysis time.

[Mo et al., 2022]: https://doi.org/10.1093/bioinformatics/btac741