Phylogenetic Dating

Bayesian dating with MCMCtree


From IQ-TREE 2.5 onwards, we provide the functionality in IQ-TREE to infer time trees
using Bayesian MCMCtree method.

If you use this feature, please cite:

> __P. Demotte, M. Panchaksaram, N. Ly-Trong, M. dos Reis  and B.Q. Minh__
>(2025) IQ2MC: A New Framework to Infer Phylogenetic Time Trees Using IQ-TREE
>and MCMCtree.

### Calibrating tree using ancestral dates

Another scenario is that we have sequences from present day and want to
calibrate the dates of the ancestral nodes. This will only work if you have 
fossil date record of at least one ancestral node in the tree. Then you again
need to prepare a date file which looks like:

```
taxon1,taxon2	      -50
taxon3,taxon4,taxon5  -100
taxon6                -10
```

which, for example, mean that the most recent common ancestor (MRCA) of `taxon1`
and `taxon2` was 50 mya (million year ago) and the MRCA of `taxon3`, `taxon4`,
`taxon5` was 100 mya. Note that **no empty space** should be added to the
comma-separated list of taxa, as empty space is used as a separator between
taxon list and dates.

Now run IQ-TREE:

    iqtree -s ALN_FILE --date DATE_FILE --date-tip 0
    
This means that except for `taxon6`, all other taxa have the date of 0 for
presence. 

If you know the root date, then you can set it via `--date-root` option.