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

### Branch-specific models

AliSim supports branch-specific models, which assign different evolutionary models to individual branches of a tree.

To use branch-specific models, users should specify the models for individual branches with the syntax `[&model=<model>]` in the input tree file, say for example, `input_tree.nwk`:

    (A:0.1,(B:0.1,C:0.2[&model=HKY]),(D:0.3,E:0.1[&model=GTR{0.5/1.7/3.4/2.3/1.9}+F{0.2/0.3/0.4/0.1}+I{0.2}+G{0.5}]):0.2);

Then, simulate an alignment by

      iqtree2 --alisim alignment_example_1 -t input_tree.nwk -m "JC"
    
Here, AliSim uses the [Juke-Cantor model](http://doi.org/10.1016/B978-1-4832-3211-9.50009-7) to simulate an alignment along the input tree. However, the `HKY` with random parameters is used to simulate the sequence of taxon C. Similarly, the `GTR` model with the specified parameters is used to generate the sequence of taxon E.

**NOTE:** A branch-specific model is only applied to a specific branch, meaning that it will not be inherited by descendant branches. To apply a new model to an entire subtree, one needs to specify that branch-specific model at all descendant branches.
  
To mimic heterotachy (rate heterogeneity across branches), users can supply a set of branch-lengths containing `n` lengths corresponding to the `n` categories of the model via `lengths=<length_1>,...,<length_n>`, for example:

    (A:0.1,(B:0.1,C:0.2[&model=HKY{2.0}*H4,lengths=0.1/0.2/0.15/0.3]),(D:0.3,E:0.1):0.2);

Then, simulate an alignment by

      iqtree2 --alisim alignment_example_2 -t input_tree.nwk -m "JC"
    
Here, AliSim simulates a new alignment using the Juke-Cantor model. However, at the branch connecting taxon C to its ancestral node, the [GHOST model](https://doi.org/10.1093/sysbio/syz051) with 4 categories is used with 4 branch lengths 0.1, 0.2, 0.15, and 0.3 to generate the sequence of taxon C.

Additionally, in a rooted tree, users may want to generate the root sequence with particular state frequencies and then simulate new sequences from that root sequence based on a specific model. To do so, one should supply a rooted tree, then specify a model and state frequencies  (with `[&model=<model>,freqs=<freq_0,...,<freq_n>]`) for example:

    (A:0.1,(B:0.1,C:0.2),(D:0.3,E:0.1):0.2):0.3[&model=GTR,freqs=0.2/0.3/0.1/0.4];

Then, simulate an alignment by

      iqtree2 --alisim alignment_example_3 -t input_tree.nwk -m "JC"
    
Here, AliSim first generates a random sequence at the root based on the user-specified frequencies (`0.2, 0.3, 0.1, 0.4` for A, C, G, T, respectively). Then, it uses the `GTR` model with random parameters to simulate a sequence for the child node of the root. For the remaining branches AliSim applies the Juke-Cantor model.