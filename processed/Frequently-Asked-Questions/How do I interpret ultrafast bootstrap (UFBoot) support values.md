Frequently asked questions
For common questions and answers.

### How do I interpret ultrafast bootstrap (UFBoot) support values?

The ultrafast bootstrap (UFBoot) feature (`-bb` option) was published in ([Minh et al., 2013]). 
One conclusions from the __analysis of many gene trees__ is that UFBoot support values are
more unbiased: 95% support correspond roughly to a probability of 95% that a
clade is true. So this has a different meaning than the normal (more conservative) 
bootstrap supports.
For UFBoot, you should only start to rely on a branch if its support is >=
95%. Thus, the interpretations are different and you should not compare BS% with
UFBoot% directly.

Moreover, it is recommended to also perform the SH-aLRT test ([Guindon et al., 2010]), 
e.g., by adding `-alrt 1000` into the IQ-TREE command line. Each branch will
then be assigned with SH-aLRT and UFBoot supports. One would be more confident 
if a clade has its SH-aLRT >= 80% and UFboot >= 95%. 

> NOTE: These recommendations only apply to single gene trees. If you reconstruct
> a "concatenation" tree from many genes in a phylogenomic analysis, they do not
> hold anymore. In fact, UFBoot supports and even the more conservative Felsenstein's 
> bootstrap supports will tend to be 100% and there has been plenty of literature
> about this issue. You are recommended to compute concordance factors for
> any phylogenomic analysis.