Complex models
Complex models such as partition and mixture models.

This document gives detailed descriptions of complex maximum-likelihood models available in IQ-TREE. It is assumed that you know the [basic substitution models](Substitution-Models) already.

### Multitree models

Hundreds or thousands of loci are now routinely used in modern phylogenomic studies. Concatenation approaches to tree inference assume that there is a single topology for the entire dataset, but different loci may have different evolutionary histories due to incomplete lineage sorting, introgression, and/or horizontal gene transfer; even single loci may not be treelike due to recombination. To overcome this shortcoming, we introduce the mixture across sites and trees (MAST) model, which uses a mixture of bifurcating trees to represent multiple histories in a single concatenated alignment. The MAST model allows each tree to have its own topology, branch lengths, substitution model, nucleotide or amino acid frequencies, and model of rate heterogeneity across sites.

We applied the MAST model to multiple primate datasets and found that it can recover the signal of incomplete lineage sorting in the Great Apes, as well as the asymmetry in minor trees caused by introgression among several macaque species. When applied to a dataset of four Platyrrhine species for which standard concatenated maximum likelihood and gene tree approaches disagree, we find that MAST gives the highest weight to the tree favored by gene tree approaches. These results suggest that the MAST model is able to analyse a concatenated alignment using maximum likelihood, while avoiding some of the biases that come with assuming there is only a single tree. The MAST model can therefore offer unique biological insights when applied to datasets with multiple evolutionary histories.


If you use this model in a publication please cite:

> __T.K.F. Wong, C. Cherryh, A.G. Rodrigo, M.W. Hahn, B.Q. Minh and R. Lanfear__ (2024) MAST: Phylogenetic Inference with Mixtures Across Sites and Trees. _Syst. Biol._ <https://doi.org/10.1093/sysbio/syae008>


Quick usage


> ** WARNING: Always check that your models make sense before you interpret the things you are interested in
> Of course, you should *always* do this anyway, but we put this warning here because multitree mixture models are new, somewhat complex, and may be easy to over-parameterise. So, if you are using these models for your research, please keep your biological head screwed on, and before interpreting any output (e.g. the weights of the classes in the mixture) check that the branch lengths of the trees look sensible, that the model parameters (e.g. base frequencies, transition rates, rates across sites) look sensible. Remember that if you are going to interpret any part of the model, you are also putting your faith in all of the other parameters.


Starting with version 2.3.0, the MAST model can be executed by adding `+T` to the model option (`-m`) and providing a newick file with multiple trees by the option (`-te`). For example if one wants to fit a MAST model with different topologies contained in `trees.nwk` in conjunction with the `GTR` model to sequences in `data.fst`, one would use the following command:

    iqtree2 -s data.fst -m "GTR+T" -te trees.nwk

The above command will *link* GTR parameters across all the trees. That means all trees will have the same GTR model. IQ-TREE will check the number of trees inside the newick file, and then estimate the model parameters and the weights of each tree: the proportion of sites belonging to each tree.

An example of the newick file with 3 topologies:

	((A,B),(C,D));
	((A,C),(B,D));
	((A,D),(B,C));

You can also link the GTR parameters, frequency array, and the rate-heterogeneity-across-site (RHAS) model across all the trees by including the frequency and the RHAS model in the model option (`-m`). For example:

    iqtree2 -s data.fst -m "GTR+FO+G+T" -te trees.nwk
    
If one would like to have *unlink* components across the trees (for example, each tree has its own substitution model, frequency array and RHAS model), one can specify the unlinked components via the `TMIX` keyword in the model string. For example:

    iqtree2 -s data.fst -m "TMIX{GTR+FO+G,F81+FO+R3,HKY+FO+I}+T" -te trees.nwk

The above command specifies the `GTR+FO+G` model for the first topology (inside the newick file), the `F81+FO+R3` model for the second topology, and the `HKY+FO+I` model for the third topology. These components are given in curly brackets and separated with a comma. Note that the number of components has to match with the number of topologies in the newick file.

There is a flexibility to set substitution model, frequencies or RHAS model *linked* or *unlinked* separately. The followings show some examples of different situations, assuming there are 2 topologies in the newick file:


