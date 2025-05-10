Advanced tutorial
Recommended for experienced users to explore more features.
To get started, please read the [Beginner's Tutorial](Tutorial) first if not done so yet.

### Tree topology tests

IQ-TREE can compute log-likelihoods of a set of trees passed via the `-z` option:

    iqtree -s example.phy -z example.treels -m GTR+G

assuming that `example.treels` is an existing file containing a set of trees in NEWICK format. IQ-TREE  first reconstructs an ML tree. Then, it will compute the log-likelihood of the  trees in `example.treels` based on the estimated parameters done for the ML tree. `example.phy.iqtree` will have a section called `USER TREES` that lists the tree IDs and the corresponding log-likelihoods.
The trees with optimized branch lengths can be found in `example.phy.treels.trees`
If you only want to evaluate the trees without reconstructing the ML tree, you can run:

    iqtree -s example.phy -z example.treels -n 0

Here, the number of search iterations is set to 0 (`-n 0`), such that model parameters are quickly estimated from an initial parsimony tree, which is normally accurate enough for our purpose. If you, however, prefer to estimate model parameters based on a tree (e.g. reconstructed previously), use `-te <treefile>` option.  

IQ-TREE also supports several tree topology tests using the RELL approximation ([Kishino et al., 1990]). This includes bootstrap proportion (BP), Kishino-Hasegawa test ([Kishino and Hasegawa, 1989]), Shimodaira-Hasegawa test ([Shimodaira and Hasegawa, 1999]), expected likelihood weights ([Strimmer and Rambaut, 2002]):

    iqtree -s example.phy -z example.treels -n 0 -zb 1000


Here, `-zb` specifies the number of RELL replicates, where 1000 is the recommended minimum number. The `USER TREES` section of `example.phy.iqtree` will list the results of BP, KH, SH, and ELW methods. 

If you also want to perform the weighted KH and weighted SH tests, simply add `-zw` option:

    iqtree -s example.phy -z example.treels -n 0 -zb 1000 -zw

Starting with version 1.4.0 IQ-TREE supports approximately unbiased (AU) test ([Shimodaira, 2002]) via `-au` option:

    iqtree -s example.phy -z example.treels -n 0 -zb 1000 -zw -au

This will perform all above tests plus the AU test.

Finally, note that IQ-TREE will automatically detect duplicated tree topologies and omit them during the evaluation.

>**HINTS**:
>
> - The KH, SH and AU tests return p-values, thus a tree is rejected if its p-value < 0.05 (marked with a `-` sign).
>
> - bp-RELL and c-ELW return posterior weights which *are not p-value*. The weights sum up to 1 across the trees tested.
>
> - The KH test ([Kishino and Hasegawa, 1989]) was designed to test 2 trees and thus has no correction for multiple testing. The SH test ([Shimodaira and Hasegawa, 1999]) fixes this problem.
>
> - However, the SH test becomes too conservative (i.e., rejecting fewer trees than expected) when testing many trees. The AU test ([Shimodaira, 2002]) fixes this problem and is thus recommended as replacement for both KH and SH tests.
{: .tip}