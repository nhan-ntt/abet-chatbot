Phylogenetic Dating

Bayesian dating with MCMCtree


From IQ-TREE 2.5 onwards, we provide the functionality in IQ-TREE to infer time trees
using Bayesian MCMCtree method.

If you use this feature, please cite:

> __P. Demotte, M. Panchaksaram, N. Ly-Trong, M. dos Reis  and B.Q. Minh__
>(2025) IQ2MC: A New Framework to Infer Phylogenetic Time Trees Using IQ-TREE
>and MCMCtree.

### Dating an existing tree

If you already have a tree, you can use option `-te TREE_FILE` to ask IQ-TREE to
load and fix this tree topology:

	iqtree -s ALN_FILE --date DATE_FILE -te TREE_FILE

This will work with the scenarios above, i.e., IQ-TREE will date the
user-defined tree instead of the ML tree. To further speed up the process: If
you know the model already, you set can it via `-m` option; or in a partitioned
analysis, you can provide a partition file with specified models.