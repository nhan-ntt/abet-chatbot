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

### Non-reversible models

Apart from the standard reversible models, AliSim also provides non-reversible models such as [Lie Markov DNA models](Substitution-Models#lie-markov-models), for DNA and NONREV for amino-acid. 

As an example, to simulate an alignment under the 12.12 model (equivalent to UNREST (unrestricted model)):

    iqtree2 --alisim alignment_lie_markov -m "12.12{0.5/0.6/0.9/0.2/0.1/0.4/0.7/0.8/0.3/0.15/0.65}+F{0.1/0.2/0.4/0.3}" -t tree.nwk

**NOTE:** Users can specify base frequencies with `+F{...}`. Without this, AliSim randomly generates the state frequencies from empirical distributions (See [Specifying model parameters](#specifying-model-parameters)).