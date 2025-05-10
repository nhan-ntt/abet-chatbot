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

### Parallel sequence simulations

AliSim supports simulating many large alignments in parallel with OpenMP and/or MPI. To simulate large alignment(s) with OpenMP, one can use `-nt` option to specify the number of threads:

    iqtree2 --alisim large_alignment -t tree.nwk --length 1000000 -m "JC" -nt 4
      
This example simulates a new alignment under the Juke-Cantor model from the input tree `tree.nwk` with the sequence length of 1,000,0000 sites using 4 threads. For multithreading simulations, AliSim supports two algorithms AliSim-OpenMP-IM (default) and AliSim-OpenMP-EM (please see [AliSim-HPC](#)). Users can specify `--openmp-alg EM` if they want to employ the AliSim-OpenMP-EM algorithm.

**NOTES**: 

- The performance of AliSim-OpenMP-IM is affected by a memory limit factor (=0.2 (by default) and can be set in the range (0 to 1]): a small factor will potentially increase the runtime; a large factor will increase the memory consumption. To specify this memory limit factor, one can use `--mem-limit <FACTOR>` option.
- If using AliSim-OpenMP-EM algorithm, the simulated sequences will be written in an arbitrary order to the alignment (which is not a matter in most phylogenetic software). However, if users want to maintain the sequence order (based on the preorder traversal of the tree), they can use `--keep-seq-order` option, but it will sacrifice a certain runtime.
- If using AliSim-OpenMP-EM algorithm, one can use `--no-merge` to skip the concatenation step to save the runtime. Note that, when simulating an alignment of length L with K threads, AliSim will output the alignment as K sub-alignment files of L/K sites. 

To simulate many alignments, one can use the MPI version of AliSim:

    mpirun -np 10 iqtree2-mpi --alisim many_alignment -t tree.nwk -m "JC" --num-alignments 100
    
This example uses 10 MPI processes to simulate 100 alignments under the Juke-Cantor model from the input tree `tree.nwk` with the default sequence length of 1,000 sites. Note that AliSim-MPI version can run on a distributed-memory system with many nodes and multiple CPUs per node. To maximize the parallel efficiency, we recommend users specify the number of processes as a divisor of the number of alignments.

To simulate many large alignments, users can employ both MPI and OpenMP on a high-performance computing system:

    mpirun -np 10 --map-by node:PE=4 --rank-by core iqtree2-mpi --alisim many_large_alignment -t tree.nwk --length 1000000 -m "JC" --num-alignments 100 -nt 4
   
This example uses 10 MPI processes, each having 4 threads (i.e. a total of 40 threads will be run) to simulate 100 large alignments under the Juke-Cantor model from the input tree `tree.nwk` with the sequence length of 1,000,000 sites. 

**NOTES**: Our MPI implementation supports Indels as the original version of AliSim, while the OpenMP algorithm does not. Therefore, one can employ only MPI to simulate many alignments with Indels.