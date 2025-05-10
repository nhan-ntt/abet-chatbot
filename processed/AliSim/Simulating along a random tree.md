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

### Simulating along a random tree

AliSim can simulate alignments along a random tree under biologically plausible processes such as Yule-Harding, and Birth-Death with the option `-t RANDOM{<MODEL>/<NUM_TAXA>}` as the following example:

    # simulate 1000-taxon alignment under Yule-Harding random tree model 
    iqtree2 --alisim alignment_yh -t "RANDOM{yh/1000}"
    
    # simulate 1000-taxon alignment under Birth-Death model with birth rate of 0.1 and death rate of 0.05
    iqtree2 --alisim alignment_bd -t "RANDOM{bd{0.1/0.05}/1000}"
    

* `-t RANDOM{yh/1000}` tells AliSim to generate a random tree with 1000 taxa under the Yule-Harding model, with branch lengths following a exponential distribution with a mean of 0.1.
* `-t RANDOM{bd{0.1/0.05}/1000}`: tells AliSim to generate a random tree with 1000 taxa under the Birth-Death model (with birth rate of 0.1 and death rate of 0.05), with branch lengths following a exponential distribution with a mean of 0.1.

For other model, uses can specify `u`, `cat`, or `bal` for Uniform, Caterpillar, or Balanced model, respectively).

`<NUM_TAXA>` can be a fixed number, or a list `{<NUM_1>/<NUM_2>/.../<NUM_N>}`, or a Uniform distribution `U{<LOWER_BOUND>/<UPPER_BOUND>}` where the number of taxa is randomly generated from the given list or distribution.

In the above examples, AliSim generates `alignment_yh.phy` or `alignment_bd.phy` under the Jukes-Cantor DNA model. If you want to change the model, use -m option as [described above](#simulating-alignments-with-custom-models).


For the distribution of branch lengths, users could adjust the minimum, mean and maximum of the exponential distribution via the option `-rlen <MIN_LEN> <MEAN_LEN> <MAX_LEN>`.

Furthermore, users can also randomly generate branch lengths of the phylogenetic tree from a user-defined list (or a built-in distribution, such as *uniform, Generalized_logistic, Exponential_normal, Power_log_normal, and Exponential_Weibull*) with `--branch-distribution` option:

    iqtree2 --alisim alignment_yh_custom_branch -t "RANDOM{yh/1000}" --branch-distribution F_A --distribution custom_distributions.txt

In this example, the branch lengths of the random tree are randomly drawn from the user-defined list `F_A`. Besides, if the user supplies a tree file (instead of a random tree), the branch lengths of the user-provided tree will be overridden by the random lengths from the list `F_A`.