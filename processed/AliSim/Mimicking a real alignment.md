Simulating sequence alignments
Sequence simulators play an important role in phylogenetics. Simulated data has many applications, such as evaluating the performance of different methods, hypothesis testing with parametric bootstraps, and, more recently, generating data for training machine-learning applications. Many sequence simulation programs exist, but the most feature-rich programs tend to be rather slow, and the fastest programs tend to be feature-poor. Here, we introduce AliSim, a new tool that can efficiently simulate biologically realistic alignments under a large range of complex evolutionary models. To achieve high performance across a wide range of simulation conditions, AliSim implements an adaptive approach that combines the commonly-used rate matrix and probability matrix approach. AliSim takes 1.3 hours and 1.3 GB RAM to simulate alignments with one million sequences or sites, while popular software Seq-Gen, Dawg, and INDELible require two to five hours and 50 to 500 GB of RAM. 


To use AliSim please make sure that you download the IQ-TREE version 2.2.0 or later.

If you use AliSim please cite:

- Nhan Ly-Trong, Giuseppe M.J. Barca, Bui Quang Minh (2023) 
  AliSim-HPC: parallel sequence simulator for phylogenetics.
  Bioinformatics, Volume 39, Issue 9, btad540.
  <https://doi.org/10.1093/bioinformatics/btad540>

For the original algorithms of AliSim please cite:

- Nhan Ly-Trong, Suha Naser-Khdour, Robert Lanfear, Bui Quang Minh (2022)
  AliSim: A Fast and Versatile Phylogenetic Sequence Simulator for the Genomic Era.
  _Molecular Biology and Evolution_, Volume 39, Issue 5, msac092.
  <https://doi.org/10.1093/molbev/msac092>

### Mimicking a real alignment

AliSim allows users to simulate alignments that mimic the evolutionary history of a given alignment as the below example:
        
      iqtree2 --alisim alignment_mimic -s example.phy 

* `-s example.phy` is the option to supply the input alignment. 

In this example, AliSim internally runs IQ-TREE to infer a phylogenetic tree and the best-fit substitution model (using [ModelFinder](https://doi.org/10.1038/nmeth.4285)) with its parameters from the input alignment `example.phy`. After that, AliSim simulates a new alignment with the same length as the original alignment based on the inferred tree and model and copies the gaps from the input alignment `example.phy` to the output alignment `alignment_mimic.phy`. To disable this feature, use `--no-copy-gaps` option.

Additionally, for simulations under a mixture models and/or discrete rate heterogeneity (under [Gamma](https://doi.org/10.1007/BF00160154)/[Free-rate](http://www.genetics.org/content/139/2/993.abstract) distributions), e.g.

      iqtree2 --alisim alignment_mimic -s example.phy -m "MIX{GTR{2/3/4/5/6}+F{0.2/0.3/0.4/0.1},HKY{2}+F{0.3/0.2/0.1/0.4},JC}+G{0.5}"

The above mixture consists of three model components. AliSim randomly assigns a model component of the mixture to each site according to the site posterior probability distribution of the mixture. For site-frequency mixture models, AliSim assigns site frequency as the mean frequency of the posterior distribution ([Wang et al. 2018](https://doi.org/10.1093/sysbio/syx068)) (default). Or the user can use `--site-freq SAMPLING` to sample site-frequencies from the posterior probability distribution of the mixture, or use `--site-freq MODEL` to employ the frequencies specified for each model component.

Similarly, for discrete rate heterogeneity (based on Gamma/Free-rate distributions), AliSim assigns site rate as the mean rate of the posterior distribution (by default). Or  the user can use `--site-rate SAMPLING` to sample site-specific rate from the posterior probability distribution of rate categories, or `--site-rate MODEL` to sample site-specific rate from the weight (prior distribution) of rate categories.

NOTE: 

* When mimicking an alignment and specifying `--length` option without an [insertion-deletion model](#insertion-and-deletion-models), the output alignment might be shorter or longer than the original alignment. If shorter, AliSim will copy the gap patterns from the original alignment from site 1 to the last site index in the output alignment. If longer, AliSim can only copy gaps from site 1 to the last site of the original alignment. All remaining sites until the end of the output alignment won't contain any gaps.

* When mimicking an alignment with an [insertion-deletion model](#insertion-and-deletion-models), AliSim will set the root sequence length to the original alignment length if `--length` is not specified (otherwise it is equal to `--length` option). Moreover, AliSim will ignore the gaps from the original alignment and generate gaps according to the indel model.