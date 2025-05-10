Advanced tutorial
Recommended for experienced users to explore more features.
To get started, please read the [Beginner's Tutorial](Tutorial) first if not done so yet.

### Partitioned analysis for multi-gene alignments

If you used partition model in a publication please cite:

> __O. Chernomor, A. von Haeseler, and B.Q. Minh__ (2016) Terrace aware data structure for phylogenomic inference from supermatrices. _Syst. Biol._, 65:997-1008. 
    <https://doi.org/10.1093/sysbio/syw037>

In the partition model, you can specify a substitution model for each gene/character set. 
IQ-TREE will then estimate the model parameters separately for every partition. Moreover, IQ-TREE provides edge-linked or edge-unlinked branch lengths between partitions:

* `-q partition_file`: all partitions share the same set of branch lengths (like `-q` option of RAxML).
* `-p partition_file` (`-spp` in version 1.x): like above but allowing each partition to have its own evolution rate.
* `-Q partition_file` (`-sp` in version 1.x): each partition has its own set of branch lengths (like combination of `-q` and `-M` options in RAxML) to account for, e.g. *heterotachy* ([Lopez et al., 2002]).

>**NOTE**: `-p` is recommended for typical analysis. `-q` is unrealistic and `-Q` is very parameter-rich. One can also perform all three analyses and compare e.g. the BIC scores to determine the best-fit partition model.

IQ-TREE supports RAxML-style and NEXUS partition input file. The RAxML-style partition file may look like:

    DNA, part1 = 1-100
    DNA, part2 = 101-384

If your partition file is called  `example.partitions`, the partition analysis can be run with:


    iqtree -s example.phy -p example.partitions -m GTR+I+G
    # for version 1.x change -p to -spp


Note that using RAxML-style partition file, all partitions will use the same rate heterogeneity model given in `-m` option (`+I+G` in this example). If you want to specify, say, `+G` for the first partition and `+I+G` for the second partition, then you need to create the more flexible NEXUS partition file. This file contains a  `SETS` block with
 `CharSet` and  `CharPartition` commands to specify individual genes and the partition, respectively.
For example:

    #nexus
    begin sets;
        charset part1 = 1-100;
        charset part2 = 101-384;
        charpartition mine = HKY+G:part1, GTR+I+G:part2;
    end;


If your NEXUS file is called  `example.nex`, then you can use the option  `-p` to input the file as following:

    iqtree -s example.phy -p example.nex
    # for version 1.x change -p to -spp

Here, IQ-TREE partitions the alignment  `example.phy` into 2 sub-alignments named  `part1` and  `part2`
containing sites (columns) 1-100 and 101-384, respectively. Moreover, IQ-TREE applies the
subtitution models  `HKY+G` and  `GTR+I+G` to  `part1` and  `part2`, respectively. Substitution model parameters and trees with branch lengths can be found in the result file  `example.nex.iqtree`. 

Moreover, the  `CharSet` command allows to specify non-consecutive sites with e.g.:

    charset part1 = 1-100 200-384;

That means,  `part1` contains sites 1-100 and 200-384 of the alignment. Another example is:

    charset part1 = 1-100\3;

for extracting sites 1,4,7,...,100 from the alignment. This is useful for getting codon positions from the protein-coding alignment.