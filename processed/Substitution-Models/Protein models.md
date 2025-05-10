Substitution models
All common substitution models and usages.
IQ-TREE supports a wide range of substitution models, including advanced partition and mixture models. This guide gives a detailed information of all available models.

TIP: If you do not know which model to use, simply run IQ-TREE with the standard model selection (`-m TEST` option) or the new ModelFinder (`-m MFP`). It automatically determines best-fit model for your data.

### Protein models

Amino-acid exchange rate matrices

IQ-TREE supports all common empirical amino-acid exchange rate matrices (alphabetical order):

| Model | Region | Explanation |
|-------|--------|---------------------------------------------------------------|
| Blosum62 | nuclear | BLOcks SUbstitution Matrix ([Henikoff and Henikoff, 1992]). Note that `BLOSUM62` is not recommended for phylogenetic analysis as it was designed mainly for sequence alignments. |
| cpREV    | chloroplast |chloroplast matrix ([Adachi et al., 2000]). |
| Dayhoff  | nuclear | General matrix ([Dayhoff et al., 1978]). |
| DCMut    | nuclear | Revised `Dayhoff` matrix ([Kosiol and Goldman, 2005]). |
| EAL      | nuclear | General matrix. To be used with profile mixture models (for eg. EAL+C60) for reconstructing relationships between eukaryotes and Archaea ([Banos et al., 2024]). |
| ELM      | nuclear | General matrix. To be used with profile mixture models (for eg. ELM+C60) for phylogenetic analysis of proteins encoded by nuclear genomes of eukaryotes ([Banos et al., 2024]).|
| FLAVI    | viral | Flavivirus ([Le and Vinh, 2020]). | 
| FLU      | viral | Influenza virus ([Dang et al., 2010]). |
| GTR20    | general | General time reversible models with 190 rate parameters. *WARNING: Be careful when using this parameter-rich model as parameter estimates might not be stable, especially when not having enough phylogenetic information (e.g. not long enough alignments).* |
| HIVb     | viral | HIV between-patient matrix HIV-B<sub>m</sub> ([Nickle et al., 2007]). |
| HIVw     | viral | HIV within-patient matrix HIV-W<sub>m</sub> ([Nickle et al., 2007]). |
| JTT      | nuclear | General matrix ([Jones et al., 1992]). |
| JTTDCMut | nuclear | Revised `JTT` matrix ([Kosiol and Goldman, 2005]). |
| LG       | nuclear | General matrix ([Le and Gascuel, 2008]). |
| mtART    | mitochondrial | Mitochondrial Arthropoda ([Abascal et al., 2007]). |
| mtMAM    | mitochondrial | Mitochondrial Mammalia ([Yang et al., 1998]). |
| mtREV    | mitochondrial | Mitochondrial Vertebrate ([Adachi and Hasegawa, 1996]). |
| mtZOA    | mitochondrial | Mitochondrial Metazoa (Animals) ([Rota-Stabelli et al., 2009]). |
| mtMet    | mitochondrial | Mitochondrial Metazoa ([Vinh et al., 2017]). |
| mtVer    | mitochondrial | Mitochondrial Vertebrate ([Vinh et al., 2017]). |
| mtInv    | mitochondrial | Mitochondrial Inverterbrate ([Vinh et al., 2017]). |
| NQ.bird   | nuclear | Non-reversible Q matrix ([Dang et al., 2022]) estimated for birds ([Jarvis et al., 2015]). | 
| NQ.insect | nuclear | Non-reversible Q matrix ([Dang et al., 2022]) estimated for insects ([Misof et al., 2014]). | 
| NQ.mammal | nuclear | Non-reversible Q matrix ([Dang et al., 2022]) estimated for mammals ([Wu et al., 2018]). | 
| NQ.pfam   | nuclear | General non-reversible Q matrix ([Dang et al., 2022]) estimated from Pfam version 31 database ([El-Gebali et al., 2018]). | 
| NQ.plant  | nuclear | Non-reversible Q matrix ([Dang et al., 2022]) estimated for plants ([Ran et al., 2018]). | 
| NQ.yeast  | nuclear | Non-reversible Q matrix ([Dang et al., 2022]) estimated for yeasts ([Shen et al., 2018]). | 
| Poisson  | none | Equal amino-acid exchange rates and frequencies. |
| PMB      | nuclear | Probability Matrix from Blocks, revised `BLOSUM` matrix ([Veerassamy et al., 2004]). |
| Q.bird   | nuclear | Q matrix ([Minh et al., 2021]) estimated for birds ([Jarvis et al., 2015]). | 
| Q.insect | nuclear | Q matrix ([Minh et al., 2021]) estimated for insects ([Misof et al., 2014]). | 
| Q.mammal | nuclear | Q matrix ([Minh et al., 2021]) estimated for mammals ([Wu et al., 2018]). | 
| Q.pfam   | nuclear | General Q matrix ([Minh et al., 2021]) estimated from Pfam version 31 database ([El-Gebali et al., 2018]). | 
| Q.plant  | nuclear | Q matrix ([Minh et al., 2021]) estimated for plants ([Ran et al., 2018]). | 
| Q.yeast  | nuclear | Q matrix ([Minh et al., 2021]) estimated for yeasts ([Shen et al., 2018]). | 
| rtREV    | viral | Retrovirus ([Dimmic et al., 2002]). |
| VT       | nuclear | General 'Variable Time' matrix ([Mueller and Vingron, 2000]). |
| WAG      | nuclear | General matrix ([Whelan and Goldman, 2001]). |

