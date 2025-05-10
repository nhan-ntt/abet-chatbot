Estimating amino acid substitution models

Amino acid substitution models are a key component in phylogenetic analyses of protein sequences. Most, if not all, analyses use [empirical amino-acid models](Substitution-Models#protein-models), which were obtained from protein databases; but there has been no useful tool to estimate them for modern datasets at hand. Therefore, we introduced QMaker ([Minh et al., 2021]) as a fast and convenient tool as part of IQ-TREE version 2 to infer a replacement matrix Q for any set of protein alignments. 

If you use QMaker or new models (Q.pfam, Q.plant, Q.mammal, Q.bird, Q.insect, Q.yeast), please cite:

>  Bui Quang Minh, Cuong Cao Dang, Le Sy Vinh, and Robert Lanfear (2021), QMaker: Fast and Accurate Method to Estimate Empirical Models of Protein Evolution. _Systematic Biology_ 70: 1046–1060. <https://doi.org/10.1093/sysbio/syab010>

### Estimating linked exchangeabilities

Starting with version 2.3.5, IQ-TREE allows users to estimate linked exchangeabilities under [profile mixture models](Substitution-Models#protein-mixture-models).

To start with, we show an example:

    iqtree2 -s <alignment> -m GTR20+C60+G4 --link-exchange -te  <guide_tree> -me 0.99

Here, IQ-TREE applies a (freely-estimated) 20x20 rate matrix `GTR20` with the
[profile mixture model](Substitution-Models#protein-mixture-models) `C60` (other model such as C10 can also be used) and Gamma rate heterogeneity across sites. The option `--link-exchange` tells
IQ-TREE to link GTR20 rates across all 60 mixture classes: without this option
IQ-TREE will estimate 60 GTR20 matrices!

The other options are not mandatory but meant to speed up this process:

* `-te` option is to provide a _guide tree_, which is fixed throughout the estimation. This guide tree can be obtained previously from, for example, LG+C60+G or the simpler LG+G. Without this option, IQ-TREE will invoke a full tree search intertwined with model estimation, which may become very time consuming for large datasets.

* `-me 0.99` is to set the log-likelihood difference threshold of determining convergence: higher value will make the optimisation faster. Simulations have shown that changing this parameter has no significant effect on exchangeability estimation.


This command will produce an output file with suffix `.GTRPMIX.nex`. This file contains the optimized exchangeabilities in NEXUS format, that can be applied in later analyses (without re-estimating them) to reconstruct a tree, for example:

    iqtree2 -s <alignment> -mdef <.GTRPMIX.nex file> -m GTRPMIX+C60+G4


The optimizer in IQ-TREE by default initializes exchangeability rates to be all equal, which are the least biased but may make the subsequent optimization quite slow. If users have a good guess of the rate values, the option `--init-exchange` can be used. For example, `--init-exchange LG` will intialize the exchangeability to that
of the LG model before optimization. Choosing good starting values can make estimation considerably faster. Apart from LG, users can specify any matrix, including those defined by the `-mdef` option with a [NEXUS model file](Complex-Models#nexus-model-file). Another use of this option is to _test the robustness_ of the optimizer with different starting points.

Note that the user can estimate exchangeabilities jointly with weights of the profiles, branch lengths, and rates. This can be very time-consuming. If the goal is to optimize exchangeabilities, one can fix the other parameters to reasonable estimates (for eg. fixing branch lengths and rates has been shown to perform adequately for the estimation of exchangeabilities).

Because these routines can be computationally expensive, two exchangeability matrices estimated from large concatenated phylogenomic-supermatrices under the C60 profile mixture model are provided to be used for phylogenetic analyses. One, called Eukaryotic Linked Mixture (ELM), is designed for phylogenetic analysis of proteins encoded by nuclear genomes of eukaryotes, and the other, Eukaryotic and Archeal Linked mixture (EAL), for reconstructing relationships between eukaryotes and Archaea, see [Protein models](Substitution-Models#protein-models).

If you use this routine in a publication please cite:

> __H. Banos et al.__ (2024) GTRpmix: A linked general-time reversible model for profile mixture models. _BioRxiv_. <https://doi.org/10.1101/2024.03.29.587376>


[Dang et al., 2022]: https://doi.org/10.1093/sysbio/syac007
[Minh et al., 2021]: https://doi.org/10.1093/sysbio/syab010
[Naser-Khdour et al., 2021]: https://doi.org/10.1093/sysbio/syab067
[El-Gebali et al., 2018]: https://doi.org/10.1093/nar/gky995
[Duchêne et al., 2019]: https://doi.org/10.1093/molbev/msz291
[Ran et al., 2018]: https://doi.org/10.1098/rspb.2018.1012