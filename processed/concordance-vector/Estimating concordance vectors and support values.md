Recipes
Estimating gene, site, and quartet concordance vectors

### Estimating concordance vectors and support values

Now we want to calculate gene, site, and quartet concordance vectors, and posterior probabilities (support values calculated by ASTRAL) for every branch in our species tree. To do that, we need our species tree (of course); our gene trees (gene and quartet concordance vectors are calculated from these); our alignments (site concordance vectors are calculated from these).

> Note that concordance factors and support values apply to *branches* in trees, not nodes. 

Estimate the support and quartet concordance vectors in ASTRAL

We use ASTRAL to calculate quartet concordance vectors and posterior support values (which are calculated from the quartet support values, see below for an explanation of both). 

* `-q` tells ASTRAL to use a fixed tree topology, we use the species tree we calculated above
* `-t 2` tells ASTRAL to calculate all of the things we need and annotate the tree with them

```bash
astral -q astral_species.tree -i loci.treefile -t 2 -o astral_species_annotated.tree 2> astral_species_annotated.log
```

There are two output files here, which you can download here: 
[astral_annotated.zip](https://github.com/user-attachments/files/15908295/astral_annotated.zip)


* `astral_species_annotated.tree`: the species tree with annotations on every branch 
* `astral_species_annotated.log`: the log file for ASTRAL

The annotated tree contains a lot of extra information on every branch, e.g.:

```
[q1=0.9130236794171221;q2=0.04753773093937029;q3=0.03943858964350768;f1=334.1666666666667;f2=17.398809523809526;f3=14.43452380952381;pp1
=1.0;pp2=0.0;pp3=0.0;QC=200178;EN=366.0]
```

These are explained in detail in the [ASTRAL tutorial](https://github.com/smirarab/ASTRAL/blob/master/astral-tutorial.md), but for our purposes we are interested in:

* `q1`, `q2`, and `q3`: form the quartet concordance vector (ASTRAL calls these 'quartet frequencies', 'normalised quartet frequencies', and sometimes 'quartet support values'; we argue in our paper that they are very much *not* support values)
* `pp1`: the ASTRAL posterior probability for a branch (roughly, the probability that `q1` is the highest of the three q values)

Estimate the gene and site concordance vectors in IQ-TREE

We use IQ-TREE to calculate gene and site concordance vectors (for more details see the [concordance factor page](http://www.iqtree.org/doc/Concordance-Factor)).

In the following command lines:

* `-te` tells IQ-TREE to use a fixed input tree (note that the tree we pass with `-te` differs in the two commands: the latter command uses the tree output by the former command, which sequentially adds to the labels on the tree for convenience)
* `--gcf` is the command to calculate the gCF using the gene trees we estimated above
* `-prefix` is the prefix for the output files
* `-T` is the number of threads (change this to suit your machine)
* `--scfl 100` is the command to calculate the likelihood-based sCF with 100 replicates
* `-p loci.best_model.nex` tells IQ-TREE to use the loci from `bird_400` and the models we estimated previously when calculating the gene trees (this saves a huge amount of time)

```bash
# first calculate the site concordance vectors
iqtree2 -te astral_species_annotated.tree -p loci.best_model.nex --scfl 100 --prefix scfl -T 128

# next calculate the gene concordance vectors
iqtree2 -te scfl.cf.tree --gcf loci.treefile --prefix gcf -T 128

# finally we do a dummy analysis in IQ-TREE. The only point of this is to get the branch lengths in coalescent units 
# from the ASTRAL analysis, in a format that is output by IQ-TREE in a convenient table with IQ-TREE branch ID's 
# note the -blfix option, which keeps the original branch lengths - this makes the scfs meaningless, but is here 
# simply to allow us to extract branch lengths in coalescent units frmo the ASTRAL tree in a convenient table
# we set scfl to 1, which saves time given the scfs are already meaningless, never use the sCFs from this analysis!!!
iqtree2 -te astral_species_annotated.tree -blfix -p loci.best_model.nex --scfl 1 --prefix coalescent_bl -T 128
```

These three command lines will produce a lot of output files, but the key files are:

* `gcf.cf.stat`: a table with the gCF values, as well as gDF1, gDF2, gDFP, and many other things (including all the ASTRAL labels)
* `scfl.cf.stat`: the equivalent table for scfl values (including all the ASTRAL labels)
* `coalescent_bl.cf.stat`: the dummy table from which we'll get our coalescent branch lengths
* `gcf.cf.tree`: the tree file with lots of annotations about concordance factors (plus all the ASTRAL annotations) 
* `gcf.cf.branch`: the tree file annotated with branch IDs that match those in the `.stat` files

You can download these files here: 
[stat_and_tree_files.zip](https://github.com/user-attachments/files/15949173/stat_and_tree_files.zip)

Each internal branch in `gcf.cf.tree` will be annotated like this:

`'[q1=0.570241231975882;q2=0.17602481596980715;q3=0.25373395205431093;f1=207.567808439221;f2=64.0730330130098;f3=92.3591585477691
7;pp1=1.0;pp2=1.575119358351017E-20;pp3=2.952157354351003E-20;QC=8496;EN=364.0]'/25.4/47.0:0.0055956557`

This doesn't contain all the information for the concordance vectors (see below for that) but it's still very useful:

* `q1=0.570241231975882`: this is the quartet concordance factor
* `25.4`: this is the site concordance factor
* `47.0`: this is the gene concordance factor
* `0.0055956557` this is the branch length in **substitutions per site** calculated when we calculated the site concordance factors

View the tree file

One useful thing to do is to look at these labels in the context of your species tree. To do this, you can open the file `gcf.cf.tree` in a tree viewer like [DendroScope](https://github.com/husonlab/dendroscope3/releases/latest). Just load the tree in Dendroscope, specify that the labels are edge labels when you are asked, and that's it. You can then re-root the tree, change the layout, and zoom in and out to see the edge labels you are interested in. However, the edge labels so far don't contain the full concordance vectors, so we'll get those next.