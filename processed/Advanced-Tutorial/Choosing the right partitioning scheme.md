Advanced tutorial
Recommended for experienced users to explore more features.
To get started, please read the [Beginner's Tutorial](Tutorial) first if not done so yet.

### Choosing the right partitioning scheme

ModelFinder implements a greedy strategy ([Lanfear et al., 2012]) that starts with the full partition model and subsequentially
merges two genes until the model fit does not increase any further:

    iqtree -s example.phy -p example.nex -m MFP+MERGE
    # for version 1.x change -p to -spp


Note that this command considers the FreeRate heterogeneity model (see [model selection tutorial](Tutorial#choosing-the-right-substitution-model)). If you want to resemble PartitionFinder by just considering the invariable site and Gamma rate heterogeneity (thus saving computation times), then run:

    iqtree -s example.phy -p example.nex -m TESTMERGE
    # for version 1.x change -p to -spp

After ModelFinder found the best partition, IQ-TREE will immediately start the tree reconstruction under the best-fit partition model.
Sometimes you only want to find the best-fit partition model without doing tree reconstruction, then run:

    iqtree -s example.phy -p example.nex -m MF+MERGE
    # for version 1.x change -p to -spp

To resemble PartitionFinder and save time:

    iqtree -s example.phy -p example.nex -m TESTMERGEONLY
    # for version 1.x change -p to -spp


To reduce the computational burden IQ-TREE implements the *relaxed hierarchical clustering algorithm* ([Lanfear et al., 2014]), which is invoked via `-rcluster` option:

    iqtree -s example.phy -p example.nex -m MF+MERGE -rcluster 10
    # for version 1.x change -p to -spp


to only examine the top 10% partition merging schemes (similar to the `--rcluster-percent 10` option in PartitionFinder).