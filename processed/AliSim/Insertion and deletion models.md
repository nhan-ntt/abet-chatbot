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

### Insertion and deletion models

AliSim can also simulate insertions and deletions, for example:

    iqtree2 --alisim alignment_indel -m "JC" -t tree.nwk --indel 0.03,0.1
    
`--indel` option specifies the insertion and deletion rates (separated by a comma) relative to the substitution rates. Here, it means that, on average, we have 3 insertion and 10 deletion events per every 100 substitution events. Apart from the normal output file `alignment_indel.phy`, AliSim also exports an additional file `alignment_indel_withoutgaps.fa` containing sequences without gaps. If not needing the additional output file, one could disable that feature by `--no-export-sequence-wo-gaps`. By default, AliSim assumes that the size of indels follows a Zipfian distribution (as defined in [INDELible](https://doi.org/10.1093/molbev/msp098)) with an empirical exponent of 1.7 and a maximum indel sizes of 100 . If wanting to change this distribution, one can use `--indel-size` option:

    iqtree2 --alisim alignment_indel_size -m "JC" -t tree.nwk --indel 0.1,0.05 --indel-size "GEO{5},GEO{4}"

It means that the insertion size follows a Geometric distribution with mean of 5 and variance of 20, whereas deletion size also follows the Geometric distribution but with mean of 4 and variance of 12. *Note that the variance is computed from mean*. Apart from this distribution, AliSim also supports [Negative Binomial distribution, Zipfian distribution, and Lavalette distribution](https://doi.org/10.1093/molbev/msp098) as following examples:

    iqtree2 --alisim alignment_indel_size -m "JC" -t tree.nwk --indel 0.1,0.05 --indel-size "NB{5/20},POW{1.5/10}"

To specify a Negative Binomial distribution (with mean of 5 and variance of 20) and a Zipfian distribution (with exponent `a` of 1.5 and `max` of 10) for the insertion size, and deletion size, respectively. Or to specify Lavalette distribution (with parameter `a` of 1.5 and `max` of 10) for both insertion and deletion size, users could use:

    iqtree2 --alisim alignment_indel_size -m "JC" -t tree.nwk --indel 0.1,0.05 --indel-size "LAV{1.5/10},LAV{1.5/10}"

NOTE: When using `--length` option with indel models, the output
alignment can be longer due to gaps inserted into the root sequence.