Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Ancestral sequence reconstruction

This feature is newly introduced in version 1.6. You can combine this feature with `-te` option to determine ancestral sequences along a user-defined tree (Otherwise, IQ-TREE computes ancestral sequences of the ML tree).

| Option | Usage and meaning |
|----------|------------------------------------------------------------------------------|
| `-asr`     | Write ancestral sequences (by empirical Bayesian method) for all nodes of the tree to `.state` file. |
| `-asr-min` | Specify the minimum threshold of posterior probability to determine the best ancestral state. Default: observed state frequency from the alignment. | 
| `-te`      | Specify a user-defined tree to determine ancestral sequences along this tree. You can assign each node of this tree with a node name, and IQ-TREE will report the ancestral sequences of the corresponding nodes. If nodes do not have names, IQ-TREE will automatically assign node names as Node1, Node2, etc. |

Example usages:

    iqtree -s example.phy -m JC+G -asr

The first few lines of the output file `example.phy.state` may look like this:

    # Ancestral state reconstruction for all nodes in example.phy.treefile
    # This file can be read in MS Excel or in R with command:
    #   tab=read.table('example.phy.state',header=TRUE)
    # Columns are tab-separated with following meaning:
    #   Node:  Node name in the tree
    #   Site:  Alignment site ID
    #   State: Most likely state assignment
    #   p_X:   Posterior probability for state X (empirical Bayesian method)
    Node    Site    State   p_A     p_C     p_G     p_T
    Node2   1       C       0.00004 0.99992 0.00002 0.00002
    Node2   2       A       0.92378 0.00578 0.00577 0.06468
    Node2   3       A       0.95469 0.02634 0.00675 0.01222
    Node2   4       C       0.00002 0.99992 0.00002 0.00004
    ...