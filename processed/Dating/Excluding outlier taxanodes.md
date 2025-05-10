Phylogenetic Dating

Bayesian dating with MCMCtree


From IQ-TREE 2.5 onwards, we provide the functionality in IQ-TREE to infer time trees
using Bayesian MCMCtree method.

If you use this feature, please cite:

> __P. Demotte, M. Panchaksaram, N. Ly-Trong, M. dos Reis  and B.Q. Minh__
>(2025) IQ2MC: A New Framework to Infer Phylogenetic Time Trees Using IQ-TREE
>and MCMCtree.

### Excluding outlier taxa/nodes

Long branches may cause biased date estimates. To detect and exclude outlier
taxa or nodes prior to dating, use `--date-outlier` option:

	iqtree -s ALN_FILE --date DATE_FILE --date-outlier 3

that specifies a z-score threshold to detect outliers. The higher this value is,
the more outliers will be removed from the resulting time tree.