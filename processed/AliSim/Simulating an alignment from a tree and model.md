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

### Simulating an alignment from a tree and model

Similar to other software, AliSim can simulate a multiple sequence alignment from a given tree with branch lengths and a model with:

    iqtree2 --alisim <OUTPUT_PREFIX> -m <MODEL> -t <TREEFILE>

The `-m` option specifies a model, and `-t` option specifies a tree file in the standard [Newick format](https://evolution.genetics.washington.edu/phylip/doc/main.html#treefile). This will print the output alignment into `OUTPUT_PREFIX.phy` file in Phylip format.

For example, if you want to simulate a DNA alignment under the [Jukes-Cantor model](http://doi.org/10.1016/B978-1-4832-3211-9.50009-7) for the following tree `tree.nwk`:

    (A:0.3544,(B:0.1905,C:0.1328):0.0998,D:0.0898);

You can run IQ-TREE with:

    iqtree2 --alisim alignment -m "JC" -t tree.nwk

this will print the simulated alignment to `alignment.phy`. 


The output MSA should contain 4 sequences of 1000 sites, each, for example:

    4 1000
    A       AAATTTGGTCCTGTGATTCAGCAGTGAT...
    B       CTTCCACACCCCAGGACTCAGCAGTGAT...
    C       CTACCACACCCCAGGACTCAGCAGTAAT...
    D       CTACCACACCCCAGGAAACAGCAGTGAT...


Importantly, we note that AliSim uses a random number seed corresponding to the current CPU clock of the running computer. If you run two AliSim commands at the same time, it may generate two identical alignments, which may not be the desired outcome. In that case, you can use -seed option to specify the random number seed:

    iqtree2 --alisim alignment_123 -m "JC" -t tree.nwk -seed 123

`-seed` option has another advantage of reproducing the same alignment when rerunning IQ-TREE.

**NOTE**: AliSim fully supports multifurcating input trees, e.g., `(A:0.3544,(B:0.1905,C:0.1328,D:0.0898):0.05,E:0.1);`