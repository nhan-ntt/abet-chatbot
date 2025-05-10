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

### Bootstrap branch support

Bootstrapping works as expected with PoMo.  The standard
non-parametric bootstrap is invoked by the `-b` option, e.g., for 100
replicates:

    iqtree -s example.cf -m HKY+P -b 100

To overcome the computational burden required by the non-parametric
bootstrap, IQ-TREE introduces an ultra fast bootstrap approximation
(UFBoot) that is orders of magnitude faster than the standard
procedure and provides relatively unbiased branch support values. To
run UFBoot, use the option `-bb`, e.g., for 1000 replicates:

    iqtree -s example.cf -m HKY+P -bb 1000

For a detailed description, please refer to the [bootstrap tutorial](Tutorial#assessing-branch-supports-with-ultrafast-bootstrap-approximation).