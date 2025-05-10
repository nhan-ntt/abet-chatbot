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

### Customizing output alignments

AliSim provides a number of options to customize the output such as setting the alignment format, length, compression, and simulating more than one alignment.

Users can use `--length` option to change the length of the root sequence:

    iqtree2 --alisim alignment_5000 -m "JC" -t tree.nwk --length 5000

will simulate an alignment with 5000 sites. Users could also output the alignment in FASTA format with `--out-format` option:

    iqtree2 --alisim alignment -m "JC" -t tree.nwk --out-format fasta
    
will print the alignment to `alignment.fa` file.

To generate multiple alignments, users could use `--num-alignments` option:    

    iqtree2 --alisim alignment -m "JC" -t tree.nwk --num-alignments 3

This will output three alignments into `alignment_1.phy`, `alignment_2.phy`, and `alignment_3.phy`, respectively. 

If users want to compress the output file, they could try `-gz` option:

    iqtree2 --alisim alignment -m "JC" -t tree.nwk -gz

This will compress the output file, but it could take a longer running time.