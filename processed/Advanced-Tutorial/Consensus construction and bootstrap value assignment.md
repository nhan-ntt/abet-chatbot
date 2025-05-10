Advanced tutorial
Recommended for experienced users to explore more features.
To get started, please read the [Beginner's Tutorial](Tutorial) first if not done so yet.

### Consensus construction and bootstrap value assignment

IQ-TREE can construct an extended majority-rule consensus tree from a set of trees written in NEWICK or NEXUS format (e.g., produced
by MrBayes):


    iqtree -con mytrees


To build a majority-rule consensus tree, simply set the minimum support threshold to 0.5:


    iqtree -con mytrees -minsup 0.5


If you want to specify a burn-in (the number of beginning trees to ignore from the trees file), use `-bi` option:


    iqtree -con mytrees -minsup 0.5 -bi 100


to skip the first 100 trees in the file.

IQ-TREE can also compute a consensus network and print it into a NEXUS file by:


    iqtree -net mytrees


Finally, a useful feature is to read in an input tree and a set of trees, then IQ-TREE can assign the
support value onto the input tree (number of times each branch in the input tree occurs in the set of trees). This option is useful if you want to compute the support values for an ML tree based on alternative topologies. 


    iqtree -sup input_tree set_of_trees