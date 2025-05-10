Recipes
Estimating gene, site, and quartet concordance vectors

### Estimating the species tree

You should estimate your species tree using whatever the best approach is for your data, for example a joint Bayesian analysis using BEAST or *BEAST, a two-step analysis e.g. using ASTRAL, or a concatentated analysis using IQ-TREE or RAxML. You may also have a species tree that has already been estimated elsewhere, and just want to map the concordance vectors onto that. In that case, you can skip this step. 

For the purposes of this tutorial, we'll follow the original paper on bird phylogenomics and use ASTRAL to estimate the species tree from the gene trees we just estimated. Note that in the original paper they collapse some branches in the single-locus trees that have low aLRT (approximate Likelihood Ratio Test: a way of asking whether a branch has a length that differs significantly from zero) scores, but we skip that here for simplicity. This analysis will take just a few minutes.

> Here we just calculate the species tree, we'll calculate concordance vectors and branch support values later

```bash
astral -i loci.treefile -o astral_species.tree 2> astral_species.log
```

This analysis will produce two files. For convenience you can download these here: 
[astral.zip](https://github.com/user-attachments/files/15907833/astral.zip)


* `astral_species.tree`: the species tree estimated from ASTRAL (this might be quite different to the tree in the paper, because we used only 400 genes, not the full set of more than 63000!)
* `astral_species.log`: the log file from ASTRAL