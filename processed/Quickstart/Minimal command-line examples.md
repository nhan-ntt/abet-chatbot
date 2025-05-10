Getting started
Recommended for users who just downloaded IQ-TREE the first time.

### Minimal command-line examples

A few typically analyses are listed in the following. Note that it is assumed that `iqtree` executable was already copied into system search path. If not, please replace `iqtree` with actual path to executable.

* Infer maximum-likelihood tree from a sequence alignment (`example.phy`)
   with the best-fit model automatically selected by ModelFinder:

        iqtree -s example.phy

* Infer maximum-likelihood tree using `GTR+I+G` model:

        iqtree -s example.phy -m GTR+I+G

* Perform ModelFinder without subsequent tree inference:
        
        iqtree -s example.phy -m MF


* Combine ModelFinder, tree search, SH-aLRT test and ultrafast bootstrap with 1000 replicates:

        iqtree -s example.phy -B 1000 -alrt 1000
        # for version 1.x, change -B to -bb


* Perform edge-linked proportional partition model (`example.nex`):

        iqtree -s example.phy -p example.nex
        # for version 1.x change -p to -spp

* Find best partition scheme by possibly merging partitions:

        iqtree -s example.phy -p example.nex -m MF+MERGE

* Find best partition scheme followed by tree inference and ultrafast bootstrap:

        iqtree -s example.phy -p example.nex -m MFP+MERGE -B 1000
        # for version 1.x change -B to -bb

* Use 4 CPU cores to speed up computation:

        iqtree -s example.phy -T 4
        # for version 1.x change -T to -nt

* Determine the best number of cores to use under `GTR+R4` model:

        iqtree -s example.phy -m GTR+R4 -T AUTO
        # for version 1.x change -T to -nt

* Show all available options: 

        iqtree -h