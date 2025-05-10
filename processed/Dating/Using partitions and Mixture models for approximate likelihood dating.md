Phylogenetic Dating

Bayesian dating with MCMCtree


From IQ-TREE 2.5 onwards, we provide the functionality in IQ-TREE to infer time trees
using Bayesian MCMCtree method.

If you use this feature, please cite:

> __P. Demotte, M. Panchaksaram, N. Ly-Trong, M. dos Reis  and B.Q. Minh__
>(2025) IQ2MC: A New Framework to Infer Phylogenetic Time Trees Using IQ-TREE
>and MCMCtree.

### Using partitions and Mixture models for approximate likelihood dating

IQ-TREE supports three partition models for approximate likelihood dating. Under
the Edge-unlinked (EUL) model, IQ-TREE generates the Hessian file which contains
separate gradients and Hessian for each partition. For the Edge-linked (EL) 
partition model, the Hessian file contains only one gradient vector and a
Hessian as branches are shared across partitions. 

Since IQ-TREE supports RAxML and NEXUS style partitions input file, you can use
partitions defined in the following format.

```
DNA, part1 = 1-100
DNA, part2 = 101-450
```
If your partition file is called `example.nex`,

```
iqtree -s example.phy  -Q example.nex -m GTR+G4 -te example_tree.nwk --dating mcmctree 
```

Here, IQ-TREE generates the Hessian file using the `GTR+G4` model for all
partitions. If you need to use different models for each partition, you need to
create a more flexible NEXUS file like the following.

```
#nexus
begin sets;
    charset part1 = 1-100;
    charset part2 = 101-450;
    charpartition mine = GTR+G4:part1, HKY:part2;
end;
```
Here, IQ-TREE uses `GTR+G4` model for partition 1, and `HKY` model for partition
2 respectively. Using `-q` and `-p` options, you can generate the Hessian file
which considers `edge-linked equal branch partition models` and `edge-linked
proportional branch length models` respectively.

IQ-TREE also supports mixture models for the Hessian file generation. You can
simply specify DNA or Amino Acid Mixture model as following,

```
iqtree -s example.phy  -m "MIX{GTR,HKY}+G4" -te example_tree.nwk –-dating mcmctree 
```
If you need to use an Amino Acid profile mixture model such as C60 model,

```
iqtree -s example.phy  -m LG+G4+C60 -te example_tree.nwk –-dating mcmctree 
```
If you are using ModelFinder or MixtureFinder, you need to follow a two-step
approach. First, you can estimate the best-fit model for the data using
ModelFinder or MixtureFinder. Then, the Hessian file can be generated using
`--dating mcmctree` option using the estimated models.