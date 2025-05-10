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

### Sampling method

For advanced users. PoMo offers different methods to read in the data ([Schrempf
et al., 2016]). Briefly, each population and site are treated as follows

1. *Weighted binomial* (default, `+WB`): assign the likelihood of each PoMo
state to its probability of leading to the observed data, assuming it is
**binomially** sampled. Example:

        iqtree -s example.cf -m HKY+P+WB

2. *Weighted hypergeometric* (`+WH`): assign the likelihood of each PoMo state
to its probability of leading to the observed data, assuming it is
**hypergeometrically** sampled. Example:

        iqtree -s example.cf -m HKY+P+WH
        
3. *Sampled*: randomly draw N samples with replacement from the given data. The
N picked samples constitute a PoMo state which will be assigned a likelihood
of 1. All other PoMo states have likelihood 0. Example:

        iqtree -s example.cf -m HKY+P+S

We expect a slight overestimation of the heterozygosity for *weighted binomial*
sampling. This is because monomorphic (fixed) states can be reached from
polymorphic states during the sampling step, while polymorphic states cannot be
reached from monomorphic states (sampling does not involve mutation). I.e., only
when the level of heterozygosity at the leaves is overestimated, the sampling
step leads to the correct amount of heterozygosity observed in the data.

If you wish to avoid this effect, use *weighted hypergeometric* sampling.
However, we have observed that *weighted binomial* sampling is more stable.