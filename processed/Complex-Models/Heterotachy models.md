Complex models
Complex models such as partition and mixture models.

This document gives detailed descriptions of complex maximum-likelihood models available in IQ-TREE. It is assumed that you know the [basic substitution models](Substitution-Models) already.

### Heterotachy models

Sequence data that have evolved under *heterotachy*, i.e., rate variation across sites and lineages ([Lopez, Casane, and Philippe, 2002](http://mbe.oxfordjournals.org/content/19/1/1.full)), are known to mislead phylogenetic inference ([Kolaczkowski and Thornton, 2004](https://doi.org/10.1038/nature02917)). To address this issue we introduce the General Heterogeneous evolution On a Single Topology (GHOST) model. More specifically, GHOST is an *edge-unlinked mixture model* consisting of several site classes, each having a separate set of model parameters and edge lengths on the same tree topology. Thus, GHOST naturally accounts for heterotachous evolution. In contrast to an [edge-unlinked partition model](#partition-models), the GHOST model does not require the *a priori* data partitioning, a possible source of model misspecification. 

Extensive simulations show that the GHOST model can accurately recover the tree topology, branch lengths, substitution rate and base frequency parameters from heterotachously-evolved sequences. Moreover, we compare the GHOST model to the partition model and show that, owing to the minimization of model constraints, the GHOST model is able to offer unique biological insights when applied to empirical data.


If you use this model in a publication please cite:

> __S.M. Crotty, B.Q. Minh, N.G. Bean, B.R. Holland, J. Tuke, L.S. Jermiin and A. von Haeseler__ (2019) GHOST: Recovering historical signal from heterotachously-evolved sequence alignments. *Syst. Biol.*, in press. <https://doi.org/10.1093/sysbio/syz051>



Quick usages

Make sure that you have IQ-TREE version 1.6.0 or later. The GHOST model with `k` mixture classes is executed by adding `+Hk` to the model option (`-m`). For example if one wants to fit a GHOST model with 4 classes in conjunction with the `GTR` model of DNA evolution to sequences contained in `data.fst`, one would use the following command:

    iqtree -s data.fst -m GTR+H4

By default the above command will link GTR parameters across all classes. If you want to unlink GTR parameters, so that IQ-TREE estimates them separately for each class, replace `+H4` by `*H4`: 

    iqtree -s data.fst -m GTR*H4

Note that this infers one set of empirical base frequencies and apply those to all classes. If one wishes to infer separate base frequencies for each class then the `+FO` option is required:

    iqtree -s data.fst -m GTR+FO*H4

The `-wspm` option will generate a `.siteprob` output file. This contains the probability of each site belonging to each class:

    iqtree -s data.fst -m GTR+FO*H4 -wspm