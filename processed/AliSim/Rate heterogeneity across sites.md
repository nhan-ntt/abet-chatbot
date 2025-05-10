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

### Rate heterogeneity across sites

AliSim supports all common rate heterogeneity across sites models, such as allowing for a proportion of invariable sites, continuous/discrete [Gamma distribution](https://doi.org/10.1007/BF00160154) rates, Distribution-free ([Yang, 1995](http://www.genetics.org/content/139/2/993.abstract); [Soubrier et al., 2012](https://doi.org/10.1093/molbev/mss140)) rates, for example:

To simulate an alignment with a proportion of invariable sites, users can use `+I{<invar_proportion>}` as follows.

     iqtree2 --alisim alignment_I -t tree.nwk -m "JC+I{0.2}"

This simulates a new alignment under the [Jukes-Cantor model](http://doi.org/10.1016/B978-1-4832-3211-9.50009-7) with 20% of sites being invariant.

To simulate a new alignment with rate heterogeneity across sites under continuous Gamma distribution, users can specify `+GC{<shape>}` where `<shape>` is the Gamma shape parameter  like the following example.

     iqtree2 --alisim alignment_GC -t tree.nwk -m "JC+GC{0.5}"
     
Similarly, to apply a discrete Gamma distribution for rate heterogeneity across sites, users can employ `+Gk{<shape>}` where `k` is the number of rate categories, for example:

     iqtree2 --alisim alignment_G4 -t tree.nwk -m "JC+G4{0.5}"
  
This simulates a new alignment with 4 discrete rates based on a Gamma distribution with a Gamma shape of 0.5.    

Users can specify the Free-rate model for rate heterogeneity via `+Rk{w1/r1/.../wk/rk}` where `k` is the number of rate categories, `w1, ..., wk` are the weights, and `r1, ..., rk` the rates for each category, for example:

     iqtree2 --alisim alignment_R3 -t tree.nwk -m "JC+R3{0.5,1.5,0.2,0.7,0.3,2.0}"

This specifies three rates of 1.5, 0.7, and 2.0 with the weights of 0.5, 0.2, and 0.3, respectively, for rate heterogeneity.
     
Note that users can combine the Gamma or Free-rate distribution with the proportion of invariant sites, for example:

     iqtree2 --alisim alignment_G4 -t tree.nwk -m "JC+G4{0.5}+I{0.2}"

to simulate a new alignment with 20% sites are constant while the other sites evolve under 4 discrete Gamma rates (with a Gamma shape of 0.5).