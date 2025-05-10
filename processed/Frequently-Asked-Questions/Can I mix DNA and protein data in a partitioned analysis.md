Frequently asked questions
For common questions and answers.

### Can I mix DNA and protein data in a partitioned analysis?

Yes! You can specify this via a NEXUS partition file. In fact, you can mix any data types supported in IQ-TREE, including also codon, binary and morphological data. To do so, each data type should be stored in a separate alignment file (see also [Partitioned analysis with mixed data](Advanced-Tutorial#partitioned-analysis-with-mixed-data)). As an example, assuming `dna.phy` is a DNA alignment and and `prot.phy` is a protein alignment. Then a partition file mixing two types of data can be specified as follows:

    #nexus
    begin sets;
        charset part1 = dna.phy: 1-100 201-300;
        charset part2 = dna.phy: 101-200;
        charset part3 = prot.phy: 1-150;
        charset part4 = prot.phy: 151-400;
        charpartition mine = HKY:part1, GTR+G:part2, WAG+I+G:part3, LG+G:part4;
    end;
  
>**NOTE**: The site count for each alignment should start from 1, and **not** continue from the last position of a previous alignment (e.g., see `part3` and `part4` declared above).