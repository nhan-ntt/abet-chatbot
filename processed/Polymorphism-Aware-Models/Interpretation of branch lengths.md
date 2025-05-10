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

### Interpretation of branch lengths

PoMo estimates the branch length in number of mutations and frequency
shifts (drift) per site.  The number of drift events compared to the
number of mutations becomes higher if
the [virtual population size](#virtual-population-size) is increased.
To get the branch length measured in number of substitutions per site
which enables a comparison to the branch length estimated by standard
DNA substitution models, it has to be divided by `N^2`.  PoMo also
outputs the total tree length measured in number of substitutions per
site in `example.cf.iqtree`.  An example of the relevant section:

    NOTE: The branch lengths of PoMo measure mutations and frequency shifts.
    To compare PoMo branch lengths to DNA substitution models use the tree length
    measured in substitutions per site.

    Total tree length (sum of branch lengths)
     - measured in number of mutations and frequency shifts per site: 0.71200751
     - measured in number of substitutions per site (divided by N^2): 0.00879022
    Sum of internal branch lengths
    - measured in mutations and frequency shifts per site: 0.01767814 (2.48285810% of tree length)
    - measured in substitutions per site: 0.01767814 (2.48285810% of tree length)


[Schrempf et al., 2016]: http://dx.doi.org/10.1016/j.jtbi.2016.07.042