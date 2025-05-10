Frequently asked questions
For common questions and answers.

### What are the differences between alignment columns/sites and patterns?

Columns are the columns/sites in the alignment and the number of columns is the length of the alignment. In the alignment there might be the same columns. Different columns are called patterns. While (parsimony) informative sites are patterns that have at least two different characters (nucleotides or amino acids) and each character should occur in at least two species. Essentially, informative sites have information for the grouping of species. These patterns are mainly important in the context of parsimony, where no evolutionary model is used. In maximum likelihood inference all patterns containing different characters are important for the estimation of tree topology and branch lengths, while constant/invariant sites (containing only the same character: only A's or only G's etc) are important for the correct estimation of the branch lengths. Therefore, should not be excluded from the alignment.

Example:

```
            123456789
species_1   AACGTACGT
species_2   AACGATCGT
species_3   AACCGTCCT
species_4   AACCTACCT
```

* sites/columns 1 and 2 are identical and contain only A's - invariant site pattern, uninformative
* sites/columns 3 and 7 are identical and contain only C's - invariant site pattern, uninformative
* sites/columns 4 and 8 are identical and contain 2 G'c and 2 C's - informative site pattern
* sites/columns 5, 6 and 9 occur only once, each site is a different pattern. 5th is uninformative, 6th is informative, 9th is invariant and uninformative 

Summing up, the alignment has 9 columns, 

6 patterns 

```
A C G T A T
A C G A T T
A C C G T T
A C C T A T
```

(2 informative)

```
G A 
G T 
C T 
C A
```

[Guindon et al., 2010]: https://doi.org/10.1093/sysbio/syq010
[Minh et al., 2013]: https://doi.org/10.1093/molbev/mst024
[Ranwez et al., 2011]: https://doi.org/10.1371/journal.pone.0022594