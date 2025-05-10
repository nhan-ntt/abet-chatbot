Beginner's tutorial
This tutorial gives a beginner's guide. 

Please first [download](http://www.iqtree.org/#download) and [install](Quickstart) the binary
for your platform. For the next steps, the folder containing your  `iqtree` executable should be added to your PATH enviroment variable so that IQ-TREE can be invoked by simply entering `iqtree` at the command-line. Alternatively, you can also copy `iqtree` binary into your system search.
TIP: For quick overview of all supported options in IQ-TREE, run the command  `iqtree -h`. 
### Input data



IQ-TREE takes as input a *multiple sequence alignment* and will reconstruct an evolutionary tree that is best explained by the input data. If you have raw (unaligned) sequences, you need to first run an alignment program like [MAFFT](http://mafft.cbrc.jp/alignment/software/) or [ClustalW](http://www.clustal.org) to align the sequences, before feeding them into IQ-TREE.

The input alignment can be in various common formats. For example the [PHYLIP format](http://evolution.genetics.washington.edu/phylip/doc/sequence.html) which may look like:

    7 28
    Frog       AAATTTGGTCCTGTGATTCAGCAGTGAT
    Turtle     CTTCCACACCCCAGGACTCAGCAGTGAT
    Bird       CTACCACACCCCAGGACTCAGCAGTAAT
    Human      CTACCACACCCCAGGAAACAGCAGTGAT
    Cow        CTACCACACCCCAGGAAACAGCAGTGAC
    Whale      CTACCACGCCCCAGGACACAGCAGTGAT
    Mouse      CTACCACACCCCAGGACTCAGCAGTGAT

This tiny alignment contains 7 DNA sequences from several animals with the sequence length of 28 nucleotides. IQ-TREE also supports other file formats such as FASTA, NEXUS, CLUSTALW. The FASTA file for the above example may look like this:

    >Frog       
    AAATTTGGTCCTGTGATTCAGCAGTGAT
    >Turtle     
    CTTCCACACCCCAGGACTCAGCAGTGAT
    >Bird       
    CTACCACACCCCAGGACTCAGCAGTAAT
    >Human      
    CTACCACACCCCAGGAAACAGCAGTGAT
    >Cow        
    CTACCACACCCCAGGAAACAGCAGTGAC
    >Whale      
    CTACCACGCCCCAGGACACAGCAGTGAT
    >Mouse      
    CTACCACACCCCAGGACTCAGCAGTGAT

>**TIP**: From version 2 you can input a directory of alignment files. IQ-TREE 2 will load and concatenate all alignments within the directory, eliminating the need for users to manually perform this step.
{: .tip}

Not all special characters are allowed in sequence names, because they may interfere with the structure encoding in the Newick tree files. To avoid problems with downstream software (like tree viewers), IQ-Tree (and also other phylogenetic software) checks the names for such potentially interfering characters and substitutes them by underscores `_`. 
Permitted characters in sequence names are alphanumeric letters, underscores `_`, dash `-`, dot `.`, slash `\` and vertical bar `|`. All other characters are substituted, like e.g. `hawk's-eye` is converted to `hawk_s-eye` as which it will appear in the tree.

Please note, this can lead to duplicate names if you, for instance, already have two sequences named `hawk_s-eye` and `hawk's-eye`. In such cases you will obtain an error and you need to adjust the names in the original input alignment.


### First running example



From the download there is an example alignment called `example.phy`
 in PHYLIP format. This example contains parts of the mitochondrial DNA sequences of several animals (Source: [Phylogenetic Handbook](http://www.kuleuven.be/aidslab/phylogenybook/home.html)).
 
You can now start to reconstruct a maximum-likelihood tree
from this alignment by entering (assuming that you are now in the same folder with `example.phy`):

    iqtree -s example.phy

`-s` is the option to specify the name of the alignment file that is always required by
IQ-TREE to work. At the end of the run IQ-TREE will write several output files including:

* `example.phy.iqtree`: the main report file that is self-readable. You
should look at this file to see the computational results. It also contains a textual representation of the final tree (see below). 
* `example.phy.treefile`: the ML tree in NEWICK format, which can be visualized
by any supported tree viewer programs like FigTree or  iTOL. 
* `example.phy.log`: log file of the entire run (also printed on the screen). To report
bugs, please send this log file and the original alignment file to the authors.

For this example data the resulting maximum-likelihood tree may look like this (extracted from `.iqtree` file):

    NOTE: Tree is UNROOTED although outgroup taxon 'LngfishAu' is drawn at root

    +--------------LngfishAu
    |
    |        +--------------LngfishSA
    +--------|
    |        +--------------LngfishAf
    |
    |      +-------------------Frog
    +------|
           |               +-----------------Turtle
           |         +-----|
           |         |     |      +-----------------------Sphenodon
           |         |     |   +--|
           |         |     |   |  +--------------------------Lizard
           |         |     +---|
           |         |         |      +---------------------Crocodile
           |         |         +------|
           |         |                +------------------Bird
           +---------|
                     |                  +----------------Human
                     |               +--|
                     |               |  |  +--------Seal
                     |               |  +--|
                     |               |     |   +-------Cow
                     |               |     +---|
                     |               |         +---------Whale
                     |          +----|
                     |          |    |         +------Mouse
                     |          |    +---------|
                     |          |              +--------Rat
                     +----------|
                                |   +----------------Platypus
                                +---|
                                    +-------------Opossum


This makes sense as the mammals (`Human` to `Opossum`) form a clade, whereas the reptiles (`Turtle` to `Crocodile`) and `Bird` form a separate sister clade. Here the tree is drawn at the *outgroup* Lungfish which is more accient than other species in this example. However, please note that IQ-TREE always produces an **unrooted tree** as it knows nothing about this biological background; IQ-TREE simply draws the tree this way as `LngfishAu` is the first sequence occuring in the alignment. 

During the example run above, IQ-TREE periodically wrote to disk a checkpoint file `example.phy.ckp.gz` (gzip-compressed to save space). This checkpoint file is used to resume an interrupted run, which is handy if you have a very large data sets or time limit on a cluster system. If the run did not finish, invoking IQ-TREE again with the very same command line will recover the analysis from the last stopped point, thus saving all computation time done before. 

If the run successfully completed, running again will issue an error message:

    ERROR: Checkpoint (example.phy.ckp.gz) indicates that a previous run successfully finished
    Use `-redo` option if you really want to redo the analysis and overwrite all output files.
    
This prevents lost of data if you accidentally re-run IQ-TREE. However, if you really want to re-run the analysis and overwrite all previous output files, use `-redo` option: 

    iqtree -s example.phy -redo


Finally, the default prefix of all output files is the alignment file name. You can  
change the prefix with:

    iqtree -s example.phy --prefix myprefix
    # for version 1.x change --prefix to -pre

This prevents output files being overwritten when you perform multiple analyses on the same alignment within the same folder.


### Choosing the right substitution model



NOTE: If you use model selection please cite the following paper:

> __S. Kalyaanamoorthy, B.Q. Minh, T.K.F. Wong, A. von Haeseler, and L.S. Jermiin__ (2017) ModelFinder: fast model selection for accurate phylogenetic estimates. _Nat. Methods_, 14:587–589. 
    DOI: [10.1038/nmeth.4285](https://doi.org/10.1038/nmeth.4285)

IQ-TREE supports a wide range of [substitution models](Substitution-Models) for DNA, protein, codon, binary and morphological alignments. If you do not know which model is appropriate for your data, you can use ModelFinder to determine the best-fit model:

    iqtree -s example.phy -m MFP
    # change -m MFP to -m TEST to resemble jModelTest/ProtTest
        

`-m` is the option to specify the model name to use during the analysis. The special `MFP` key word stands for _ModelFinder Plus_, which tells IQ-TREE to perform ModelFinder and the remaining analysis using the selected model. ModelFinder computes the log-likelihoods
of an initial parsimony tree for many different models and the *Akaike information criterion* (AIC), *corrected Akaike information criterion* (AICc), and the *Bayesian information criterion* (BIC).
Then ModelFinder chooses the model that minimizes the BIC score (you can also change to AIC or AICc by 
adding the option `-AIC` or `-AICc`, respectively).

>**TIP**: Starting with version 1.5.4, `-m MFP` is the default behavior. Thus, this run is equivalent to `iqtree -s example.phy`.
{: .tip}

Here, IQ-TREE will write an additional file:

* `example.phy.model`: log-likelihoods for all models tested. It serves as a checkpoint file to recover an interrupted model selection.

If you now look at `example.phy.iqtree` you will see that IQ-TREE selected `TIM2+I+G4` as the best-fit model for this example data. Thus, for additional analyses you do not have to perform the model test again and can use the selected model:

    iqtree -s example.phy -m TIM2+I+G

Sometimes you only want to find the best-fit model without doing tree reconstruction, then run:

    iqtree -s example.phy -m MF
    # change -m MF to -m TESTONLY to resemble jModelTest/ProtTest
    
By default, the maximum number of categories is limitted to 10 due to computational reasons. If your sequence alignment is long enough, then you can increase this upper limit with the `cmax` option:

    iqtree -s example.phy -m MF -cmax 15
    

will test `+R2` to `+R15` instead of at most `+R10`.

To reduce computational burden, one can use the option `-mset` to restrict the testing procedure to a subset of base models instead of testing the entire set of all available models. For example, `-mset WAG,LG` will test only models like `WAG+...` or `LG+...`. Another useful option in this respect is `-msub` for AA data sets. With `-msub nuclear` only general AA models are included, whereas with `-msub viral` only AA models for viruses are included.

If you have enough computational resource, you can perform a thorough and more accurate analysis that invokes a full tree search for each model considered via the `-mtree` option:

    iqtree -s example.phy -m MF -mtree



### Using codon models



IQ-TREE supports a number of [codon models](Substitution-Models#codon-models). You need to input a protein-coding DNA alignment and specify codon data by option `-st CODON` (Otherwise, IQ-TREE applies DNA model because it detects that your alignment has DNA sequences):

    iqtree -s coding_gene.phy -st CODON 

If your alignment length is not divisible by 3, IQ-TREE will stop with an error message. IQ-TREE will group sites 1,2,3 into codon site 1; sites 4,5,6 to codon site 2; etc. Moreover, any codon, which has at least one gap/unknown/ambiguous nucleotide, will be treated as unknown codon character.

Note that the above command assumes the standard genetic code. If your sequences follow 'The Invertebrate Mitochondrial Code' (see [the full list of supported genetic code here](Substitution-Models#codon-models)), then run:

    iqtree -s coding_gene.phy -st CODON5 


### Binary, morphological and SNP data



Binary alignments contain sequences with characters 0 and 1, which can be in any common formats supported by IQ-TREE, for example, in PHYLIP format:

    4 6
    S1   010101
    S2   110011
    S3   0--100
    S4   10--10

Morphological alignments have an extended characeter alphabet of 0-9 and A-Z (for states 10-31). For example (PHYLIP format):

    4 10
    S1   0123401234
    S2   03---20432
    S3   3202-04--0
    S4   4230120340

IQ-TREE will automatically determine the sequence type and the alphabet size. To run IQ-TREE on such alignments:

    iqtree -s morphology.phy

or

    iqtree -s morphology.phy -st MORPH

IQ-TREE implements to two morphological ML models: [MK and ORDERED](Substitution-Models#binary-and-morphological-models). Morphological data typically do not have constant (uninformative) sites. 
In such cases, you should apply [ascertainment bias correction](Substitution-Models#ascertainment-bias-correction) model by e.g.:
 
    iqtree -s morphology.phy -st MORPH -m MK+ASC

You can again select the best-fit binary/morphological model:

    iqtree -s morphology.phy -st MORPH


For SNP data (DNA) that typically do not contain constant sites, you can explicitly tell the model to include
ascertainment bias correction:

    iqtree -s SNP_data.phy -m GTR+ASC

You can explicitly tell model testing to only include  `+ASC` model with:

    iqtree -s SNP_data.phy -m MFP+ASC



### Assessing branch supports with ultrafast bootstrap approximation



To overcome the computational burden required by the nonparametric bootstrap, IQ-TREE introduces an ultrafast bootstrap approximation (UFBoot) ([Minh et al., 2013]; [Hoang et al., 2018]) that is  orders of magnitude faster than the standard procedure and provides relatively unbiased branch support values. Citation for UFBoot:

> __D.T. Hoang, O. Chernomor, A. von Haeseler, B.Q. Minh, and L.S. Vinh__ (2018) UFBoot2: Improving the ultrafast bootstrap approximation. *Mol. Biol. Evol.*, 35:518–522. 
    <https://doi.org/10.1093/molbev/msx281>


To run UFBoot:

    iqtree -s example.phy -m TIM2+I+G -B 1000
    # for version 1.x change -B to -bb

 `-B`  specifies the number of bootstrap replicates where 1000
is the minimum number recommended. The section  `MAXIMUM LIKELIHOOD TREE` in  `example.phy.iqtree` shows a textual representation of the maximum likelihood tree with branch support values in percentage. The NEWICK format of the tree is printed to the file  `example.phy.treefile`. In addition, IQ-TREE writes the following files:

* `example.phy.contree`: the consensus tree with assigned branch supports where branch lengths are optimized  on the original alignment.
*  `example.phy.splits.nex`: support values in percentage for all splits (bipartitions),
computed as the occurence frequencies in the bootstrap trees.  This file can be viewed with the program [SplitsTree](http://www.splitstree.org) to explore the conflicting signals in the data. So it is more informative than consensus tree, e.g. you can see how highly supported the second best conflicting split is, which had no chance to enter the consensus tree. 
*  `example.phy.splits` (if using `-wsplits` option): This file contains the same information as `example.phy.splits.nex` but in star-dot format.

>**NOTE**: UFBoot support values have a different interpretation to the standard bootstrap. Refer to [FAQ: UFBoot support values interpretation](Frequently-Asked-Questions#how-do-i-interpret-ultrafast-bootstrap-ufboot-support-values) for more information.


### Reducing impact of severe model violations with UFBoot



Starting with IQ-TREE version 1.6 we provide a new option `-bnni` to reduce the risk of overestimating branch supports with UFBoot due to severe model violations. With this option UFBoot will further optimize each bootstrap tree using a hill-climbing nearest neighbor interchange (NNI) search based directly on the corresponding bootstrap alignment.

Thus, if severe model violations are present in the data set at hand, users are advised to append `-bnni` to the regular UFBoot command:

    iqtree -s example.phy -m TIM2+I+G -B 1000 -bnni
    # for version 1.x change -B to -bb
    


### Assessing branch supports with  standard nonparametric bootstrap


The standard nonparametric bootstrap is invoked by  the  `-b` option:

    iqtree -s example.phy -m TIM2+I+G -b 100

 `-b` specifies the number of bootstrap replicates where 100
is the minimum recommended number. The output files are similar to those produced by the UFBoot procedure. 



### Assessing branch supports with single branch tests



IQ-TREE provides an implementation of the SH-like approximate likelihood ratio test ([Guindon et al., 2010]). To perform this test,  run:

    iqtree -s example.phy -m TIM2+I+G -alrt 1000

 `-alrt` specifies the number of bootstrap replicates for SH-aLRT where 1000 is the minimum number recommended. 

IQ-TREE also supports other tests such as the aBayes test ([Anisimova et al., 2011]) and the local bootstrap test ([Adachi and Hasegawa, 1996b]). See [single branch tests](Command-Reference#single-branch-tests) for more details.

You can also perform both SH-aLRT and the ultrafast bootstrap within one single run:

    iqtree -s example.phy -m TIM2+I+G -alrt 1000 -B 1000
    # for version 1.x change -B to -bb

The branches of the resulting `.treefile` will be assigned with both SH-aLRT and UFBoot support values, which are readable by any tree viewer program like FigTree, Dendroscope or ETE. You can also look at the textual tree figure in `.iqtree` file:

    NOTE: Tree is UNROOTED although outgroup taxon 'LngfishAu' is drawn at root
    Numbers in parentheses are SH-aLRT support (%) / ultrafast bootstrap support (%)

    +-------------LngfishAu
    |
    |       +--------------LngfishSA
    +-------| (100/100)
    |       +------------LngfishAf
    |
    |      +--------------------Frog
    +------| (99.8/100)
           |                     +-----------------Turtle
           |                  +--| (85/72)
           |                  |  |    +------------------------Crocodile
           |                  |  +----| (96.5/97)
           |                  |       +------------------Bird
           |               +--| (39/51)
           |               |  +---------------------------Sphenodon
           |         +-----| (98.2/99)
           |         |     +-------------------------------Lizard
           +---------| (100/100)
                     |                   +--------------Human
                     |                +--| (92.3/93)
                     |                |  |  +------Seal
                     |                |  +--| (68.3/75)
                     |                |     |  +-----Cow
                     |                |     +--| (99.7/100)
                     |                |        +-------Whale
                     |           +----| (99.1/100)
                     |           |    |         +---Mouse
                     |           |    +---------| (100/100)
                     |           |              +------Rat
                     +-----------| (100/100)
                                 |  +--------------Platypus
                                 +--| (93/98)
                                    +-----------Opossum


From this figure, the branching patterns within reptiles are poorly supported (e.g. `Sphenodon` with SH-aLRT: 39%, UFBoot: 51% and `Turtle` with SH-aLRT: 85%, UFBoot: 72%) as well as the phylogenetic position of `Seal` within mammals (SH-aLRT: 68.3%, UFBoot: 75%). Other branches appear to be well supported.


### Utilizing multi-core CPUs



IQ-TREE can utilize multiple CPU cores to speed up the analysis. A complement option `-T` (or `-nt` for version 1.x) allows specifying the number of CPU cores to use. For example:

    iqtree -s example.phy -m TIM2+I+G -T 2
    # for version 1.x change -T to -nt
    

Here, IQ-TREE will use 2 CPU cores to perform the analysis. 

Note that the parallel efficiency is only good for long alignments. A good practice is to use `-T AUTO` to determine the best number of cores:

    iqtree -s example.phy -m TIM2+I+G -T AUTO
    # for version 1.x change -T to -nt

Then while running IQ-TREE may print something like this on to the screen:

    Measuring multi-threading efficiency up to 8 CPU cores
    Threads: 1 / Time: 8.001 sec / Speedup: 1.000 / Efficiency: 100% / LogL: -22217
    Threads: 2 / Time: 4.346 sec / Speedup: 1.841 / Efficiency: 92% / LogL: -22217
    Threads: 3 / Time: 3.381 sec / Speedup: 2.367 / Efficiency: 79% / LogL: -22217
    Threads: 4 / Time: 4.385 sec / Speedup: 1.825 / Efficiency: 46% / LogL: -22217
    BEST NUMBER OF THREADS: 3

Therefore, I would only use 3 cores for this example data. For later analysis with your same data set, you can stick to the determined number.

Depending on the compute system it might be required to set an upper limit of CPU cores that can automatically be assigned. Use the `-ntmax` option to do so. For instance

    iqtree -s example.phy -m TIM2+I+G -T AUTO -ntmax 8
    # for version 1.x change -T to -nt

does the same as above, but only allows to use up to 8 CPU cores. By default all cores of the current machine would be used as maximum.


### Where to go from here?



Once confident enough you can go on with a **[more advanced tutorial](Advanced-Tutorial)**, which covers topics like phylogenomic (multi-gene) analyses using partition models or mixture models.


[Adachi and Hasegawa, 1996b]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.476.8552
[Anisimova et al., 2011]: https://doi.org/10.1093/sysbio/syr041
[Gadagkar et al., 2005]: https://doi.org/10.1002/jez.b.21026
[Guindon et al., 2010]: https://doi.org/10.1093/sysbio/syq010
[Hoang et al., 2018]: https://doi.org/10.1093/molbev/msx281
[Lanfear et al., 2012]: https://doi.org/10.1093/molbev/mss020
[Lanfear et al., 2014]: https://doi.org/10.1186/1471-2148-14-82
[Lewis, 2001]: https://doi.org/10.1080/106351501753462876
[Lopez et al., 2002]: http://mbe.oxfordjournals.org/content/19/1/1.full
[Minh et al., 2013]: https://doi.org/10.1093/molbev/mst024
[Yang, 1994]: https://doi.org/10.1007/BF00160154
[Yang, 1995]: http://www.genetics.org/content/139/2/993.abstract

