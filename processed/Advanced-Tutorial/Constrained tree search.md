Advanced tutorial
Recommended for experienced users to explore more features.
To get started, please read the [Beginner's Tutorial](Tutorial) first if not done so yet.

### Constrained tree search

IQ-TREE supports constrained tree search via `-g` option, so that the resulting tree must obey a constraint tree topology. The constraint tree can be multifurcating and need not to contain all species. To illustrate, let's return to the [first running example](Tutorial#first-running-example), where we want to force Human grouping with Seal whereas Cow with Whale. If you use the following constraint tree (NEWICK format):

    ((Human,Seal),(Cow,Whale));

Save this to a file `example.constr0` and run:

    iqtree -s example.phy -m TIM2+I+G -g example.constr0 --prefix example.constr0
    # for version 1.x change --prefix to -pre
    
(We use a prefix in order not to overwrite output files of the previous run). The resulting part of the tree extracted from `example.constr0.iqtree` looks exactly like a normal unconstrained tree search:


            +--------------Human
         +--|
         |  |  +------Seal
         |  +--|
         |     |  +-----Cow
         |     +--|
         |        +-------Whale
    +----|
    |    |         +---Mouse
    |    +---------|
    |              +------Rat


This is the correct behavior: although Human and Seal are not monophyletic, this tree indeed satisfies the constraint, because the induced subtree separates (Human,Seal) from (Cow,Whale). This comes from the fact that the tree is _unrooted_. If you want them to be sister groups, then you need to include _outgroup_ taxa into the constraint tree. For example:

    ((Human,Seal),(Cow,Whale),Mouse);

Save this to `example.constr1` and run:

    iqtree -s example.phy -m TIM2+I+G -g example.constr1 --prefix example.constr1
    # for version 1.x change --prefix to -pre

The resulting part of the tree is then:

               +---------------Human
            +--|
            |  +------Seal
         +--|
         |  |  +-----Cow
         |  +--|
         |     +-------Whale
    +----|
    |    |         +---Mouse
    |    +---------|
    |              +------Rat


which shows the desired effect.

>**NOTE**: While this option helps to enforce the tree based on prior knowledge, it is advised to always perform tree topology tests to make sure that the resulting constrained tree is NOT significantly worse than an unconstrained tree! See [tree topology tests](#tree-topology-tests) and [testing constrained tree](#testing-constrained-tree) below for a guide how to check this.