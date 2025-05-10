Polymorphism-aware models
Use population data to improve inferences.

**Po**lymorphism-aware phylogenetic **Mo**dels (PoMo) improve phylogenetic
inference using population data (site frequency data). Thereby they builds on
top of DNA substitution models and naturally account for incomplete lineage
sorting. In order to run PoMo, you need more sequences per species/population
(ideally five or more chromosomes per species/population) so that information
about the site frequency spectrum is available.

Currently this model is only available in the beta version 1.6. Please download it from here:

<http://www.iqtree.org/#variant>

>**TIP**: For a quick overview of all PoMo related options in IQ-TREE,
>run the command `iqtree -h` and scroll to the heading `POLYMORPHISM AWARE MODELS (PoMo)`.
{: .tip}

If you use PoMo, please cite [Schrempf et al., 2016]:

    Dominik Schrempf, Bui Quang Minh, Nicola De Maio, Arndt von
    Haeseler, and Carolin Kosiol (2016) Reversible polymorphism-aware
    phylogenetic models and their application to tree inference.
    J. Theor. Biol., 407, 362–370.
    http://doi.org/10.1016/j.jtbi.2016.07.042.

### Level of polymorphism

As of version `1.6`, IQ-TREE with PoMo also allows fixation of the level of
heterozygosity, which is also called Watterson's theta or `4Nu`. When analyzing
population data, the amount of polymorphism is inferred during maximization of
the likelihood. However, in some situations it may be useful to set the level of
polymorphism to the observed value in the data (empirical value):

    iqtree -s example.cf -m HKY+P{EMP}

or to set the level of polymorphism by hand, e.g.,:

    iqtree -s example.cf -m HKY+P{0.0025}
    
Together with the ability to set model parameters, the model can be fully
specified, e.g.:

    iqtree -s example.cf -m HKY{6.0}+P{0.0025}
    
This sets the transition to transversion ratio to a value of `6.0` and the level
of polymorphism to a value of `0.0025`. In this case, IQ-TREE only performs a
tree search because the model is fully specified.