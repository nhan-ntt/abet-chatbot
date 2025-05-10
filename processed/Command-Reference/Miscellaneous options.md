Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Miscellaneous options

| Option | Usage and meaning |
|-----------|------------------------------------------------------------------------------|
| `-alninfo` | Print alignment site statistics to `.alninfo` file. |
| `-blfix`   | Fix branch lengths of tree passed via `-t` or `-te`. This is useful to evaluate the log-likelihood of an input tree with fixed tolopogy and branch lengths. *DEFAULT: OFF* |
| `-blmin`  | Specify minimum branch length. Default: the smaller of 0.000001 and 0.1/alignment_length. |
| `-blmax`  | Specify the maximum branch length. Default: 10 |
| `-czb`    | Collapse near zero branches, so that the final tree may be multifurcating. This is useful for bootstrapping in the presence of polytomy to reduce bootstrap supports of short branches. |
| `-me`      | Specify the log-likelihood epsilon for final model parameter estimation (Default: 0.01). With `-fast` option, the epsilon is raised to 0.05. | 
| `-wpl`    | Write partition log-likelihoods to `.partlh` file. Only effective with partition model. |
| `-wspr`   | Write site posterior probabilities per rate category to `.siteprob` file. |
| `-wspm`   | Write site posterior probabilities per mixture class to `.siteprob` file. |
| `-wspmr`   | Write site posterior probabilities per mixture class and rate category to `.siteprob` file. |
| `-wsl`    | Write site log-likelihoods to `.sitelh` file in [TREE-PUZZLE](http://www.tree-puzzle.de) format. Such file can then be passed on to [CONSEL](http://www.sigmath.es.osaka-u.ac.jp/shimo-lab/prog/consel/) for further tree tests. |
| `-wslr`   | Write site log-likelihoods per rate category to `.sitelh` file. |
| `-wslm`   | Write site log-likelihoods per mixture class to `.sitelh` file. |
| `-wslmr`   | Write site log-likelihoods per mixture class and rate category to `.sitelh` file. |
| `-wt`     | Turn on writing all locally optimal trees into `.treels` file. |
| `-fconst` | Specify a list of comma-separated integer numbers. The number of entries should be equal to the number of states in the model (e.g. 4 for DNA and 20 for protein). IQ-TREE will then add a number of constant sites accordingly. For example, `-fconst 10,20,15,40` will add 10 constant sites of all A, 20 constant sites of all C, 15 constant sites of all G and 40 constant sites of all T into the alignment. |


Example usages:

* Print alignment information about parsimony informative sites:

        iqtree -s example.phy -m JC -n 0 -alninfo
    
The first few lines of the output file `example.phy.alninfo` may look like this:

    # Alignment site statistics
    # This file can be read in MS Excel or in R with command:
    #   tab=read.table('example.phy.alninfo',header=TRUE)
    # Columns are tab-separated with following meaning:
    #   Site:   Site ID
    #   Stat:   Statistic, I=informative, C=constant, c=constant+ambiguous,
    #           U=Uninformative but not constant, -=all-gaps
    Site    Stat
    1       U
    2       I
    3       I
    4       U
    5       U

* Print site log-likelihood and posterior probability for each Gamma rate category:

        iqtree -s example.phy -m JC+G -wspr -wslr  -n 0

The first few lines of the output file example.phy.siteprob (printed by `-wspr` option) may look like this:

    Site    p1      p2      p3      p4
    1       0.180497        0.534405        0.281   0.00409816
    2       4.73239e-05     0.0373409       0.557705        0.404907
    3       1.23186e-08     0.000426294     0.0672021       0.932372
    4       0.180497        0.534405        0.281   0.00409816
    5       0.180497        0.534405        0.281   0.00409816

where `pX` is the probability of the site falling into rate category `X`.

The first few lines of the output file example.phy.sitelh (printed by `-wslr` option) may look like this:

    # Site likelihood per rate/mixture category
    # This file can be read in MS Excel or in R with command:
    #   tab=read.table('example.phy.sitelh',header=TRUE,fill=TRUE)
    # Columns are tab-separated with following meaning:
    #   Site:   Alignment site ID
    #   LnL:    Logarithm of site likelihood
    #           Thus, sum of LnL is equal to tree log-likelihood
    #   LnLW_k: Logarithm of (category-k site likelihood times category-k weight)
    #           Thus, sum of exp(LnLW_k) is equal to exp(LnL)
    Site    LnL     LnLW_1  LnLW_2  LnLW_3  LnLW_4
    1       -7.0432 -8.7552 -7.6698 -8.3126 -12.5404
    2       -17.5900        -27.5485        -20.8776        -18.1739        -18.4941
    3       -20.3313        -38.5435        -28.0917        -23.0314        -20.4014
    4       -7.0432 -8.7552 -7.6698 -8.3126 -12.5404
    5       -7.0432 -8.7552 -7.6698 -8.3126 -12.5404


[Adachi and Hasegawa, 1996b]: http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.476.8552
[Anisimova and Gascuel 2006]: https://doi.org/10.1080/10635150600755453
[Anisimova et al., 2011]: https://doi.org/10.1093/sysbio/syr041
[De Maio et al., 2023]: https://doi.org/10.1038/s41588-023-01368-0
[De Maio et al., 2024]: https://doi.org/10.1101/2024.10.21.619398
[Felsenstein, 1985]: https://doi.org/10.2307/2408678
[Flouri et al., 2015]: https://doi.org/10.1093/sysbio/syu084
[Gadagkar et al., 2005]: https://doi.org/10.1002/jez.b.21026
[Gu et al., 1995]: http://mbe.oxfordjournals.org/content/12/4/546.abstract
[Guindon et al., 2010]: https://doi.org/10.1093/sysbio/syq010
[Hoang et al., in press]: https://doi.org/10.1093/molbev/msx281
[Kishino et al., 1990]: https://doi.org/10.1007/BF02109483
[Kishino and Hasegawa, 1989]: https://doi.org/10.1007/BF02100115
[Lanfear et al., 2012]: https://doi.org/10.1093/molbev/mss020
[Lanfear et al., 2014]: https://doi.org/10.1186/1471-2148-14-82
[Lanfear et al., 2017]: https://doi.org/10.1093/molbev/msw260
[Lartillot and Philippe, 2004]: https://doi.org/10.1093/molbev/msh112
[Minh et al., 2013]: https://doi.org/10.1093/molbev/mst024
[Nguyen et al., 2015]: https://doi.org/10.1093/molbev/msu300
[Seo et al., 2005]: https://doi.org/10.1073/pnas.0408313102
[Shimodaira and Hasegawa, 1999]: https://doi.org/10.1093/oxfordjournals.molbev.a026201
[Shimodaira, 2002]: https://doi.org/10.1080/10635150290069913
[Soubrier et al., 2012]: https://doi.org/10.1093/molbev/mss140
[Strimmer and Rambaut, 2002]: https://doi.org/10.1098/rspb.2001.1862
[Strimmer and von Haeseler, 1997]: http://www.pnas.org/content/94/13/6815.long
[Yang, 1994]: https://doi.org/10.1007/BF00160154
[Yang, 1995]: http://www.genetics.org/content/139/2/993.abstract