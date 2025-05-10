Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### General options

General options are mainly intended for specifying input and output files:

| Option | Usage and meaning |
|--------------|------------------------------------------------------------------------------|
|`-h` or `-?`| Print help usage. |
| `-s`   | Specify input alignment file in PHYLIP, FASTA, NEXUS, CLUSTAL or MSF format. |
| `-st`  | Specify sequence type as either of `DNA`, `AA`, `BIN`, `MORPH`, `CODON` or `NT2AA` for DNA, amino-acid, binary, morphological, codon or DNA-to-AA-translated sequences. This is only necessary if IQ-TREE did not detect the sequence type correctly. Note that `-st CODON` is always necessary when using codon models (otherwise, IQ-TREE applies DNA models) and you also need to specify a [genetic code like this](Substitution-Models#codon-models) if differed from the standard genetic code. `-st NT2AA` tells IQ-TREE to translate protein-coding DNA into AA sequences and then subsequent analysis will work on the AA sequences. You can also use a genetic code like `-st NT2AA5` for the Invertebrate Mitochondrial Code (see [genetic code table](Substitution-Models#codon-models)). |
| `-t`   | Specify a file containing starting tree for tree search. The special option `-t BIONJ` starts tree search from BIONJ tree and `-t RANDOM` starts tree search from completely random tree. *DEFAULT: 100 parsimony trees + BIONJ tree* |
| `-te`  | Like `-t` but fixing user tree. That means, no tree search is performed and IQ-TREE computes the log-likelihood of the fixed user tree. |
| `-o`   | Specify an outgroup taxon name to root the tree. The output tree in `.treefile` will be rooted accordingly. *DEFAULT: first taxon in alignment* |
| `-pre` | Specify a prefix for all output files. *DEFAULT: either alignment file name (`-s`) or partition file name (`-q`, `-spp` or `-sp`)* |
| `-nt` | Specify the number of CPU cores for the multicore version. A special option `-nt AUTO` will tell IQ-TREE to automatically determine the best number of cores given the current data and computer. |
| `-ntmax` | Specify the maximal number of CPU cores `-nt AUTO` is allowed to allocate *DEFAULT: #CPU cores on the current machine* |
| `-seed` | Specify a random number seed to reproduce a previous run. This is normally used for debugging purposes. *DEFAULT: based on current machine clock* |
| `-v`   | Turn on verbose mode for printing more messages to screen. This is normally used for debugging purposes. *DEFAULT: OFF* |
| `-quiet` |  Silent mode, suppress printing to the screen. Note that `.log` file is still written. |
|  `-keep-ident` | Keep identical sequences in the alignment. Bu default: IQ-TREE will remove them during the analysis and add them in the end. |
|  `-safe`  | Turn on safe numerical mode to avoid numerical underflow for large data sets with many sequences (typically in the order of thousands). This mode is automatically turned on when having more than 2000 sequences. |
| `-mem` | Specify maximal RAM usage, for example, `-mem 64G` to use at most 64 GB of RAM. By default, IQ-TREE will try to not to exceed the computer RAM size. |

Example usages:

* Reconstruct a maximum-likelihood tree given a sequence alignment file `example.phy`:

        iqtree -s example.phy

* Reconstruct a maximum-likelihood tree using at most 8 GB RAM and automatically detect the number of cores to use:

        # For version <= 1.5.X
        iqtree-omp -s example.phy -nt AUTO -mem 8G
        
        # For version >= 1.6.0, change iqtree-omp to just iqtree
        iqtree -s example.phy -nt AUTO -mem 8G

* Like above but write all output to `myrun.*` files:

        # For version <= 1.5.X
        iqtree-omp -s example.phy -nt AUTO -mem 8G -pre myrun

        # For version <= 1.6.0
        iqtree -s example.phy -nt AUTO -mem 8G -pre myrun