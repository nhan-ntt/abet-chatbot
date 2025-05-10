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

### Simulating other datatypes

Apart from the DNA data, AliSim can also simulate other types of data under amino-acid, codon, binary, and multi-state morphological models.

Amino-acid models

AliSim supports all common [empirical amino-acid models](Substitution-Models#protein-models). For example, to simulate an alignment under the [LG model](https://doi.org/10.1093/molbev/msn067):

    iqtree2 --alisim alignment_aa -m "LG" -t tree.nwk

Codon models

AliSim offers several [codon models](Substitution-Models#codon-substitution-rates). For example:
    
    iqtree2 --alisim alignment_codon -m "MG{2.0}+F1X4{0.2/0.3/0.4/0.1}" -t tree.nwk

This simulates an alignment under MG model with Nonsynonymous/synonymous (dn/ds) rate ratio of 2.0 and unequal nucleotide frequencies (0.2,0.3,0.4,0.1 for nucleotide A, C, G, T, respectively) but equal nucleotide frequencies over three codon positions.

Binary and morphological models

AliSim supports some [binary and morphological models](Substitution-Models#binary-and-morphological-models). For example:

    iqtree2 --alisim alignment_bin -m "JC2" -t tree.nwk
 
will simulate a binary alignment under Jukes-Cantor-type binary model.
 
To simulate morphological alignments, users should specify the number of states with `-st MORPH{<NUM_STATES>}`  option: 

    iqtree2 --alisim alignment_morph -m "MK" -t tree.nwk -st "MORPH{20}"

This simulates a morphological alignment (with 20 states) under MK model.

AliSim also supports An ascertainment bias correction (`+ASC`) model ([Lewis, 2001](https://doi.org/10.1080/106351501753462876)) to simulate sequences without constant sites, for example:

    iqtree2 --alisim alignment_morph_asc -m "MK+ASC" -t tree.nwk -st "MORPH{20}"