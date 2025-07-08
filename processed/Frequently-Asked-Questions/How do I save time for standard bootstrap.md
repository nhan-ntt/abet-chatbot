Frequently asked questions
For common questions and answers.

### How do I save time for standard bootstrap?

The standard bootstrap is rather slow and may take weeks/months for large data sets. One way to speed up is to use the multicore version. However, this only works well for long alignments (see [What is the good number of CPU cores to use?](#what-is-the-good-number-of-cpu-cores-to-use)). Another way is to use many machines or a computing cluster and split the computation among the machines. To illustrate, you want to perform 100 bootstrap replicates and have 5 PCs, each has 4 CPU cores. Then you can:

1. Perform 5 independent bootstrap runs (each with 20 replicates) on the 5 machines with 5 prefix outputs (such that output files are not overwritten). For example: 

        # For old IQ-TREE versions <= 1.5.X, change iqtree to iqtree-omp
        iqtree -nt 4 -s input_alignment -bo 20 ... -pre boot1
        iqtree -nt 4 -s input_alignment -bo 20 ... -pre boot2
        iqtree -nt 4 -s input_alignment -bo 20 ... -pre boot3
        iqtree -nt 4 -s input_alignment -bo 20 ... -pre boot4
        iqtree -nt 4 -s input_alignment -bo 20 ... -pre boot5

    Note that if you have access to a computing cluster, you may want to submit these jobs onto the cluster queue in parallel and with even more fined grained parallelization (e.g. one replicate per job).
        
2. Once all 5 runs finished, combine the 5 `.boottrees` file into one file (e.g. by `cat` command under Linux):

        cat boot*.boottrees > alltrees
     
3. Construct a consensus tree from the combined bootstrap trees:

        iqtree -con -t alltrees
        
    The consensus tree is then written to `.contree` file.
    
4. Estimate branch lengths of the consensus tree using the original alignment:

		iqtree -s input_alignment -te alltrees.contree -pre alltrees.contree
     
5. You can also perform the analysis on the original alignment:

        # For old IQ-TREE versions <= 1.5.X, change iqtree to iqtree-omp
        iqtree -nt 4 -s input_alignment ...

    and map the support values onto the obtained ML tree:

        iqtree -sup input_alignment.treefile -t alltrees 

    The ML tree with assigned bootstrap supports is written to `.suptree` file.