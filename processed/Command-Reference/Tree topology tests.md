Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Tree topology tests

IQ-TREE provides a number of tests for significant topological differences between trees. The AU test implementation in IQ-TREE is much more efficient than the original CONSEL by supporting SSE, AVX and multicore parallelization. Moreover, it is more appropriate than CONSEL for partition analysis by bootstrap resampling sites *within* partitions, whereas CONSEL is not partition-aware.

>**NOTE**: There is a discrepancy between IQ-TREE and CONSEL for the AU test: IQ-TREE implements the least-square estimate for p-values whereas CONSEL provides the maximum-likelihood estimate (MLE) for p-values. Hence, the AU p-values might be slightly different. We plan to implement MLE for AU p-values in IQ-TREE soon.

| Option | Usage and meaning |
|-------|------------------------------------------------------------------------------|
| `-z`  | Specify a file containing a set of trees. IQ-TREE will compute the log-likelihoods of all trees. |
| `-zb` | Specify the number of RELL ([Kishino et al., 1990]) replicates (>=1000) to perform several tree topology tests for all trees passed via `-z`. The tests include bootstrap proportion (BP), KH test ([Kishino and Hasegawa, 1989]), SH test ([Shimodaira and Hasegawa, 1999]) and expected likelihood weights (ELW) ([Strimmer and Rambaut, 2002]). |
| `-zw` | Used together with `-zb` to additionally perform the weighted-KH and weighted-SH tests. |
| `-au` | Used together with `-zb` to additionally perform the approximately unbiased (AU) test ([Shimodaira, 2002]). Note that you have to specify the number of replicates for the AU test via `-zb`. |
| `-n 0` | Only estimate model parameters on an initial parsimony tree and ignore a full tree search to save time. |
| `-te` | Specify a fixed user tree to estimate model parameters. Thus it behaves like `-n 0` but uses a user-defined tree instead of parsimony tree. |



Example usages:

* Given alignment `data.phy`, test a set of trees in `data.trees` using AU test with 10,000 replicates:

        iqtree -s data.phy -m GTR+G -n 0 -z data.trees -zb 10000 -au 

* Same above but for a partitioned data `partition.nex` and additionally performing weighted test:

        iqtree -s data.phy -spp partition.nex -n 0 -z data.trees -zb 10000 -au -zw