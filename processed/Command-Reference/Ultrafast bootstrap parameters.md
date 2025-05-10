Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Ultrafast bootstrap parameters

The ultrafast bootstrap (UFBoot) approximation ([Minh et al., 2013]; [Hoang et al., in press]) has several parameters that can be changed with:

| Option | Usage and meaning |
|----------|------------------------------------------------------------------------------|
| `-bb`    | Specify number of bootstrap replicates (>=1000). |
| `-bcor`  | Specify minimum correlation coefficient for UFBoot convergence criterion. *DEFAULT: 0.99* |
| `-beps`  | Specify a small epsilon to break tie in RELL evaluation for bootstrap trees. *DEFAULT: 0.5* |
| `-bnni` | Perform an additional step to further optimize UFBoot trees by nearest neighbor interchange (NNI) based directly on bootstrap alignments. This option is recommended in the presence of **severe model violations**. It increases computing time by 2-fold but reduces the risk of overestimating branch supports due to severe model violations. Introduced in IQ-TREE 1.6. |
| `-bsam` | Specify the resampling strategies for partitioned analysis. By default, IQ-TREE resamples alignment sites within partitions. With `-bsam GENE` IQ-TREE will resample partitions. With `-bsam GENESITE` IQ-TREE will resample partitions and then resample sites within resampled partitions ([Gadagkar et al., 2005]; [Seo et al., 2005]). |
| `-nm`    | Specify maximum number of iterations to stop. *DEFAULT: 1000* |
| `-nstep` | Specify iteration interval checking for UFBoot convergence. *DEFAULT: every 100 iterations* |
| `-wbt`   | Turn on writing bootstrap trees to `.ufboot` file. *DEFAULT: OFF* |
| `-wbtl`  | Like `-wbt` but bootstrap trees written with branch lengths. *DEFAULT: OFF* |

Example usages:

* Select best-fit model, infer an ML tree and perform ultrafast bootstrap with 1000 replicates:

        iqtree -s data.phy -m TEST -bb 1000

* Reconstruct ML and perform ultrafast bootstrap (5000 replicates) under a partition model file `partition.nex`:

        iqtree -s data.phy -spp partition.nex -m TEST -bb 5000