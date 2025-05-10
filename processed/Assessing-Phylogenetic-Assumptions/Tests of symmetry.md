Assessing phylogenetic assumptions
It is important to know that phylogenetic models rely on various simplifying assumptions to
ease computations. If your data severely violate these assumptions, it might
cause bias in phylogenetic estimates of tree topologies and other model
parameters. Some common assumptions include _treelikeness_ (all sites
in the alignment have evolved under the same tree), _stationarity_ (nucleotide/amino-acid
frequencies remain constant over time), _reversibility_ (substitutions are equally
likely in both directions), and _homogeneity_ (substitution rates remain constant over time).

This document shows several ways to check some of these assumptions that you
should perform before doing phylogenetic analysis.

### Tests of symmetry

IQ-TREE provides three matched-pairs tests of symmetry ([Naser-Khdour et al., 2019]) to 
test the two assumptions of _stationarity_ and _homogeneity_. 
A simple analysis:

	iqtree2 -s example.phy -p example.nex --symtest-only

will perform the three tests of symmetry on every partition of the alignment
and print the result into a `.symtest.csv` file. `--symtest-only` option tells
IQ-TREE to only perform the tests of symmetry and then exit.
In this example the content of `example.nex.symtest.csv` looks like this:

```
# Matched-pair tests of symmetry
# This file can be read in MS Excel or in R with command:
#    dat=read.csv('example.nex.symtest.csv',comment.char='#')
# Columns are comma-separated with following meanings:
#    Name:    Partition name
#    SymSig:  Number of significant sequence pairs by test of symmetry
#    SymNon:  Number of non-significant sequence pairs by test of symmetry
#    SymPval: P-value for maximum test of symmetry
#    MarSig:  Number of significant sequence pairs by test of marginal symmetry
#    MarNon:  Number of non-significant sequence pairs by test of marginal symmetry
#    MarPval: P-value for maximum test of marginal symmetry
#    IntSig:  Number of significant sequence pairs by test of internal symmetry
#    IntNon:  Number of non-significant sequence pairs by test of internal symmetry
#    IntPval: P-value for maximum test of internal symmetry
Name,SymSig,SymNon,SymPval,MarSig,MarNon,MarPval,IntSig,IntNon,IntPval
part1,44,92,0.475639,50,86,0.722371,4,132,0.23869
part2,43,93,0.142052,49,87,0.205232,5,131,0.169618
part3,53,83,0.00499855,58,78,0.00164132,6,130,0.343127
```

The three important columns are:

* SymPval: a small p-value (say < 0.05) indicates that the assumptions of stationarity 
or homogeneity or both is rejected. In this case, partition `part3` does not comply with these
two assumptions (p-value = 0.00499855), whereas the other two partitions are "good".
* MarPval: a small p-value means that the assumption of stationarity is rejected.  In 
this case, only partition `part3` does not comply with the stationary condition (p-value = 0.00164132).
* IntPval: a small p-value means that the homogeneity assumption is reject. In
this case, no partitions are "bad" according to this test, i.e., they all comply with
the homogeneity assumption.

This little example shows that only `part3` is problematic by not complying with the 
stationary assumption.

Now you may want to perform the phylogenetic analysis excluding all "bad" partitions by:

	iqtree2 -s example.phy -p example.nex --symtest-remove-bad

that will remove all "bad" partitions where SymPval < 0.05 and continue the analysis with the
remaining "good" partitions. You may then compare the trees from "all" partitions
and from "good" only partitions to see if there is significant difference between them 
with [tree topology tests](Advanced-Tutorial#tree-topology-tests).

Other options can be seen when running `iqtree2 -h`:

```
TEST OF SYMMETRY:
  --symtest               Perform three tests of symmetry
  --symtest-only          Do --symtest then exist
  --symtest-remove-bad    Do --symtest and remove bad partitions
  --symtest-remove-good   Do --symtest and remove good partitions
  --symtest-type MAR|INT  Use MARginal/INTernal test when removing partitions
  --symtest-pval NUMER    P-value cutoff (default: 0.05)
  --symtest-keep-zero     Keep NAs in the tests
```