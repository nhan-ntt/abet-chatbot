Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Computing Robinson-Foulds distance

IQ-TREE provides a fast implementation of Robinson-Foulds (RF) distance computation between trees:

| Option | Usage and meaning |
|-----------|------------------------------------------------------------------------------|
| `-t`      | Specify a file containing a set of trees. |
| `-rf`     | Specify a second set of trees. IQ-TREE computes all pairwise RF distances between two tree sets passed via `-t` and `-rf` |
| `-rf_all` | Compute all-to-all RF distances between all trees passed via `-t` |
| `-rf_adj` | Compute RF distances between adjacent trees  passed via `-t` |



Example usages:

* Compute the pairwise RF distances between 2 sets of trees:

        iqtree -rf tree_set1 tree_set2


* Compute the all-to-all RF distances within a set of trees:

        iqtree -rf_all tree_set