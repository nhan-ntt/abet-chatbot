Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Constructing consensus tree

IQ-TREE provides a fast implementation of consensus tree construction for post analysis:

| Option | Usage and meaning |
|-----------|------------------------------------------------------------------------------|
| `-t`      | Specify a file containing a set of trees. |
| `-con`    | Compute consensus tree of the trees passed via `-t`. Resulting consensus tree is written to `.contree` file. |
| `-net`    | Compute consensus network of the trees passed via `-t`. Resulting consensus network is written to `.nex` file. |
| `-minsup` | Specify a minimum threshold  (between 0 and 1) to keep branches in the consensus tree. `-minsup 0.5` means to compute majority-rule consensus tree. *DEFAULT: 0 to compute extended majority-rule consensus.* |
| `-bi`     | Specify a burn-in, which is the number of beginning trees passed via `-t` to discard before consensus construction. This is useful e.g. when summarizing trees from MrBayes analysis. |
| `-sup`    | Specify an input "target" tree file. That means, support values are first extracted from the trees passed via `-t`, and then mapped onto the target tree. Resulting tree with assigned support values is written to `.suptree` file. This option is useful to map and compare support values from different approaches onto a single tree. |
| `-suptag` | Specify name of a node in `-sup` target tree. The corresponding node of `.suptree` will then be assigned with IDs of trees where this node appears. Special option `-suptag ALL` will assign such IDs for all nodes of the target tree. |
| `-scale` | Set the scaling factor of support values for `-sup` option (default: 100, i.e. percentages) |
| `-prec` | Set the precision of support values for `-sup` option (default: 0) |