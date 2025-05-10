Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Generating random trees

IQ-TREE provides several random tree generation models:

| Option | Usage and meaning |
|---------|------------------------------------------------------------------------------|
| `-r`    | Specify number of taxa. IQ-TREE will create a random tree under Yule-Harding model with specified number of taxa |
| `-ru`   | Like `-r`, but a random tree is created under uniform model. |
| `-rcat` | Like `-r`, but a random caterpillar tree is created. |
| `-rbal` | Like `-r`, but a random balanced tree is created. |
| `-rcsg` | Like `-r`, bur a random circular split network is created. |
| `-rlen` | Specify three numbers: minimum, mean and maximum branch lengths of the random tree. *DEFAULT: `-rlen 0.001 0.1 0.999`* |


Example usages:


* Generate a 100-taxon random tree into the file `100.tree` under the Yule Harding model:

        iqtree -r 100 100.tree 


* Generate 100-taxon random tree with mean branch lengths of 0.2 and branch lengths are between 0.05 and 0.3:

        iqtree -r 100 -rlen 0.05 0.2 0.3 100.tree 


* Generate a random tree under uniform model:

        iqtree -ru 100 100.tree 


* Generate a random tree where taxon labels follow an alignment:

        iqtree -s example.phy -r 17 example.random.tree 

Note that, you still need to specify the `-r` option being equal to the number of taxa in the alignment.