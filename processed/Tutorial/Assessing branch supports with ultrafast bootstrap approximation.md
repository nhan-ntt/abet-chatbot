Beginner's tutorial
This tutorial gives a beginner's guide. 

Please first [download](http://www.iqtree.org/#download) and [install](Quickstart) the binary
for your platform. For the next steps, the folder containing your  `iqtree` executable should be added to your PATH enviroment variable so that IQ-TREE can be invoked by simply entering `iqtree` at the command-line. Alternatively, you can also copy `iqtree` binary into your system search.
TIP: For quick overview of all supported options in IQ-TREE, run the command  `iqtree -h`.

### Assessing branch supports with ultrafast bootstrap approximation

To overcome the computational burden required by the nonparametric bootstrap, IQ-TREE introduces an ultrafast bootstrap approximation (UFBoot) ([Minh et al., 2013]; [Hoang et al., 2018]) that is  orders of magnitude faster than the standard procedure and provides relatively unbiased branch support values. Citation for UFBoot:

> __D.T. Hoang, O. Chernomor, A. von Haeseler, B.Q. Minh, and L.S. Vinh__ (2018) UFBoot2: Improving the ultrafast bootstrap approximation. *Mol. Biol. Evol.*, 35:518–522. 
    <https://doi.org/10.1093/molbev/msx281>


To run UFBoot:

    iqtree -s example.phy -m TIM2+I+G -B 1000
    # for version 1.x change -B to -bb

 `-B`  specifies the number of bootstrap replicates where 1000
is the minimum number recommended. The section  `MAXIMUM LIKELIHOOD TREE` in  `example.phy.iqtree` shows a textual representation of the maximum likelihood tree with branch support values in percentage. The NEWICK format of the tree is printed to the file  `example.phy.treefile`. In addition, IQ-TREE writes the following files:

* `example.phy.contree`: the consensus tree with assigned branch supports where branch lengths are optimized  on the original alignment.
*  `example.phy.splits.nex`: support values in percentage for all splits (bipartitions),
computed as the occurence frequencies in the bootstrap trees.  This file can be viewed with the program [SplitsTree](http://www.splitstree.org) to explore the conflicting signals in the data. So it is more informative than consensus tree, e.g. you can see how highly supported the second best conflicting split is, which had no chance to enter the consensus tree. 
*  `example.phy.splits` (if using `-wsplits` option): This file contains the same information as `example.phy.splits.nex` but in star-dot format.

>**NOTE**: UFBoot support values have a different interpretation to the standard bootstrap. Refer to [FAQ: UFBoot support values interpretation](Frequently-Asked-Questions#how-do-i-interpret-ultrafast-bootstrap-ufboot-support-values) for more information.