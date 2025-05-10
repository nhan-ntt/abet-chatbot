Phylogenetic Dating

Bayesian dating with MCMCtree


From IQ-TREE 2.5 onwards, we provide the functionality in IQ-TREE to infer time trees
using Bayesian MCMCtree method.

If you use this feature, please cite:

> __P. Demotte, M. Panchaksaram, N. Ly-Trong, M. dos Reis  and B.Q. Minh__
>(2025) IQ2MC: A New Framework to Infer Phylogenetic Time Trees Using IQ-TREE
>and MCMCtree.

### Least Square Dating (LSD2)

Since IQ-TREE 2.0.3, we integrate the least square dating (LSD2) method to build
a time tree when you have date information for tips or ancestral nodes. So if
you use this feature please cite: 

__Thu-Hien To, Matthieu Jung, Samantha Lycett, Olivier Gascuel__ (2016)
Fast dating using least-squares criteria and algorithms. _Syst. Biol._ 65:82-97.
<https://doi.org/10.1093/sysbio/syv068>

We will now walk through examples but the full options are:

```
TIME TREE RECONSTRUCTION:
  --date FILE          Dates of tips or ancestral nodes
  --date TAXNAME       Extract dates from taxon names after last '|'
  --date-tip STRING    Tip dates as a real number or YYYY-MM-DD
  --date-root STRING   Root date as a real number or YYYY-MM-DD
  --date-ci NUM        Number of replicates to compute confidence interval
  --clock-sd NUM       Std-dev for lognormal relaxed clock (default: 0.2)
  --date-outlier NUM   Z-score cutoff to exclude outlier nodes (e.g. 3)
  --date-options ".."  Extra options passing directly to LSD2
```

>**DISCLAIMER**: Please download version 2.0.6 with new options like
>`--date-ci`. 
>
>This feature is new and might still have bugs. So suggestions and bug reports
>are much welcome.