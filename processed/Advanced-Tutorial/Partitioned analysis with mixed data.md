Advanced tutorial
Recommended for experienced users to explore more features.
To get started, please read the [Beginner's Tutorial](Tutorial) first if not done so yet.

### Partitioned analysis with mixed data

IQ-TREE also allows combining sub-alignments from different alignment files, which is helpful if you want to combine mixed data (e.g. DNA and protein) in a single analysis. Here is an example for mixing DNA, protein and codon models:

    #nexus
    begin sets;
        charset part1 = dna.phy: 1-100 201-300;
        charset part2 = dna.phy: 101-200;
        charset part3 = prot.phy: 1-400;
        charset part4 = prot.phy: 401-600;
        charset part5 = codon.phy:CODON, *;
        charpartition mine = HKY:part1, GTR+G:part2, LG+G:part3, WAG+I+G:part4, GY:part5;
    end;

Here,  `part1` and  `part2` contain sub-alignments from alignment file `dna.phy`, whereas `part3` and `part4` are loaded from alignment file `prot.phy` and `part5` from `codon.phy`. The `:` is needed to separate the alignment file name and site specification. Note that, for convenience `*` in `part5` specification means that `part5` corresponds to the entire alignment `codon.phy`.

>**TIP**: For `part5` the `CODON` keyword is specified so that IQ-TREE will apply a codon model. Moreover, this implicitly assumes the standard genetic code. If you want to use another genetic code, append `CODON` with the [code ID described here](Substitution-Models#codon-models)
{: .tip}

Because the alignment file names are now specified in this NEXUS file, you can omit the  `-s` option:

    iqtree -p example.nex
    # for version 1.x change -p to -spp


Note that 
 `aln.phy` and  `prot.phy` does not need to contain the same set of sequences. For instance, if some sequence occurs
in   `aln.phy` but not in   `prot.phy`, IQ-TREE will treat the corresponding parts of sequence
in  `prot.phy` as missing data. For your convenience IQ-TREE writes the concatenated alignment
into the file  `example.nex.conaln`.