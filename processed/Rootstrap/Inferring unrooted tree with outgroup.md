

### Inferring unrooted tree with outgroup

We first demonstrate the outgroup approach to root the Bovidae family of five sampled species
(Yak, Cow, Goat, Sheep and Tibetan antelope) using two outgroup species (Pig and Whale).
Please download:

* An [input DNA alignment file](data/bovidae_outgroup.phy) for these 7 species.
* An [input partition file](data/bovidae.nex) that defines 52 genes in this alignment. 
This is a subset of the mammal dataset ([Wu et al., 2018]).

> Choosing a "good" outgroup is an entire topic on its own. In generally, 
> the outgroup must contain taxa that do not belong to the ingroup but 
> are evolutionarily close enough to the ingroup taxa. 

To infer an unrooted tree, run:

	iqtree2 -s bovidae_outgroup.phy -p bovidae.nex -B 1000 -T AUTO --prefix rev_dna_outg
	
that will invoke the ultrafast bootstrap with 1000 replicates (`-B 1000`), detect the
optimal number of threads (`-T AUTO`) and write all output files with the prefix `rev_dna_outg`.

The input alignment contains protein-coding genes. We can ask IQ-TREE to translate
the alignment into protein sequences using the standard genetic code (`-st NT2AA`) and perform
an amino-acid analysis on the translated alignment with:

	iqtree2 -s bovidae_outgroup.phy -p bovidae.nex -B 1000 -T AUTO -st NT2AA --prefix rev_aa_outg
	
where setting the prefix to `rev_aa_outg` avoids file overwriting with the previous run.
The resulting tree may now look like (extracted from `rev_aa_outg.iqtree`):

	NOTE: Tree is UNROOTED although outgroup taxon 'Yak' is drawn at root
	Numbers in parentheses are  ultrafast bootstrap support (%)

	+--Yak
	|
	+--Cow
	|
	|          +--Goat
	|       +--| (100)
	|       |  +--Sheep
	|   +---| (100)
	|   |   +---Tibetan_antelope
	+---| (100)
	    |                      +-------------------------------Wild_pig
	    +----------------------| (100)
	                           +-------------------Minke_whale


You can open `rev_aa_outg.treefile` in a tree viewer software (e.g. FigTree) and re-root
the tree on the branch separating the outgroup (`Wild_pig` and `Minke_whale`)
from the remaining ingroup to obtain an outgroup-rooted tree.

Finally, if you want you can also perform a non-partition analysis by removing the option `-p`.

Inferring rooted trees without outgroup
We will now infer a rooted tree using non-reversible models. Please download:

* An [input DNA alignment file](data/bovidae.phy) for 5 ingroup species 
(Yak, Cow, Goat, Sheep and Tibetan antelope). This is a sub-alignment of the alignment above.
We can re-use the same partition file.

To speed up the analysis, we will perform two steps. The first step is the same
as the run above to infer an unrooted tree using reversible models:

	iqtree2 -s bovidae.phy -p bovidae.nex -B 1000 -T AUTO --prefix rev_dna

This run will also write the best partitioning scheme to `rev_dna.best_scheme.nex` file.
In the second step, we will re-use this best scheme but replace the substitution model 
with the most general non-reversible DNA model, UNREST or 12.12
(see [this doc](Substitution-Models#lie-markov-models)) to obtain a rooted tree:

    iqtree2 -s bovidae.phy -p rev_dna.best_scheme.nex --model-joint UNREST -B 1000 -T AUTO --prefix nonrev_dna

The option `--model-joint UNREST` tells IQ-TREE use a linked substitution model UNREST across
all partitions. This is to avoid potential over-parameterization as this is very 
parameter-rich model with 12 parameters.

The resulting tree extracted from .iqtree file might look like this:

	NOTE: Tree is ROOTED at virtual root '__root__'
	Numbers in parentheses are  ultrafast bootstrap support (%)

           +---Yak
	+------| (72)
	|      |                                       +----------Goat
	|      |                                   +---| (100)
	|      |                                   |   +----------Sheep
	|      +-----------------------------------| (95)
	|                                          +-------------Tibetan_antelope
	|
	+**Cow
	|
	+**__root__

(You can better visualize the .treefile in a tree viewer software).

This run will write an additional tree file `nonrev_dna.rootstrap.nex` with _rootstrap_
support values (see box below for definition) annotated on every branch of the tree. If you open this file in FigTree 
it may look like this (click on "Branch Labels" and choose `rootstrap` for "Display"
as shown in the figure):

![Rooted tree with rootstrap supports for DNA](images/nonrev_dna.png)

It shows that the tree might be rooted in the branch leading to `Cow`
with a rootstrap support of 72%, which is rather low. The 2nd best
branch separating Cow and Yak from the rest has a rootstrap support of 17.9%. So with this dataset the DNA model cannot reliably tell where
the root position is, but at least provides some candidates.


> **Rootstrap**: To compute rootstrap supports, we conduct a bootstrap analysis
to obtain a number of rooted bootstrap trees using non-reversible models.
We define the rootstrap support for each branch in the maximum likelihood (ML) tree, as the proportion of 
rooted bootstrap trees that have the root on that branch. The rootstrap support values are computed for all 
the branches including external branches. The sum of the rootstrap support values along 
the tree are always smaller than or equal to one. A sum that is smaller than one can 
occur when one or more bootstrap replicates are rooted on a branch that does not occur 
in the ML tree.


We will now try the amino-acid model to see if that helps. We again use `-st NT2AA` 
option to conveniently perform this analysis:

	# step 1: infer unrooted tree with reversible models
	iqtree2 -s bovidae.phy -p bovidae.nex -B 1000 -T AUTO -st NT2AA --prefix rev_aa
	
	# step 2: infer rooted tree with linked non-reversible models
	iqtree2 -s bovidae.phy -p rev_aa.best_scheme.nex --model-joint NONREV -B 1000 -T AUTO -st NT2AA --prefix nonrev_aa
	
The option `--model-joint NONREV` tells IQ-TREE to use the most general amino-acid model
NONREV and to link the NONREV model parameters across all partitions: NONREV has
379 parameters and linking them across partitions will avoid over-parameterization.
The tree extracted from `nonrev_aa.iqtree` file now may look like:

	NOTE: Tree is ROOTED at virtual root '__root__'
	Numbers in parentheses are  ultrafast bootstrap support (%)
	
	                                 +------------Yak
	+--------------------------------| (100)
	|                                +----------------Cow
	|
	|                                   +-------------------Goat
	|                          +--------| (100)
	|                          |        +---------------------Sheep
	+--------------------------| (100)
	|                          +-----------------------------Tibetan_antelope
	|
	+**__root__

Interestingly, the amino-acid model suggests a different root position compared with the DNA model. But this position agrees with the outgroup rooting approach. And the tree `nonrev_aa.rootstrap.nex` with rootstrap supports look like:

![Rooted tree with rootstrap supports using amino-acid nonreversible model](images/nonrev_aa.png)

That means, the branch separating Yak and Cow from the rest receives a very high
rootstrap support of 99.9%. Therefore, the amino-acid model seems to have a much higher
power to detect the root, compared with the DNA model.