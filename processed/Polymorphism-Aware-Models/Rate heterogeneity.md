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

### Rate heterogeneity

Recently, PoMo allows inference with different rate categories. As of version
`1.6`, only discrete Gamma rate heterogeneity is supported. Please be aware,
that for biological and mathematical reasons (we cannot simply scale the full
transition matrix but have to separate the mutational component from genetic
drift), the run time scales linearly with the number of rate categories. In the
future, we plan to work on decreasing run time as well as implement more rate
heterogeneity types. To use a discrete Gamma model with 4 rate categories, use:

    iqtree -s example.cf -m HKY+P+G4