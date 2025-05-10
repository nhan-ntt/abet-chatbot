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

### Counts files

The input of PoMo is allele frequency data. Especially, when populations have
many individuals it is preferable to count the number of bases at each position
compared to providing data for each chromosome in a FASTA file. Thereby file
size is decreased and parsed faster.

Counts files contain:

- One headerline that specifies the file as counts file and states the number of
  populations (leaves on the tree) as well as the number of sites (separated by
  white space).

- A second headerline with white space separated headings: CRHOM
  (chromosome), POS (position) and sequence names.
   
- Many lines with counts of A, C, G and T bases and their respective
  positions.

Comments:

- Lines before the first headerline starting with # are treated as comments.

Example:

    COUNTSFILE  NPOP 5   NSITES N
    CHROM  POS  Sheep    BlackSheep  RedSheep  Wolf     RedWolf
    1      1    0,0,1,0  0,0,1,0     0,0,1,0   0,0,5,0  0,0,0,1
    1      2    0,0,0,1  0,0,0,1     0,0,0,1   0,0,0,5  0,0,0,1
    .
    .
    .
    9      8373 0,0,0,1  1,0,0,0     0,1,0,0   0,1,4,0  0,0,1,0
    .
    .
    .
    Y      9999 0,0,0,1  0,1,0,0     0,1,0,0   0,5,0,0  0,0,1,0

The download also includes an example counts file called
[`example.cf`](https://github.com/Cibiv/IQ-TREE/blob/PoMo/example/example.cf).
This file is a subset of the
[great ape data](https://github.com/pomo-dev/data/tree/master/SystBiol2015)
that has been analyzed in one of our publications. It includes twelve
great ape population with one to 23 inividuals each (two to 56
chromosomes).

Conversion scripts

If you do not want to create counts files with your own scripts, you can use the
python script that we provide. For detailed instructions, please refer to the
[GitHub repository of the counts file library
`cflib`](https://github.com/pomo-dev/cflib).