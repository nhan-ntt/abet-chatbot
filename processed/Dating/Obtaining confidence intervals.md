Phylogenetic Dating

Bayesian dating with MCMCtree


From IQ-TREE 2.5 onwards, we provide the functionality in IQ-TREE to infer time trees
using Bayesian MCMCtree method.

If you use this feature, please cite:

> __P. Demotte, M. Panchaksaram, N. Ly-Trong, M. dos Reis  and B.Q. Minh__
>(2025) IQ2MC: A New Framework to Infer Phylogenetic Time Trees Using IQ-TREE
>and MCMCtree.

### Obtaining confidence intervals

To infer the confidence interval of the estimated dates, use `--date-ci` option:

	iqtree -s ALN_FILE --date DATE_FILE --date-ci 100

which will resample branch lengths 100 times to infer the confidence intervals.
Note that this is not bootstrap and the method is much faster but unpublished.
Roughly speaking, it is based on a mixture of Poisson and lognormal
distributions for a relaxed clock model. You can control the standard deviation
of the lognormal distribution via `--clock-sd` option. The default is 0.2. If
you set a higher value, the confidence interval will become wider.