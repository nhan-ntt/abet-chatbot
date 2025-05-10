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

### First running example

You can now start to reconstruct a maximum-likelihood tree from this
alignment by entering (assuming that `example.cf` is in the same
folder):

    iqtree -s example.cf -m HKY+P

or, e.g.,

    iqtree -nt 4 -s example.cf -m HKY+P

if you use the multicore (OMP) version. `-s` specifies of the alignment file and
`-m` the model (HKY substitution model with polymorphisms; PoMo), similar to the
standard IQ-TREE usage. At the end of the run IQ-TREE writes the same output
files as in the standard version (see [tutorial](Tutorial)).

* `example.cf.iqtree`: the main report file that is self-readable. You should
look at this file to see the computational results. It also contains a textual
representation of the final tree.
* `example.cf.treefile`: the ML tree in NEWICK format, which can be visualized
by any supported tree viewer programs like FigTree or iTOL.
* `example.cf.log`: log file of the entire run (also printed on the screen). To
report bugs, please send this log file and the original alignment file to the
authors.

The default prefix of all output files is the alignment file name. However, you
can always change the prefix using the `-pre` option, e.g.:

    iqtree -s example.cf -pre myprefix

This prevents output files to be overwritten when you perform multiple analyses
on the same alignment within the same folder.