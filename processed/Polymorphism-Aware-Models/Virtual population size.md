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

### Virtual population size

PoMo describes the evolution of populations along a phylogeny by means of a
virtual population of constant size `N`, which defaults to nine (for details,
see [Schrempf et al., 2016]). This is a good and stable default value. If only
very few chromosomes have been sequenced per population (e.g., two to four), `N`
should be lowered to the average number of chromosomes per population. If enough
data is available and calculations are not too time consuming, we advise to
increase N up to a maximum of 19. You can choose odd values from three to 19 as
well as 2 and 10. E.g., to set N to 19:

    iqtree -s example.cf -m HKY+P+N19