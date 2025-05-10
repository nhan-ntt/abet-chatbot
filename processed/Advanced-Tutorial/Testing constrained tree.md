Advanced tutorial
Recommended for experienced users to explore more features.
To get started, please read the [Beginner's Tutorial](Tutorial) first if not done so yet.

### Testing constrained tree

We now illustrate an example to use the AU test (see above) to test trees from unconstrained versus constrained search, which is helpful to know if a constrained search is sensible or not. Thus:

1. Perform an unconstrained search:
        
        iqtree -s example.phy -m TIM2+I+G --prefix example.unconstr
        # for version 1.x change --prefix to -pre
        
2. Perform a constrained search, where `example.constr1` file contains: `((Human,Seal),(Cow,Whale),Mouse);`:
    
        iqtree -s example.phy -m TIM2+I+G -g example.constr1 --prefix example.constr1
        # for version 1.x change --prefix to -pre
        
3. Perform another constrained search, where `example.constr2` file contains `((Human,Cow,Whale),Seal,Mouse);`: 

        iqtree -s example.phy -m TIM2+I+G -g example.constr2 --prefix example.constr2
        # for version 1.x change --prefix to -pre

4. Perform the last constrained search, where `example.constr3` file contains `((Human,Mouse),(Cow,Rat),Opossum);`: 

        iqtree -s example.phy -m TIM2+I+G -g example.constr3 --prefix example.constr3
        # for version 1.x change --prefix to -pre

5. Concatenate all trees into a file:
    
        # for Linux or macOS
        cat example.unconstr.treefile example.constr1.treefile example.constr2.treefile example.constr3.treefile > example.treels
        
        # for Windows
        type example.unconstr.treefile example.constr1.treefile example.constr2.treefile example.constr3.treefile > example.treels
        
    
6. Test the set of trees:
    
        iqtree -s example.phy -m TIM2+I+G -z example.treels -n 0 -zb 1000 -au


Now look at the resulting `.iqtree` file:

    USER TREES
    ----------

    See example.phy.trees for trees with branch lengths.

    Tree      logL    deltaL  bp-RELL    p-KH     p-SH    c-ELW     p-AU
    -------------------------------------------------------------------------
      1   -21152.617   0.000  0.7110 + 0.7400 + 1.0000 + 0.6954 + 0.7939 + 
      2   -21156.802   4.185  0.2220 + 0.2600 + 0.5910 + 0.2288 + 0.3079 + 
      3   -21158.579   5.962  0.0670 + 0.1330 + 0.5130 + 0.0758 + 0.1452 + 
      4   -21339.596 186.980  0.0000 - 0.0000 - 0.0000 - 0.0000 - 0.0000 - 

    deltaL  : logL difference from the maximal logl in the set.
    bp-RELL : bootstrap proportion using RELL method (Kishino et al. 1990).
    p-KH    : p-value of one sided Kishino-Hasegawa test (1989).
    p-SH    : p-value of Shimodaira-Hasegawa test (2000).
    c-ELW   : Expected Likelihood Weight (Strimmer & Rambaut 2002).
    p-AU    : p-value of approximately unbiased (AU) test (Shimodaira, 2002).

    Plus signs denote the 95% confidence sets.
    Minus signs denote significant exclusion.
    All tests performed 1000 resamplings using the RELL method.

One sees that the AU test does not reject the first 3 trees (denoted by `+` sign below the `p-AU` column), whereas the last tree is significantly excluded (`-` sign). All other tests also agree with this. Therefore, groupings of `(Human,Mouse)` and `(Cow,Rat)` do not make sense. Whereas the phylogenetic position of `Seal` based on 3 first trees is still undecidable. This is in agreement with the SH-aLRT and ultrafast bootstrap supports [done in the Tutorial](Tutorial#assessing-branch-supports-with-single-branch-tests).