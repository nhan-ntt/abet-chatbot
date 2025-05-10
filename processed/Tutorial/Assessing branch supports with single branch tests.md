Beginner's tutorial
This tutorial gives a beginner's guide. 

Please first [download](http://www.iqtree.org/#download) and [install](Quickstart) the binary
for your platform. For the next steps, the folder containing your  `iqtree` executable should be added to your PATH enviroment variable so that IQ-TREE can be invoked by simply entering `iqtree` at the command-line. Alternatively, you can also copy `iqtree` binary into your system search.
TIP: For quick overview of all supported options in IQ-TREE, run the command  `iqtree -h`.

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