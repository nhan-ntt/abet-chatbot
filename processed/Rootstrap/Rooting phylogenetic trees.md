

### Rooting phylogenetic trees

Using time-reversible Markov models is a very common practice in phylogenetic analysis, 
because they provide high computational efficiency. However, these models infer _unrooted_ trees 
hence lack the ability to infer the root placement of the estimated phylogeny. 
In order to compensate for the inability of these models to root the tree, many researchers 
use external information such as using outgroup taxa or additional assumptions such as 
molecular-clocks. 

This guide provides the outgroup approach and another rooting approach using _non-reversible_ models ([Naser-Khdour et al., 2021]), which will be useful when an outgroup is lacking. Please make sure 
that you use IQ-TREE __version 2.1.3__ or later for full features below and cite this manuscript:

> S. Naser-Khdour, B.Q. Minh, R. Lanfear (2021) Assessing Confidence in Root Placement on Phylogenies: An Empirical Study Using Non-Reversible Models. <https://doi.org/10.1101/2020.07.31.230144>