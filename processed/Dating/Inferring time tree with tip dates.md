Phylogenetic Dating

Bayesian dating with MCMCtree


From IQ-TREE 2.5 onwards, we provide the functionality in IQ-TREE to infer time trees
using Bayesian MCMCtree method.

If you use this feature, please cite:

> __P. Demotte, M. Panchaksaram, N. Ly-Trong, M. dos Reis  and B.Q. Minh__
>(2025) IQ2MC: A New Framework to Infer Phylogenetic Time Trees Using IQ-TREE
>and MCMCtree.

### Inferring time tree with tip dates

This is a common scenario e.g. in virus datasets where you have sampling time
for many sequences. You need first to prepare a _date file_, which comprises
several lines, each with a taxon name (from your sequence alignment) and its
date separated by spaces, tabs or blanks. Note that it is not required to have
dates for all tips. For example, this date file is part of the new corona virus
dataset:

```
hCoV-19/Wuhan-Hu-1         2019-12-31
hCoV-19/China/WF0028       2020-02
hCoV-19/USA/WA-S88         2020-03-01
hCoV-19/USA/CA-CDPH-UC1	   2020
hCoV-19/Italy/SPL1         2020-01-29
hCoV-19/Spain/Valencia5	   2020-02-27
hCoV-19/Australia/QLD01	   2020-01-28
hCoV-19/Vietnam/CM295      2020-03-06
hCoV-19/bat/Yunnan         2013-07-24
hCoV-19/pangolin/Guangdong 2019-02-01:2019-12-31
```

The date information here can be uncertain. For example, `hCoV-19/China/WF0028`
was sampled in Feb 2020, `hCoV-19/USA/CA-CDPH-UC1` was sampled in 2020, and
`hCoV-19/pangolin/Guangdong` was sample between 1st Feb 2019 and 31st Dec 2019.
For such data range you can use "NA" to mean that the lower or upper bound is
missing, e.g.:

```
TaxonA  2018-02-01:NA
TaxonB  NA:2018-03-31
```

which means that `TaxonA` was sampled after 1st Feb 2018 and TaxonB was sampled
before 31st Mar 2018.

Now run IQ-TREE with:

	iqtree -s ALN_FILE --date DATE_FILE
	
where `ALN_FILE` is the sequence alignment and `DATE_FILE` is the date file.
This single command line will perform three steps: (1) find the best-fit model
using ModelFinder, (2) find the maximum likelihood (ML) tree with branch lengths
in number of substitutions per site, and (3) rescale the branch lengths of the
ML tree to build a time tree with dated ancestral node. As output IQ-TREE will
additional print three files:

* `ALN_FILE.timetree.lsd`: The report of LSD.
* `ALN_FILE.timetree.nex`: Time tree file in NEXUS format, that can be viewed
nicely in FigTree (Click on "Node Labels" on the left tab and choose "Display"
as "date" in FigTree, see figure below).
* `ALN_FILE.timetree.nwk`: Time tree file in NEWICK format.

![Node dates in FigTree](images/dating-figtree.png)

This command will automatically detect the best root position (according to LSD
criterion). However, if the root is incorrectly inferred, it may produce wrong
dates. Therefore, it is advisable to provide outgroup taxa if possible. In this
example, we have this information, so you can use `-o` option:

	iqtree -s ALN_FILE --date DATE_FILE -o
"hCoV-19/bat/Yunnan,hCoV-19/pangolin/Guangdong"

to instruct IQ-TREE that the root is on the branch separating `bat` and
`pangolin` sequences from the rest.


Alternatively you can also append the dates into the sequence names of the
alignment file using the `|` separator, such as (assuming a FASTA file here):

```
>hCoV-19/Wuhan-Hu-1|2019-12-31
......
>hCoV-19/China/WF0028|2020-02
......
>hCoV-19/USA/WA-S88|2020-03-01
......
>hCoV-19/USA/CA-CDPH-UC1|2020
......
>hCoV-19/Italy/SPL1|2020-01-29
......
>hCoV-19/Spain/Valencia5|2020-02-27
......
>hCoV-19/Australia/QLD01|2020-01-28
......
>hCoV-19/Vietnam/CM295|2020-03-06
......
>hCoV-19/bat/Yunnan|2013-07-24
......
>hCoV-19/pangolin/Guangdong|2019
......
```

Then run IQ-TREE:

	iqtree -s ALN_FILE --date TAXNAME -o
"hCoV-19/bat/Yunnan,hCoV-19/pangolin/Guangdong"

The special keyword `TAXNAME` for the `--date` option instructs IQ-TREE to
automatically extract the dates from the taxon names.