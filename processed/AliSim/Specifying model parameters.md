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

### Specifying model parameters

Apart from the simple Juke-Cantor models with no parameters, AliSim also supports all other more complex models available in IQ-TREE. For example:

     iqtree2 --alisim alignment_HKY -t tree.nwk -m "HKY{2.0}+F{0.2/0.3/0.1/0.4}"

This simulates a new alignment under the [HKY model](https://dx.doi.org/10.1007%2FBF02101694) with a transition/transversion ratio of 2 and nucleotide frequencies of 0.2, 0.3, 0.1, 0.4 for A, C, G, T, respectively.

By default, if nucleotide frequencies are neither specified nor possible to be inferred from a user-provided alignment, AliSim will randomly generate these frequencies from empirical distributions as the following example. 

     iqtree2 --alisim alignment_HKY -t tree.nwk -m "HKY{2.0}"

In this case, AliSim would simulate an alignment from the HKY model. The frequencies of base A, C, G, and T, will be randomly generated from empirical distributions, namely, Generalized-logistic, Exponential-normal, Power-log-normal, Exponential-Weibull. These distributions and their parameters were estimated from a large collection of empirical datasets ([Naser-Khdour et al. 2021](https://doi.org/10.1101/2021.09.22.461455)). 

Besides, AliSim allows users to simulate alignnments with DNA error model by adding `+E{<Error_Probability>}` into the `<model>` when specifying the model with `-m <model>`. For example:

     iqtree2 --alisim alignment_HKY_error -t tree.nwk -m "HKY{2.0}+F{0.2/0.3/0.1/0.4}+E{0.01}"
   
This simulates a new alignment under the HKY model as the above example, but with a sequencing error probability of 0.01. That means the nucleotide of 1% sites of the simulated sequences is randomly changed to another nucleotide. 



Using user-defined parameter distributions
    
In addition to five built-in distributions, namely *uniform, Generalized_logistic, Exponential_normal, Power_log_normal, and Exponential_Weibull*, users could define their own lists of numbers, then generate other model parameters from these lists by following these steps. Note that user-defined lists of numbers could be generated from different distributions.

Firstly, generating a set of random numbers for each list, then defining the new lists in a new file (e.g.,`custom_distributions.txt`) as the following example.


    
    F_A 0.363799 0.313203 0.277533 0.24235 0.260252
    F_B 0.321134 0.299891 0.315519 0.269172 0.258165 
    F_C 0.287641 0.309442 0.264017 0.23103
    F_D 0.200087 0.336534 0.337547 0.325379 0.335034 
    F_E 0.306336 0.359459 0.249315 0.388073 
    F_F 0.345694 0.338733 0.305404 0.294181 
    I_A 0.257679 0.417313 0.290922 0.301826 0.292324 0.33887
    I_B 0.179902 0.122071 0.348381 0.33887 0.228999
    I_C 0.377297 0.296036 0.044523 0.262098 0.295087
    R_A 10.363799 20.313203 10.277533 5.24235 3.26025
    R_B 6.321134 0.299891 10.315519 0.269172 04.258165
    R_C 10.287641 8.309442 20.264017 03.23103 04.178778
    R_D 9.200087 10.336534 30.337547 03.325379 0.335034
    R_E 2.306336 4.359459 0.249315 0.388073 04.296979
    R_F 4.345694 06.338733 02.305404 02.294181 04.303477
    R_G 3.257679 07.417313 03.290922 04.301826 03.292324
    N_A -0.363799 -0.313203 -0.277533 0.24235 -0.260252
    N_B 0.321134 -0.299891 -01.315519 -0.269172 -0.258165
    N_C 0.287641 -0.309442 0.264017 -0.23103 0.178778



Each list should be defined in a single line, starting with the list name, followed by random numbers. These numbers should be separated by space. The given file `custom_distributions.txt` defines 8 new lists. Each list could have a different number of random elements.

Secondly, loading these lists and generating a new alignment with random parameters with

     iqtree2 --alisim alignment_GTR_custom -t tree.nwk -m "GTR{1.5/R_A/R_B/0.5/R_C}+F{Generalized_logistic/0.3/F_A/0.2}+I{F_D}+G{F_C}" --distribution custom_distributions.txt

In this example, 3 substitution rates of GTR models are randomly drawn from the `R_A,R_B,R_C` lists while the user specifies other rates. Similarly, the frequencies of base A and G are generated from `Generalized_logistic` distribution and the list `F_A` whereas the relative frequencies of base C and T are 0.3 and 0.2. These state frequencies are automatically normalized so that they sum to 1. Furthermore, the Invariant Proportion and the Gamma Shape are drawn from the appropriate lists named `F_D`, and `F_C`, respectively. 

Users can also use user-defined lists to randomly generate other parameters (e.g., substitution rates, state frequencies, nonsynonymous/synonymous rate ratio, transition rate, transversion rate, category weight/proportion) for other kinds of models/data (e.g., Protein, Codon, Binary, Morph, Lie Markov, Heterotachy, and Mixture).