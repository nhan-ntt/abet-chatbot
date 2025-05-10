Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Automatic model selection

The default model (e.g., `HKY+F` for DNA, `LG` for protein data) may not fit well to the data. Therefore, IQ-TREE
allows to automatically determine the best-fit model via a series of `-m TEST...` option:

|Option| Usage and meaning |
|----------------------|------------------------------------------------------------------------------|
| `-m TESTONLY`          | Perform standard model selection like jModelTest (for DNA) and ProtTest (for protein). Moreover, IQ-TREE also works for codon, binary and morphogical data. If a partition file is specified, IQ-TREE will find the best-fit model for each partition. |
| `-m TEST`              | Like `-m TESTONLY` but immediately followed by tree reconstruction using the best-fit model found. So this performs both model selection and tree inference within a single run. |
| `-m TESTNEWONLY` or `-m MF` | Perform an extended model selection that additionally includes FreeRate model compared with `-m TESTONLY`. *Recommended as replacement for `-m TESTONLY`*. Note that `LG4X` is a FreeRate model, but by default is not included because it is also a protein mixture model. To include it, use `-madd` option (see table below).  |
| `-m TESTNEW` or `-m MFP` | Like `-m MF` but immediately followed by tree reconstruction using the best-fit model found. |

>**TIP**: During model section, IQ-TREE will write a model checkpoint file (suffix `.model` in version <= 1.5.X or `.model.gz` in version >= 1.6.X) that stores information of all models tested so far. Thus, if IQ-TREE is interrupted for whatever reason, restarting the run will load this file to reuse the computation.
{: .tip}

IQ-TREE version 1.6 or later allows to additionally test [Lie Markov DNA models](Substitution-Models#lie-markov-models) by adding the following keyword to `-m` option:

|Option| Usage and meaning |
|--------|------------------------------------------------------------------------------|
| `+LM`    | Additionally consider all Lie Markov models |
| `+LMRY`  | Additionally consider all Lie Markov models with RY symmetry |
| `+LMWS`  | Additionally consider all Lie Markov models with WS symmetry |
| `+LMMK`  | Additionally consider all Lie Markov models with MK symmetry |
| `+LMSS`  | Additionally consider all strand-symmetric Lie Markov models |



When [a partition file is specified](#partition-model-options) then you can append `MERGE` keyword into `-m` option to find the best-fit partitioning scheme like PartitionFinder ([Lanfear et al., 2012]). More specifically, 

|Option| Usage and meaning |
|----------------------|------------------------------------------------------------------------------|
| `-m TESTMERGEONLY`     | Select best-fit partitioning scheme by possibly merging partitions to reduce over-parameterization and increase model fit. It implements the greedy algorithm of PartitionFinder. |
| `-m TESTMERGE`         | Like `-m TESTMERGEONLY` but immediately followed by tree reconstruction using the best partitioning scheme found.     |
| `-m TESTNEWMERGEONLY` or `-m MF+MERGE` | Like `-m TESTMERGEONLY` but additionally includes FreeRate model. |
| `-m TESTNEWMERGE` or `-m MFP+MERGE` | Like `-m MF+MERGE` but immediately followed by tree reconstruction using the best partitioning scheme found. |
| `-rcluster` | Specify the percentage for the relaxed clustering algorithm ([Lanfear et al., 2014]) to speed up the computation instead of the default slow greedy algorithm. This is similar to `--rcluster-percent` option of PartitionFinder. For example, with `-rcluster 10` only the top 10% partition schemes are considered to save computations. |
| `-rclusterf` | Similar to `-rcluster` but using the **fast** relaxed clustering algorithm ([Lanfear et al., 2017]) of PartitionFinder2. Introduced in version 1.6. |
| `-rcluster-max` | Specify the absolute maximum number of partition pairs in the paritition merging phase. Default: the larger of 1000 and 10 times the number of partitions. This option is similar to `--rcluster-max` option of PartitionFinder2. |

> **WARNING**: For versions <= 1.5.X, all commands with `-m ...MERGE...` will always perform an edge-unlinked partition scheme finding even if `-spp` option is used. Only in the next phase of tree reconstruction, then an edge-linked partition model is used. However, for versions 1.6.X onwards, the edge-linked partition finding is performed by `-spp` option.

Several parameters can be set to e.g. reduce computations:

|Option| Usage and meaning |
|-------------|------------------------------------------------------------------------------|
| `-mset`     | Specify the name of a program (`raxml`, `phyml` or `mrbayes`) to restrict to only those models supported by the specified program. Alternatively, one can specify a comma-separated list of base models. For example, `-mset WAG,LG,JTT` will restrict model selection to WAG, LG, and JTT instead of all 18 AA models to save computations. |
| `-msub`     | Specify either `nuclear`, `mitochondrial`, `chloroplast` or `viral` to restrict to those AA models designed for specified source. |
| `-mfreq`    | Specify a comma-separated list of frequency types for model selection. *DEFAULT: `-mfreq FU,F` for protein models (FU = AA frequencies given by the protein matrix, F = empirical AA frequencies from the data), `-mfreq ,F1x4,F3x4,F` for codon models* |
| `-mrate`    | Specify a comma-separated list of rate heterogeneity types for model selection. *DEFAULT: `-mrate E,I,G,I+G` for standard procedure, `-mrate E,I,G,I+G,R` for new selection procedure*. (E means Equal/homogeneous rate model). |
| `-cmin`     | Specify minimum number of categories for FreeRate model. *DEFAULT: 2* |
| `-cmax`     | Specify maximum number of categories for FreeRate model. It is recommended to increase if alignment is long enough. *DEFAULT: 10* |
| `-merit` | Specify either `AIC`, `AICc` or `BIC` for the optimality criterion to apply for new procedure. *DEFAULT: all three criteria are considered* |
| `-mtree`    | Turn on full tree search for each model considered, to obtain more accurate result. Only recommended if enough computational resources are available. *DEFAULT: fixed starting tree* |
| `-mredo`    | Ignore model checkpoint file computed earlier. *DEFAULT: model checkpoint file (if exists) is loaded to reuse previous computations* |
| `-madd`     | Specify a comma-separated list of mixture models to additionally consider for model selection. For example, `-madd LG4M,LG4X` to additionally include these two [protein mixture models](Substitution-Models#protein-models). |
| `-mdef`     | Specify a [NEXUS model file](Complex-Models#nexus-model-file) to define new models. |

>**NOTE**: Some of the above options require a comma-separated list, which should not contain any empty space!

Example usages:

* Select best-fit model for alignment `data.phy` based on Bayesian information criterion (BIC):

        iqtree -s data.phy -m TESTONLY

* Select best-fit model for a protein alignment `prot.phy` using the new testing procedure and only consider WAG, LG and JTT matrix to save time:

        iqtree -s prot.phy -m MF -mset WAG,LG,JTT
        
* Find the best partitioning scheme for alignment `data.phy` and partition file `partition.nex` with a relaxed clustering at 10% to save time:

        iqtree -s data.phy -spp partition.nex -m TESTMERGEONLY -rcluster 10