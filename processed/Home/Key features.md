Introduction

### Key features

* __Efficient search algorithm__: Fast and effective stochastic algorithm to reconstruct phylogenetic trees by maximum likelihood. IQ-TREE compares favorably to RAxML and PhyML in terms of likelihood while requiring similar amount of computing time ([Nguyen et al., 2015]).
* __Ultrafast bootstrap__: An ultrafast bootstrap approximation (UFBoot) to assess branch supports. UFBoot is 10 to 40 times faster than RAxML rapid bootstrap and obtains less biased support values ([Minh et al., 2013]; [Hoang et al., 2018]).
* __Ultrafast model selection__: An ultrafast and automatic model selection (ModelFinder) which is 10 to 100 times faster than jModelTest and ProtTest. ModelFinder also finds best-fit partitioning scheme like PartitionFinder ([Kalyaanamoorthy et al., 2017]).
* __Simulating sequences__: A fast sequence alignment simulator (AliSim) which is much more realistic than Seq-Gen and INDELible ([Ly-Trong et al., 2023]). 
* __Big Data Analysis__: Supporting huge datasets with thousands of sequences or millions of alignment sites via [checkpointing](Command-Reference#checkpointing-to-resume-stopped-run), safe numerical and low memory mode. [Multicore CPUs](Tutorial#utilizing-multi-core-cpus) and [parallel MPI system](Compilation-Guide#compiling-mpi-version) are utilized to speedup analysis.
* __Phylogenetic testing__: Several fast branch tests like SH-aLRT and aBayes test ([Anisimova et al., 2011]) and tree topology tests like the approximately unbiased (AU) test ([Shimodaira, 2002]).


The strength of IQ-TREE is the availability of a wide variety of phylogenetic models:

* __Common models__: All [common substitution models](Substitution-Models) for DNA, protein, codon, binary and morphological data with [rate heterogeneity among sites](Substitution-Models#rate-heterogeneity-across-sites) and [ascertainment bias correction](Substitution-Models#ascertainment-bias-correction) for e.g. SNP data.
* __[Partition models](Complex-Models#partition-models)__: Allowing individual models for different genomic loci (e.g. genes or codon positions), mixed data types, mixed rate heterogeneity types, linked or unlinked branch lengths between partitions.
* __Mixture models__: [fully customizable mixture models](Complex-Models#mixture-models) and [empirical protein mixture models](Substitution-Models#protein-mixture-models) and.
* __Polymorphism-aware models__: Accounting for *incomplete lineage sorting* to infer species tree from genome-wide population data ([Schrempf et al., 2016]).