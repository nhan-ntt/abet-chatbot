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

### Heterotachy GHOST model

If one wants to simulate sequences based on a [GHOST model](https://doi.org/10.1093/sysbio/syz051) with 4 categories in conjunction with the `GTR` model of DNA evolution, one should first specify a multi-length tree as follows.

    (A[0.067/0.151/0.562/1.269],(B[0.001/0.078/0.319/1.724],C[0.076/0.101/0.002/1.061])[0.043/0.086/0.003/0.002],D[0.002/0.136/0.002/0.001]);

In the above file, each branch should have 4 lengths (corresponding to 4 categories of the GHOST model), which are specified in a pair of square brackets `[...]`, and separated by a slash `/`. 

Assuming that the above tree file is named `ghost_tree.nwk`,  one can simulate an alignment under GHOST model with:

    iqtree2 --alisim alignment_ghost -m "GTR{2/3/4/5/6}+F{0.2/0.3/0.1/0.4}+H4{0.15/0.2/0.35/0.3}" -t ghost_tree.nwk

Here, AliSim applies the GHOST model with the weights of 0.15, 0.2, 0.35, 0.3 for the four categories, respectively. If the weights are ignored, AliSim will assume uniform weight distribution.

If you want to unlink GTR parameters so that AliSim could use a GTR model (with specific substitution rates) for each category, you can use `MIX{...}*H4` and specify the model parameters for each categories inside `MIX{...}` as follow: 

    iqtree2 --alisim alignment_ghost_unlink -m "MIX{GTR{2/3/4/5/6},GTR{3/4/5/6/7},GTR{4/5/6/7/8},GTR{5/6/7/8/9}}+F{0.2/0.3/0.1/0.4}*H4{0.15/0.2/0.35/0.3}" -t ghost_tree.nwk

You can also specify a different set of state frequencies for each model component as follow:  

    iqtree2 --alisim alignment_ghost_unlink_freqs -m "MIX{GTR{2/3/4/5/6}+F{0.2/0.3/0.4/0.1},GTR{3/4/5/6/7}+F{0.3/0.2/0.4/0.1},GTR{4/5/6/7/8}+F{0.4/0.2/0.3/0.1},GTR{5/6/7/8/9}+F{0.1/0.2/0.4/0.3}}*H4{0.15/0.2/0.35/0.3}" -t ghost_tree.nwk

Besides, assuming that we have an input alignment `example.phy` evolving under the GHOST model with 4 categories in conjunction with the `GTR` model. If one wants to simulate an alignment that mimics that input alignment, one should use the following command:

    iqtree2 --alisim alignment_ghost_mimick -m "GTR+H4" -s example.phy
    
or using 	`GTR*H4` instead of `GTR+H4`, if you want to unlink GTR parameters:
    
    iqtree2 --alisim alignment_ghost_unlink_mimick -m "GTR*H4" -s example.phy

or using 	`GTR+FO*H4` to unlink GTR parameters and state frequencies:
    
    iqtree2 --alisim alignment_ghost_unlink_freqs_mimick -m "GTR+FO*H4" -s example.phy