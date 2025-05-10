Developer guide
This guide gives developers an overview of IQ-TREE software design, data structures and discusses possibility to incorporate new models into IQ-TREE.

>**NOTICE**: This guide is still under preparation, thus the contents may change frequently.

To achieve both high performance and flexibility, IQ-TREE software has been entirely written in object oriented C++. Thus, it faciliates extending with new sequence data types or new models. IQ-TREE code consists of C++ *classes*, most of which inherits from three basal classes: `Alignment`, `ModelSubst` and `PhyloTree` to handle sequence alignments, models of substitution and phylogenetic trees, respectively. In the following we introduce these basal classes.

>**TIP**: IQ-TREE extensively uses *Standard Template Library (STL)* in C++. Thus, be first familiar with STL and fundamental STL data structures like `string`, `vector`, `set` and `map`.
{: .tip}

### PhyloTree class (phylogenetic tree)

`PhyloTree` is the base class for phylogenetic trees.