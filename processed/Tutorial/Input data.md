Beginner's tutorial
This tutorial gives a beginner's guide. 

Please first [download](http://www.iqtree.org/#download) and [install](Quickstart) the binary
for your platform. For the next steps, the folder containing your  `iqtree` executable should be added to your PATH enviroment variable so that IQ-TREE can be invoked by simply entering `iqtree` at the command-line. Alternatively, you can also copy `iqtree` binary into your system search.
TIP: For quick overview of all supported options in IQ-TREE, run the command  `iqtree -h`.

### Input data

IQ-TREE takes as input a *multiple sequence alignment* and will reconstruct an evolutionary tree that is best explained by the input data. If you have raw (unaligned) sequences, you need to first run an alignment program like [MAFFT](http://mafft.cbrc.jp/alignment/software/) or [ClustalW](http://www.clustal.org) to align the sequences, before feeding them into IQ-TREE.

The input alignment can be in various common formats. For example the [PHYLIP format](http://evolution.genetics.washington.edu/phylip/doc/sequence.html) which may look like:

    7 28
    Frog       AAATTTGGTCCTGTGATTCAGCAGTGAT
    Turtle     CTTCCACACCCCAGGACTCAGCAGTGAT
    Bird       CTACCACACCCCAGGACTCAGCAGTAAT
    Human      CTACCACACCCCAGGAAACAGCAGTGAT
    Cow        CTACCACACCCCAGGAAACAGCAGTGAC
    Whale      CTACCACGCCCCAGGACACAGCAGTGAT
    Mouse      CTACCACACCCCAGGACTCAGCAGTGAT

This tiny alignment contains 7 DNA sequences from several animals with the sequence length of 28 nucleotides. IQ-TREE also supports other file formats such as FASTA, NEXUS, CLUSTALW. The FASTA file for the above example may look like this:

    >Frog       
    AAATTTGGTCCTGTGATTCAGCAGTGAT
    >Turtle     
    CTTCCACACCCCAGGACTCAGCAGTGAT
    >Bird       
    CTACCACACCCCAGGACTCAGCAGTAAT
    >Human      
    CTACCACACCCCAGGAAACAGCAGTGAT
    >Cow        
    CTACCACACCCCAGGAAACAGCAGTGAC
    >Whale      
    CTACCACGCCCCAGGACACAGCAGTGAT
    >Mouse      
    CTACCACACCCCAGGACTCAGCAGTGAT

>**TIP**: From version 2 you can input a directory of alignment files. IQ-TREE 2 will load and concatenate all alignments within the directory, eliminating the need for users to manually perform this step.
{: .tip}

Not all special characters are allowed in sequence names, because they may interfere with the structure encoding in the Newick tree files. To avoid problems with downstream software (like tree viewers), IQ-Tree (and also other phylogenetic software) checks the names for such potentially interfering characters and substitutes them by underscores `_`. 
Permitted characters in sequence names are alphanumeric letters, underscores `_`, dash `-`, dot `.`, slash `\` and vertical bar `|`. All other characters are substituted, like e.g. `hawk's-eye` is converted to `hawk_s-eye` as which it will appear in the tree.

Please note, this can lead to duplicate names if you, for instance, already have two sequences named `hawk_s-eye` and `hawk's-eye`. In such cases you will obtain an error and you need to adjust the names in the original input alignment.