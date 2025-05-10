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

### Command reference

All the options available in AliSim are shown below:

| Option | Usage and meaning |
|--------------|------------------------------------------------------------------------------|
|`--alisim <OUTPUT_ALIGNMENT>`| Activate AliSim and specify the output alignment filename. |
| `-t <TREE_FILE>`   | Set the input tree file name. |
| `--seqtype <SEQUENCE_TYPE>`  | Specify the sequence type (BIN, DNA, AA, CODON, MORPH{`NUMBER_STATES`}, where `NUMBER_STATES` is the number of states for morphological model). <br>*By default, Alisim automatically detects the sequence type from the model name*. |
| `-m <MODEL>`   | Specify the model name. See [Substitution Models](Substitution-Models) and [Complex Models](Complex-Models) for the list of supported models.|
| `-mdef <MODEL_FILE>`  | Name of a NEXUS model file to [define new models](Complex-models#nexus-model-file), which can be used with `-m` option. |
| `--fundi <TAXON_1>,...,<TAXON_N>,<RHO>`   | Specify the FunDi model ([Gaston et al. 2011]). The last number `RHO` in this list is the proportion of sites, that will be randomly permuted in the sequences of the given taxa. The same permutation is applied to the sequences. |
| `--indel <INS>,<DEL>`  | Set the insertion and deletion rate of the indel model, relative to the substitution rate. |
| `--indel-size <INS_DIS>,<DEL_DIS>`  | Set the [insertion and deletion size distributions](#insertion-and-deletion-models). By default, AliSim uses `POW{1.7/100}` for a power-law (Zipfian) distribution with parameter `a` of 1.7 and maximum indel size of 100.|
| `--no-unaligned` | Do not output a file of unaligned sequences when using indel models. Default: a file `.unaligned.fa` containing unaligned sequences is written. |
| `-q <PARTITION>` or <br>`-p <PARTITION>` or <br>`-Q <PARTITION>` | Specify different types of [Partition models](#partition-models), i.e., edge-equal (-q), edge-proportional (-p), edge-unlinked (-Q)|
| `--distribution <FILE>` | Supply a definition file of distributions, which could be used to generate random model parameters (see [Using user-defined parameter distributions](#using-user-defined-parameter-distributions)). |
| `--branch-distribution <DISTRIBUTION>` | Specify a distribution, from which branch lengths of the input trees are randomly generated and overridden.|
| `--branch-scale <SCALE>` | Specify a value to scale all branch lengths of the input tree.|
| `--length <LENGTH>` | Set the root sequence length.<br>*Default: 1,000* |
| `--num-alignments <NUMBER>` | Set the number of output datasets.<br>*Default: 1* |
| `--root-seq <ALN_FILE>,<SEQ_NAME>`   | Specify the root sequence from an alignment.<br>AliSim automatically sets the output sequence length (`--length`) equally to the length of the root sequence. |
|  `-t RANDOM{<MODEL>/<NUM_TAXA>}` | Specify the model and the number of taxa to generate a random tree (see [Simulating along a random tree](#simulating-along-a-random-tree)). |
|  `-rlen <MIN_LEN> <MEAN_LEN> <MAX_LEN>`  | Specify three numbers: minimum, mean and maximum branch lengths when generating a random tree with `-t RANDOM{<MODEL>/<NUM_TAXA>}`. <br>*Default: -rlen 0.001 0.1 0.999.* |
| `-s <ALIGNMENT>` | Specify an input alignment file in PHYLIP, FASTA, NEXUS, CLUSTAL or MSF format.|
| `--no-copy-gaps` | Disable copying gaps from the input alignment.|
| `--site-freq <OPTION>` | Specify the option (`MEAN` *(default)*, or `SAMPLING`, or `MODEL`) to mimic the site-frequencies for mixture models from the input alignment (see [Mimicking a real alignment](#mimicking-a-real-alignment)). |
| `--site-rate <OPTION>` | Specify the option (`MEAN` *(default)*, or `SAMPLING`, or `MODEL`) to mimic the discrete rate heterogeneity from the input alignment (see [Mimicking a real alignment](#mimicking-a-real-alignment)).|
| `-nt <NUM_THREADS>` | Specify the number of threads for simulating large alignment(s) with OpenMP.|
| `--openmp-alg <ALG>` | Specify the multithreading algorithm (`IM` or `EM` for AliSim-OpenMP-IM or AliSim-OpenMP-EM, respectively).<br>*Default: IM*|
| `--mem-limit <FACTOR>` | Specify the memory limit factor for the AliSim-OpenMP-IM algorithm: 0 < `<FACTOR>` <=  1.<br>*Default: 0.2*|
| `--keep-seq-order` | Output the sequences (simulated by the AliSim-OpenMP-EM algorithm) following the visiting order of tips (based on the preorder traversal).|
| `--no-merge` | Skip the concatenation step in the AliSim-OpenMP-EM algorithm, output alignment in multiple sub-alignment files.|
| `--single-output` | Output all alignments into a single file. |
| `--write-all` | Enable outputting internal sequences. |
| `-seed <NUMBER>` | Specify the seed number. <br>*Default: the clock of the PC*. <br>Be careful! To make the AliSim reproducible, users should specify the seed number. |
| `-gz` | Enable output compression. It may take a longer running time.<br>*By default, output compression is disabled*. |
| `--out-format <FORMAT>` | Set the output format (`fasta`, `phy`, or `maple` for FASTA, PHYLIP, or [MAPLE](https://www.nature.com/articles/s41588-023-01368-0) format, respectively).<br>*Default: phy* |


[Gaston et al. 2011]: https://doi.org/10.1093/bioinformatics/btr470