Protein mixture models

IQ-TREE also supports a series of protein mixture models:

| Model | Explanation |
|------------|------------------------------------------------------------------------|
| C10 to C60 | 10, 20, 30, 40, 50, 60-profile mixture models ([Le et al., 2008a]) as variants of the CAT model ([Lartillot and Philippe, 2004]) for ML. Note that these models assume `Poisson` AA replacement and implicitly include a [Gamma rate heterogeneity among sites](#rate-heterogeneity-across-sites).
| EX2        | Two-matrix model for exposed/buried AA sites ([Le et al., 2008b]).
| EX3        | Three-matrix model for highly exposed/intermediate/buried AA sites ([Le et al., 2008b]).
| EHO        | Three-matrix model for extended/helix/other sites ([Le et al., 2008b]).
| UL2, UL3   | Unsupervised-learning variants of `EX2` and `EX3`, respectively.
| EX_EHO     | Six-matrix model combining `EX2` and `EHO` ([Le and Gascuel, 2010]).
| LG4M       | Four-matrix model fused with [Gamma rate heterogeneity](#rate-heterogeneity-across-sites) ([Le et al., 2012]).
| LG4X       | Four-matrix model fused with [FreeRate heterogeneity](#rate-heterogeneity-across-sites) ([Le et al., 2012]).
| CF4        | Five-profile mixture model ([Wang et al., 2008]).

One can even combine a protein matrix with a profile mixture model like:

* `LG+C20`: Applying `LG` matrix instead of `Poisson` for all 20 classes of AA profiles and a Gamma rate heterogeneity.
* `LG+C20+F`: Applying `LG` matrix for 20 classes plus the 21th class of empirical AA profile (counted from the current data) and Gamma rate heterogeneity.
* `JTT+CF4+G`: Applying `JTT` matrix for all 5 classes of AA profiles and Gamma rate heteorogeneity.

Moreover, one can override the Gamma rate by FreeRate heterogeneity:

* `LG+C20+R4`: Like `LG+C20` but replace Gamma by FreeRate heterogeneity.

User-defined empirical protein models

If the matrix name does not match any of the above listed models, IQ-TREE assumes that it is a file containing AA exchange rates and frequencies in PAML format. It contains the lower diagonal part of the matrix and 20 AA frequencies, e.g.:

    0.425093 
    0.276818 0.751878 
    0.395144 0.123954 5.076149 
    2.489084 0.534551 0.528768 0.062556 
    0.969894 2.807908 1.695752 0.523386 0.084808 
    1.038545 0.363970 0.541712 5.243870 0.003499 4.128591 
    2.066040 0.390192 1.437645 0.844926 0.569265 0.267959 0.348847 
    0.358858 2.426601 4.509238 0.927114 0.640543 4.813505 0.423881 0.311484 
    0.149830 0.126991 0.191503 0.010690 0.320627 0.072854 0.044265 0.008705 0.108882 
    0.395337 0.301848 0.068427 0.015076 0.594007 0.582457 0.069673 0.044261 0.366317 4.145067 
    0.536518 6.326067 2.145078 0.282959 0.013266 3.234294 1.807177 0.296636 0.697264 0.159069 0.137500 
    1.124035 0.484133 0.371004 0.025548 0.893680 1.672569 0.173735 0.139538 0.442472 4.273607 6.312358 0.656604 
    0.253701 0.052722 0.089525 0.017416 1.105251 0.035855 0.018811 0.089586 0.682139 1.112727 2.592692 0.023918 1.798853 
    1.177651 0.332533 0.161787 0.394456 0.075382 0.624294 0.419409 0.196961 0.508851 0.078281 0.249060 0.390322 0.099849 0.094464 
    4.727182 0.858151 4.008358 1.240275 2.784478 1.223828 0.611973 1.739990 0.990012 0.064105 0.182287 0.748683 0.346960 0.361819 1.338132 
    2.139501 0.578987 2.000679 0.425860 1.143480 1.080136 0.604545 0.129836 0.584262 1.033739 0.302936 1.136863 2.020366 0.165001 0.571468 6.472279 
    0.180717 0.593607 0.045376 0.029890 0.670128 0.236199 0.077852 0.268491 0.597054 0.111660 0.619632 0.049906 0.696175 2.457121 0.095131 0.248862 0.140825 
    0.218959 0.314440 0.612025 0.135107 1.165532 0.257336 0.120037 0.054679 5.306834 0.232523 0.299648 0.131932 0.481306 7.803902 0.089613 0.400547 0.245841 3.151815 
    2.547870 0.170887 0.083688 0.037967 1.959291 0.210332 0.245034 0.076701 0.119013 10.649107 1.702745 0.185202 1.898718 0.654683 0.296501 0.098369 2.188158 0.189510 0.249313 

    0.079066 0.055941 0.041977 0.053052 0.012937 0.040767 0.071586 0.057337 0.022355 0.062157 0.099081 0.064600 0.022951 0.042302 0.044040 0.061197 0.053287 0.012066 0.034155 0.069147 

(This is an example of an LG matrix taken from [PAML package](http://abacus.gene.ucl.ac.uk/software/paml.html)).
Note that the amino-acid order in this file is:

     A   R   N   D   C   Q   E   G   H   I   L   K   M   F   P   S   T   W   Y   V
    Ala Arg Asn Asp Cys Gln Glu Gly His Ile Leu Lys Met Phe Pro Ser Thr Trp Tyr Val


Amino-acid frequencies

By default, AA frequencies are given by the model. Users can change this with:

| FreqType | Explanation |
|----------|-------------|
| +F       | empirical AA frequencies from the data. In AliSim, if users neither specify the base frequencies nor supply an input alignment, AliSim will randomly generate the base frequencies from Uniform distribution.|
| +FO      | ML optimized AA frequencies from the data.|
| +FQ      | Equal AA frequencies.|

Users can also specify AA frequencies with, e.g.:
    
    +F{0.079066,0.055941,0.041977,0.053052,0.012937,0.040767,0.071586,0.057337,0.022355,0.062157,0.099081,0.064600,0.022951,0.042302,0.044040,0.061197,0.053287,0.012066,0.034155,0.069147}

(Example corresponds to the AA frequencies of the LG matrix).