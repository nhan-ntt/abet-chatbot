Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Partition model options

Partition models are used for phylogenomic data with multiple genes. You first have to prepare [a partition file in NEXUS or RAxML-style format](Complex-Models#partition-file-format). Then use the following options to input the partition file:

| Option | Usage and meaning |
|--------|------------------------------------------------------------------------------|
| `-q`   | Specify partition file for edge-equal [partition model](Complex-Models#partition-models). That means, all partitions share the same set of branch lengths (like `-q` option of RAxML). |
| `-spp` | Like `-q` but allowing partitions to have different evolutionary speeds ([edge-proportional partition model](Complex-Models#partition-models)). |
| `-sp`  | Specify partition file for [edge-unlinked partition model](Complex-Models#partition-models). That means, each partition has its own set of branch lengths (like `-M` option of RAxML). This is the most parameter-rich partition model to accomodate *heterotachy*. |