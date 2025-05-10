Assessing phylogenetic assumptions
It is important to know that phylogenetic models rely on various simplifying assumptions to
ease computations. If your data severely violate these assumptions, it might
cause bias in phylogenetic estimates of tree topologies and other model
parameters. Some common assumptions include _treelikeness_ (all sites
in the alignment have evolved under the same tree), _stationarity_ (nucleotide/amino-acid
frequencies remain constant over time), _reversibility_ (substitutions are equally
likely in both directions), and _homogeneity_ (substitution rates remain constant over time).

This document shows several ways to check some of these assumptions that you
should perform before doing phylogenetic analysis.

### Likelihood mapping

Likelihood mapping ([Strimmer and von Haeseler, 1997]) is a visualisation method
to display the phylogenetic information of an alignment. It visualises the _treelikeness_
of all quartets in a single triangular graph and therefore renders a quick
interpretation of the phylogenetic content.

A simple likelihood mapping analysis can be conducted with:

	iqtree -s example.phy -lmap 2000 -n 0

where `-lmap` option specify the number of quartets of taxa that will be drawn randomly
from the alignment. `-n 0` tells IQ-TREE to stop the analysis right after running the
likelihood mapping. IQ-TREE will print the result in the `.iqtree` report file as well
as the likelihood mapping plot `.lmap.svg` (in SVG format) and `.lmap.eps` file (in EPS
figure format).

You can now view the likelihood mapping plot file `example.phy.lmap.svg`, which looks like this:

![Likelihood mapping plot.](images/example.phy.lmap.pdf) 

It shows phylogenetic information of the alignment `example.phy`. 

* Top sub-figure: distribution of quartets depicted by dots on the likelihood mapping plot. 
* Left sub-figure: percentages of quartets falling in each of the three areas. The 
  three areas show support for one of the different groupings like (a,b)-(c,d).
* Right sub-figure: percentages of quartets falling in each of the seven areas. 
  Quartets falling into the three corners are informative and called fully-resolved quartets. 
  Those in three rectangles are partly informative (partly resolved quartets) and those in the center are uninformative
  (unresolved quartets). A good data set should have high number of fully resolved quartets 
  and low number of unresolved quartets. 

The meanings can also be found in the `LIKELIHOOD MAPPING STATISTICS` section of the 
report file `example.phy.iqtree`:


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


The [command reference](Command-Reference#likelihood-mapping-analysis) will provide
more options and how to perform 2-, 3-, or 4-cluster likelihood mapping analysis.


[Strimmer and von Haeseler, 1997]: http://www.pnas.org/content/94/13/6815.long
[Naser-Khdour et al., 2019]: https://doi.org/10.1093/gbe/evz193