Beginner's tutorial
This tutorial gives a beginner's guide. 

Please first [download](http://www.iqtree.org/#download) and [install](Quickstart) the binary
for your platform. For the next steps, the folder containing your  `iqtree` executable should be added to your PATH enviroment variable so that IQ-TREE can be invoked by simply entering `iqtree` at the command-line. Alternatively, you can also copy `iqtree` binary into your system search.
TIP: For quick overview of all supported options in IQ-TREE, run the command  `iqtree -h`.

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