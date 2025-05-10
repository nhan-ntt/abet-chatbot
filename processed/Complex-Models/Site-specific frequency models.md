Complex models
Complex models such as partition and mixture models.

This document gives detailed descriptions of complex maximum-likelihood models available in IQ-TREE. It is assumed that you know the [basic substitution models](Substitution-Models) already.

### Site-specific frequency models

Starting with version 1.5.0, IQ-TREE provides a new posterior mean site frequency (PMSF) model as a rapid approximation to the time and memory consuming profile mixture models `C10` to `C60` ([Le et al., 2008a]; a variant of PhyloBayes' `CAT` model). The PMSF are the amino-acid profiles for each alignment site computed from an input mixture model and a guide tree. The PMSF model is much faster and requires much less RAM than `C10` to `C60` (see table below), regardless of the number of mixture classes. Our extensive simulations and empirical phylogenomic data analyses demonstrate that the PMSF models can effectively ameliorate long branch attraction artefacts.

If you use this model in a publication please cite:

> __H.C. Wang, B.Q. Minh, S. Susko and A.J. Roger__ (2018) Modeling site heterogeneity with posterior mean site frequency profiles accelerates accurate phylogenomic estimation. _Syst. Biol._, 67:216-235. <https://doi.org/10.1093/sysbio/syx068>

Here is an example of computation time and RAM usage for an Obazoa data set (68 sequences, 43615 amino-acid sites) from [Brown et al. (2013)] using 16 CPU cores: 


| Models    | CPU time      | Wall-clock time |	RAM usage |
|-----------|--------------:|----------------:|----------:|
| `LG+F+G`     |   43h:38m:23s |   3h:37m:23s    |   1.8 GB  |
| `LG+C20+F+G` |  584h:25m:29s	|  46h:39m:06s    |	 38.8 GB  |
| `LG+C60+F+G` | 1502h:25m:31s | 125h:15m:29s    | 112.8 GB  |
| `LG+PMSF+G`  |   73h:30m:37s |    5h:7m:27s    |	  2.2 GB  |


Example usages

To use the PMSF model you have to provide a *guide tree*, which, for example, can be obtained by a quicker analysis under the simpler `LG+F+G` model. The guide tree can then be specified via `-ft` option, for example:

    iqtree -s <alignment> -m LG+C20+F+G -ft <guide_tree>

Here, IQ-TREE will perform two phases. In the first phase, IQ-TREE estimates mixture model parameters given the guide tree and then infers the site-specific frequency profile (printed to `.sitefreq` file). In the second phase, IQ-TREE will conduct typical analysis using the inferred frequency model instead of the mixture model to save RAM and running time. Note that without `-ft` option, IQ-TREE will conduct the analysis under the specified mixture model.

The PMSF model allows one, for the first time, to conduct nonparametric bootstrap under such complex models, for example (with 100 bootstrap replicates):

    iqtree -s <alignment> -m LG+C20+F+G -ft <guide_tree> -b 100


Please note that the first phase still consumes as much RAM as the mixture model. To overcome this, you can perform the first phase in a high-memory server and the second phase in a normal PC as follows:

    iqtree -s <alignment> -m LG+C20+F+G -ft <guide_tree> -n 0

This will stop the analysis after the first phase and also write a `.sitefreq` file. You can now copy this `.sitefreq` file to another low-memory machine and run with the same alignment:

    iqtree -s <alignment> -m LG+C20+F+G -fs <file.sitefreq> -b 100

This will omit the first phase and thus need much less RAM. 

Finally, note that for long (phylogenomic) alignments you can utilize the multicore IQ-TREE version to further save the computing times with, say, 24 cores by:

    # For IQ-TREE version <= 1.5.X
    iqtree-omp -nt 24 -s <alignment> -m LG+C20+F+G -fs <file.sitefreq>

    # For IQ-TREE version >= 1.6.0
    iqtree -nt 24 -s <alignment> -m LG+C20+F+G -fs <file.sitefreq>

See also [the list of relevant command line options](Command-Reference#site-specific-frequency-model-options).