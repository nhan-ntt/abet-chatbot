Recipes
Estimating gene, site, and quartet concordance vectors

### Introduction

This recipe provides a worked example of estimating gene, site, and quartet concordance vectors using IQ-TREE2 and ASTRAL-III, beginning with a set of individual locus alignments. A concordance vector consists of four numbers, which include the concordance factor and three other numbers describing all the discordant trees:

* &#936;<sub>1</sub> (the concordance factor for the branch of interest in the species tree)
* &#936;<sub>2</sub> (the largest of the two discordance factors from a single NNI rearrangement of the branch of interest)
* &#936;<sub>3</sub> (the smallest of the two discordance factors from a single NNI rearrangement of the branch of interest)
* &#936;<sub>4</sub> (the sum of the discordance factors that do not make up &#936;<sub>2</sub> and &#936;<sub>3</sub>; note that site and quartet concordance factors always assume that this number is zero)

> Citation: this recipe accompanies the paper "[The meaning and measure of concordance factors in phylogenomics](https://doi.org/10.32942/X27617)" by Rob Lanfear and Matt Hahn. Please cite that paper if you use this recipe. This article also describes concordance vectors in a lot more detail.