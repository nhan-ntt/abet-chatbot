Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Likelihood mapping analysis

Starting with version 1.4.0, IQ-TREE implements the likelihood mapping approach  ([Strimmer and von Haeseler, 1997]) to assess the phylogenetic information of an input alignment. The detailed results will be printed to `.iqtree` report file. The likelihood mapping plots will be printed to `.lmap.svg` and `.lmap.eps` files. 

Compared with the original implementation in TREE-PUZZLE, IQ-TREE is much faster and supports many more substitution models (including partition and mixture models). 


|Option| Usage and meaning |
|------------|------------------------------------------------------------------------------|
| `-lmap`    | Specify the number of quartets to be randomly drawn. If you specify `-lmap ALL`, all unique quartets will be drawn, instead.|
| `-lmclust` | Specify a NEXUS file containing taxon clusters (see below for example) for quartet mapping analysis. |
| `-n 0`     | Skip subsequent tree search, useful when you only want to assess the phylogenetic information of the alignment. |
| `-wql`     | Write quartet log-likelihoods into `.lmap.quartetlh` file (typically not needed). |

>**TIP**: The number of quartets specified via `-lmap` is recommended to be at least 25 times the number of sequences in the alignment, such that each sequence is covered ~100 times in the set of quartets drawn.
{: .tip}

An example NEXUS cluster file (where A, B, C, etc. are sequence names):

    #NEXUS
    begin sets;
        taxset Cluster1 = A B C;
        taxset Cluster2 = D E;
        taxset Cluster3 = F G H I;
        taxset Cluster4 = J;
        taxset IGNORED = X;
    end;

Here, `Cluster1` to `Cluster4` are four user-defined clusters of sequences. Note that users can give any names to the clusters instead of `Cluster1`, etc. If a cluster is named `ignored` or `IGNORED` the sequences included will be ignored in the likelihood mapping analysis.

If you provide a cluster file it has to contain between 1 and 4 clusters (plus an optional `IGNORED` or `ignored` cluster), which will tell IQ-TREE to perform an unclustered (default without a cluster file) or a clustered analysis with 2, 3 or 4 groups, respectively.

The names given to the clusters in the cluster file will be used to label the corners of the triangle diagrams.


Example usages:

* Perform solely likelihood mapping analysis (ignoring tree search) with 2000 quartets for an alignment `example.phy` with model being automatically selected:

        iqtree -s example.phy -lmap 2000 -n 0 -m TEST

You can now view the likelihood mapping plot file `example.phy.lmap.svg`, which looks like this:

![Likelihood mapping plot.](images/example.phy.lmap.pdf) 

It shows phylogenetic information of the alignment `example.phy`. On the top: distribution of quartets depicted by dots on the likelihood mapping plot. On the left: the three areas show support for one of the different groupings like (a,b)-(c,d). On the right: quartets falling into the three corners are informative. Those in three rectangles are partly informative and those in the center are uninformative. A good data set should have high number of informative quartets and low number of uninformative quartets. The meanings can also be found in the `LIKELIHOOD MAPPING STATISTICS` section of the report file `example.phy.iqtree`:

    LIKELIHOOD MAPPING STATISTICS
    -----------------------------

               (a,b)-(c,d)                              (a,b)-(c,d)      
                    /\                                      /\           
                   /  \                                    /  \          
                  /    \                                  /  1 \         
                 /  a1  \                                / \  / \        
                /\      /\                              /   \/   \       
               /  \    /  \                            /    /\    \      
              /    \  /    \                          / 6  /  \  4 \     
             /      \/      \                        /\   /  7 \   /\    
            /        |       \                      /  \ /______\ /  \   
           /   a3    |    a2  \                    / 3  |    5   |  2 \  
          /__________|_________\                  /_____|________|_____\ 
    (a,d)-(b,c)            (a,c)-(b,d)      (a,d)-(b,c)            (a,c)-(b,d) 

    Division of the likelihood mapping plots into 3 or 7 areas.
    On the left the areas show support for one of the different groupings
    like (a,b|c,d).
    On the right the right quartets falling into the areas 1, 2 and 3 are
    informative. Those in the rectangles 4, 5 and 6 are partly informative
    and those in the center (7) are not informative.
    .....