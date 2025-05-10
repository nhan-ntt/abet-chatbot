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

### Mixture models

AliSim allows users to simulate alignments under [protein mixture models](Substitution-Models#protein-mixture-models) for example:

    iqtree2 --alisim alignment_mix_C10 -m "C10" -t tree.nwk

to simulate a new alignment under the [C10 mixture model](Complex-Models#mixture-models).

Besides, users can simulate alignments from user-defined mixture model via `MIX{<model_1>,...,<model_n>}` as described in [Mixture models](Complex-Models#mixture-models). The following example simulates an alignment under a mixture model contains 2 model components (JC, and HKY) with rate heterogeneity across sites based on discrete Gamma distribution.

    iqtree2 --alisim alignment_mix_JC_HKY_G -m "MIX{JC,HKY{2.0}+F{0.2/0.4/0.1/0.3}}+G4" -t tree.nwk

To simulate alignments with more complex mixture models, users can define a new mixture via a model definition file and supply it to AliSim via `-mdef <model_file>`. For more detail about how to define a mixture model, please have a look at [Profile Mixture Models](Complex-Models#profile-mixture-models).