| | Model option | Linked parameters | Description |
| -- | ------ | ------------ | ----------- |
| 1 | `"TMIX{GTR+FO+G,GTR+FO+G}+T"` | &#x2718;&nbsp;subst<br>&#x2718;&nbsp;freq<br>&#x2718;&nbsp;RHAS | Each tree has its own GTR model, DNA frequencies and gamma model |
| 2 | `"TMIX{GTR+FO,GTR+FO}+G+T"` | &#x2718;&nbsp;subst<br>&#x2718;&nbsp;freq<br>&#x2714;&nbsp;RHAS | Each tree has its own GTR model and DNA frequencies but all share the same gamma model |
| 3 | `"TMIX{GTR+F+G,GTR+F+G}+T"` | &#x2718;&nbsp;subst<br>&#x2714;&nbsp;freq<br>&#x2718;&nbsp;RHAS | Each tree has its own GTR model and gamma model, but all DNA frequencies are set to the frequencies of A,C,G,T in the alignment |
| 4 | `"TMIX{GTR+F,GTR+F}+G+T"` | &#x2718;&nbsp;subst<br>&#x2714;&nbsp;freq<br>&#x2714;&nbsp;RHAS | Each tree has its own GTR model, but all share the same gamma model and all DNA frequencies are set to the frequencies of A,C,G,T in the alignment |
| 5 | `"GTR+FO+TMIX{G,G}+T"` | &#x2714;&nbsp;subst<br>&#x2714;&nbsp;freq<br>&#x2718;&nbsp;RHAS | Each tree has its own gamma model, but all share the same GTR model and DNA frequencies |
| 6 | `"GTR+FO+G+T"` | &#x2714;&nbsp;subst<br>&#x2714;&nbsp;freq<br>&#x2714;&nbsp;RHAS | All trees share the same GTR model, DNA frequencies and gamma model |

Note: subst - substitution model; freq - DNA/AA frequency array; RHAS - rate heterogeneity across site model

More usages

**Branch-length-restricted MAST model**

One can use `+TR` instead of `+T` to represent the branch-length-Restricted MAST model.
In this model, the length of branch `x` of a tree <code>T<sub>i</sub></code> is constrained to be equal to the length of branch `y` of a tree <code>T<sub>j</sub></code> if the branches `x` and `y` split the trees <code>T<sub>i</sub></code> and <code>T<sub>j</sub></code> into the same two sets of taxa. For example:

	iqtree2 -s data.fst -m "GTR+FO+G+TR" -te trees.nwk

In the above command, all trees share the same GTR model, DNA frequencies and gamma model, and the lengths of the branches across the trees which split the taxa set into the same partition are restricted the same.

**Weight-constrained MAST model**

One can define a constraint array following `+T` to restrict the tree weights. The constraint array can be defined as <code>[s<sub>1</sub>,s<sub>2</sub>,...,s<sub>n</sub>]</code> where <code>s<sub>i</sub></code> can be any string. The weight of tree <code>T<sub>i</sub></code> and that of tree <code>T<sub>j</sub></code> are restricted the same value if <code>s<sub>i</sub> = s<sub>j</sub></code>. For example, assuming there are 3 topologies in the newick file:

	iqtree2 -s data.fst -m "GTR+FO+G+T[x,x,y]" -te trees.nwk

In the above command, all trees share the same GTR model, DNA frequencies and gamma model, and the weight of the first tree is constrained as the same as the weight of the second tree.

More explanations on the results

| File | Description |
| ---- | ----------- |
| `.treefile` | By using the MAST model, IQ-TREE will report multiple trees inside this file. Their topologies should match the input topologies in the newick file. |
| `.iqtree` | All the estimated model parameters for each tree and the tree weights (i.e. proportions of the sites belonging to the tree and the model) are shown in this file. The order of the tree weights follows the order of the input topologies in the newick file. |

Please note that, in any MAST model with more than one substitution model (i.e. models 1 - 5 in the previous table), the weights can only be interpreted as the linked weight of the model and the tree. So the weights are not unique to the tree. In other words, IQ-TREE will report the weights pertaining only to the trees for the model 6 in the previous table. 

[Brown et al. (2013)]: https://doi.org/10.1098/rspb.2013.1755
[Lartillot and Philippe, 2004]: https://doi.org/10.1093/molbev/msh112
[Le et al., 2008a]: https://doi.org/10.1093/bioinformatics/btn445
[Le et al., 2012]: https://doi.org/10.1093/molbev/mss112
[Lopez et al., 2002]: http://mbe.oxfordjournals.org/content/19/1/1.full
[Wang et al., 2008]: https://doi.org/10.1186/1471-2148-8-331