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

### Partition models

AliSim allows users to simulate a multi-locus alignment using a partition model specified in a NEXUS file as described in
the [partition model tutorial](Complex-Models#partition-models). An example partition file may look like:

    #nexus
    begin sets;
        charset gene_1 = DNA, 1-846;
        charset gene_2 = DNA, 847-1368;
        charset gene_3 = DNA, 1369-2040;
        charset gene_4 = DNA, 2041-2772;
        charset gene_5 = DNA, 2773-3738;
        charpartition mine = HKY{2}+F{0.2/0.3/0.1/0.4}:gene_1, 
            GTR{1.2/0.8/0.5/1.7/1.5}+F{0.1/0.2/0.3/0.4}+G{0.5}:gene_2, 
            JC:gene_3, 
            HKY{1.5}+I{0.2}:gene_4, 
            K80{2.5}:gene_5;
    end;

This means that we define an alignment with 5 genes (partitions). The gene positions are described in `charset` command 
and the models for each gene are specified in `charpartition` command. Moreover, we use the [HKY model](https://dx.doi.org/10.1007%2FBF02101694) for gene_1 with
transition-transversion ratio of 2 and nucleotide frequencies of 0.2, 0.3, 0.1, 0.4 for A, C, G and T, respectively.
See also the [custom model section](#simulating-alignments-with-custom-models) for how to specify model parameters.

Assuming we name this partition file `multi_genes.nex`. Then, you can simulate an alignment consisting of these five genes by

    iqtree2 --alisim partition_multi_genes  -q multi_genes.nex -t tree.nwk

That simulation outputs the new alignment into a single file named `partition_multi_genes.phy`.

In the following we will describe scenarios for more complex partition models.

Edge-proportional partition model

The above example simulates a concatenated alignment under edge-equal partition model, i.e., all partitions share the same tree with the same branch lengths. This is not realistic as different genes might have different evolutionary rates. Therefore, users can specify gene-specific tree lengths directly in the `charpartition` command as follows:

    #nexus
    begin sets;
        charset gene_1 = DNA, 1-846;
        charset gene_2 = DNA, 847-1368;
        charset gene_3 = DNA, 1369-2040;
        charset gene_4 = DNA, 2041-2772;
        charset gene_5 = DNA, 2773-3738;
        charpartition mine = HKY{2}+F{0.2/0.3/0.1/0.4}:gene_1{0.26019}, 
            GTR{1.2/0.8/0.5/1.7/1.5}+F{0.1/0.2/0.3/0.4}+G{0.5}:gene_2{1.51542}, 
            JC:gene_3{1.03066}, 
            HKY{1.5}+I{0.2}:gene_4{0.489315}, 
            K80{2.5}:gene_5{0.680204};
    end;

Meaning that gene_1 will rescale the branch lengths such that the total tree length becomes 0.26019. Note that `<tree_length>` of a partition is equal to the length of the input tree times the `partition_rate` of that partition. For example, assuming the length of the input tree `tree.nwk` is 0.8673, then the rate of gene_1 is 0.26019/0.8673 = 0.3.

After changing the `multi_genes.nex` file, one could start the simulation by:

    iqtree2 --alisim partition -p multi_genes.nex -t tree.nwk

Note that we use `-p` option here instead of `-q` option like above. If users still used `-q` option, the partition-specific rates will be ignored, i.e., AliSim will use edge-equal partition model.


Topology-unlinked partition model

AliSim supports topology-unlinked partition models, which allow each partition to have its own tree topology and branch lengths.
The partition trees can have non-overlapping taxon sets. To do so, users need to prepare a tree file containing multiple NEWICK strings, one for each partition, for example:

    (A:0.1,(B:0.26,C:0.15):0.1,D:0.05);
    (A:0.2,B:0.1,C:0.3);
    (A:0.05,B:0.03,(C:0.21,D:0.22):0.21);
    ((A:0.24,B:0.14):0.19,C:0.07,D:0.1);
    ((A:0.1,C:0.1):0.04,B:0.4,D:0.5);

Note that the 2nd tree does not contain all taxa.

Assuming that this file is named `multi_trees.nwk`, you can simulate an alignment consisting of these five genes from multiple gene trees by

    iqtree2 --alisim multi_alignment  -Q multi_genes.nex -t multi_trees.nwk

That simulation outputs the new alignment containing all four taxa A, B, C, D into a single file named `multi_alignment.phy`.
AliSim will add a stretch of gaps corresponding to the missing taxon D in partition `gene_2`.

**NOTE**: We use `-Q` option here to specify topology-unlinked model. If users specify `-q` option, the behaviour will be completely different: AliSim will only load the first tree in `multi_trees.nwk` and simulate an alignment under this one tree.

Mixing different datatypes

AliSim allows users to simulate mixed data  (e.g., DNA, Protein, and MORPH) in a single simulation, in which each kind of data is exported into a different alignment file. Here is an example for mixing DNA, protein, and morphological data. Firstly, users need to specify partitions in an input partition file as following.

    #nexus
    begin sets;
        charset part1 = DNA, 1-200\2 201-300;
        charset part2 = DNA, 2-200\2;
        charset part3 = MORPH{6}, 1-300;
        charset part4 = AA, 1-200;
        charset part5 = MORPH{30}, 1-200\2;
        charset part6 = MORPH{30}, 2-200\2;
        charset part7 = DNA, 301-500;
        charpartition mine = HKY{2.0}:part1, JC+G{0.5}:part2, MK:part3, Dayhoff:part4, MK:part5, ORDERED:part6, F81+F{0.1/0.2/0.3/0.4}:part7;
    end;

Here,  `part1`,  `part2`, and `part7` contain three DNA sub-alignments, whereas `part3`,  `part5`, and `part6` contain sub-alignments for morphological data. Besides, `part4` contains an amino-acid alignment with 200 sites. 

Assuming that the above partition file is named `example_mix.nex` and one would like to simulate alignments from a single tree in `tree.nwk`, one could start the simulation with the following command:

    iqtree2 --alisim partition_mix -q example_mix.nex -t tree.nwk

At the end of the run, AliSim writes out the simulated alignments into four output files. The first file named `partition_mix_DNA.phy` stores the merged 400-site DNA alignment from `part1`, `part2`, and `part7`. Although `part3`, `part5`, and `part6` contain morphological data, `part3` simulates a morphological alignment with 6 states while `part5` and `part6` have 30 states. Thus, AliSim outputs the alignment of `part3` into `partition_mix_MORPH6.phy`, whereas `partition_mix_MORPH30.phy` stores the  alignment merging `part5` and `part6`. Lastly, `partition_mix_AA.phy` stores the simulated amino-acid alignment of `part4`.