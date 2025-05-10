Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Tree search parameters

The new IQ-TREE search algorithm ([Nguyen et al., 2015]) has several parameters that can be changed with:

| Option | Usage and meaning |
|-----------|------------------------------------------------------------------------------|
| `-allnni` | Turn on more thorough and slower NNI search. It means that IQ-TREE will consider all possible NNIs instead of only those in the vicinity of previously applied NNIs. *DEFAULT: OFF* |
| `-djc`    | Avoid computing ML pairwise distances and BIONJ tree. |
| `-fast`   | Turn on the fast tree search mode, where IQ-TREE will just construct two starting trees: maximum parsimony and BIONJ, which are then optimized by nearest neighbor interchange (NNI). Introduced in version 1.6. |
| `-g`      | Specify a topological constraint tree file in NEWICK format. The constraint tree can be a multifurcating tree and need not to include all taxa. |
| `-ninit`  | Specify number of initial parsimony trees. *DEFAULT: 100*. Here [the PLL library](http://www.libpll.org) ([Flouri et al., 2015]) is used, which implements the randomized stepwise addition and parsimony subtree pruning and regafting (SPR). |
| `-n`      | Specify number of iterations to stop. This option overrides `-nstop` criterion. |
| `-ntop`   | Specify number of top initial parsimony trees to optimize with ML nearest neighbor interchange (NNI) search to initialize the candidate set. *DEFAULT: 20* |
| `-nbest`  | Specify number of trees in the candidate set to maintain during ML tree search. *DEFAULT: 5* |
| `-nstop`  | Specify number of unsuccessful iterations to stop. *DEFAULT: 100* |
| `-pers`   | Specify perturbation strength (between 0 and 1) for randomized NNI. *DEFAULT: 0.5* |
| `-sprrad` | Specify SPR radius for the initial parsimony tree search. *DEFAULT: 6* |

>**NOTE**: While the default parameters were empirically determined to work well under our extensive benchmark ([Nguyen et al., 2015]), it might not hold true for all data sets. If in doubt that tree search is still stuck in local optima, one should repeat analysis with at least 10 IQ-TREE runs. Moreover, our experience showed that `-pers` and `-nstop` are the most relevant options to change in such case. For example, data sets with many short sequences should be analyzed with smaller perturbation strength (e.g. `-pers 0.2`) and larger number of stop iterations (e.g. `-nstop 500`).

Example usages:

* Infer an ML tree for an alignment `data.phy` with increased stopping iteration of 500 and reduced perturbation strength of 0.2:

        iqtree -s data.phy -m TEST -nstop 500 -pers 0.2

* Infer an ML tree for an alignment `data.phy` obeying a topological constraint tree `constraint.tree`:

        iqtree -s data.phy -m TEST -g constraint.tree