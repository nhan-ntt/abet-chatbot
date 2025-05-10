Substitution models
All common substitution models and usages.
IQ-TREE supports a wide range of substitution models, including advanced partition and mixture models. This guide gives a detailed information of all available models.

TIP: If you do not know which model to use, simply run IQ-TREE with the standard model selection (`-m TEST` option) or the new ModelFinder (`-m MFP`). It automatically determines best-fit model for your data.

### Rate heterogeneity across sites

IQ-TREE supports all common rate heterogeneity across sites models:

| RateType | Explanation |
|----------|------------------------------------------------------------------------|
| +I       | allowing for a proportion of invariable sites. |
| +G       | discrete Gamma model ([Yang, 1994]) with default 4 rate categories. The number of categories can be changed with e.g. `+G8`. |
| +GC       | continuous Gamma model ([Yang, 1994]) (for AliSim only). |
| +I+G     | invariable site plus discrete Gamma model ([Gu et al., 1995]). |
| +R       | FreeRate model ([Yang, 1995]; [Soubrier et al., 2012]) that generalizes the `+G` model by relaxing the assumption of Gamma-distributed rates. The number of categories can be specified with e.g. `+R6` (default 4 categories if not specified). The FreeRate model typically fits data better than the `+G` model and is recommended for analysis of large data sets. |
| +I+R     | invariable site plus FreeRate model. |

>**TIP**: The new ModelFinder (`-m MFP` option) tests the FreeRate model, whereas the standard procedure (`-m TEST`) does not.
{: .tip}

Users can fix the parameters of the model. For example, `+I{0.2}` will fix the proportion of invariable sites (pinvar) to 0.2; `+G{0.9}` will fix the Gamma shape parameter (alpha) to 0.9; `+I{0.2}+G{0.9}` will fix both pinvar and alpha. To fix the FreeRate model parameters, use the syntax `+Rk{w1,r1,...,wk,rk}` (replacing `k` with the number of categories). Here, `w1, ..., wk` are the weights and `r1, ..., rk` the rates for each category. 

>**NOTE**: For the `+G` model IQ-TREE implements the _mean_ approximation approach ([Yang, 1994]). The same is done in RAxML and PhyML. However, some programs like TREE-PUZZLE implement the _median_ approximation approach, which makes the resulting log-likelihood not comparable. IQ-TREE can change to this approach via the `-gmedian` option.



[Abascal et al., 2007]: https://doi.org/10.1093/molbev/msl136
[Adachi and Hasegawa, 1996]: https://doi.org/10.1007/BF02498640
[Adachi et al., 2000]: https://doi.org/10.1007/s002399910038
[Banos et al., 2024]: https://doi.org/10.1101/2024.03.29.587376
[Bielawski and Gold, 2002]: https://doi.org/10.1093/genetics/161.4.1589
[Dang et al., 2010]: https://doi.org/10.1186/1471-2148-10-99
[Dang et al., 2022]: https://doi.org/10.1093/sysbio/syac007
[Dayhoff et al., 1978]: http://compbio.berkeley.edu/class/c246/Reading/dayhoff-1978-apss.pdf
[Dimmic et al., 2002]: https://doi.org/10.1007/s00239-001-2304-y
[El-Gebali et al., 2018]: https://doi.org/10.1093/nar/gky995
[Felsenstein, 1981]: https://doi.org/10.1007%2FBF01734359
[Goldman and Yang, 1994]: http://mbe.oxfordjournals.org/content/11/5/725.abstract
[Gu et al., 1995]: http://mbe.oxfordjournals.org/content/12/4/546.abstract
[Hasegawa, Kishino and Yano, 1985]: https://dx.doi.org/10.1007%2FBF02101694
[Henikoff and Henikoff, 1992]: https://dx.doi.org/10.1073%2Fpnas.89.22.10915
[Jarvis et al., 2015]: https://doi.org/10.1186/s13742-014-0038-1
[Jones et al., 1992]: https://dx.doi.org/10.1093%2Fbioinformatics%2F8.3.275
[Jukes and Cantor, 1969]: http://doi.org/10.1016/B978-1-4832-3211-9.50009-7
[Kimura, 1980]: https://doi.org/10.1007%2FBF01731581
[Kimura, 1981]: https://doi.org/10.1073/pnas.78.1.454
[Kosiol and Goldman, 2005]: https://doi.org/10.1093/molbev/msi005
[Kosiol et al., 2007]: https://doi.org/10.1093/molbev/msm064
[Lartillot and Philippe, 2004]: https://doi.org/10.1093/molbev/msh112
[Le and Gascuel, 2008]: https://doi.org/10.1093/molbev/msn067
[Le and Vinh, 2020]: https://doi.org/10.1007/s00239-020-09943-3
[Le et al., 2008a]: https://doi.org/10.1093/bioinformatics/btn445
[Le et al., 2008b]: https://doi.org/10.1098/rstb.2008.0180
[Le and Gascuel, 2010]: https://doi.org/10.1093/sysbio/syq002
[Le et al., 2012]: https://doi.org/10.1093/molbev/mss112
[Lewis, 2001]: https://doi.org/10.1080/106351501753462876
[Minh et al., 2021]: https://doi.org/10.1093/sysbio/syab010
[Misof et al., 2014]: https://doi.org/10.1126/science.1257570
[Mueller and Vingron, 2000]: https://doi.org/10.1089/10665270050514918
[Muse and Gaut, 1994]: http://mbe.oxfordjournals.org/content/11/5/715.abstract
[Nickle et al., 2007]: https://dx.doi.org/10.1371/journal.pone.0000503
[Ran et al., 2018]: https://doi.org/10.1098/rspb.2018.1012
[Rota-Stabelli et al., 2009]: https://doi.org/10.1016/j.ympev.2009.01.011
[Schneider et al., 2005]: https://doi.org/10.1186/1471-2105-6-134
[Shen et al., 2018]: https://doi.org/10.1016/j.cell.2018.10.023
[Soubrier et al., 2012]: https://doi.org/10.1093/molbev/mss140
[Tamura and Nei, 1993]: http://mbe.oxfordjournals.org/cgi/content/abstract/10/3/512
[Tavare, 1986]: http://www.damtp.cam.ac.uk/user/st321/CV_&_Publications_files/STpapers-pdf/T86.pdf
[Veerassamy et al., 2004]: https://doi.org/10.1089/106652703322756195
[Vinh et al., 2017]: https://doi.org/10.1186/s12862-017-0987-y
[Wang et al., 2008]: https://doi.org/10.1186/1471-2148-8-331
[Whelan and Goldman, 2001]: https://doi.org/10.1093/oxfordjournals.molbev.a003851
[Woodhams et al., 2015]: https://doi.org/10.1093/sysbio/syv021
[Wu et al., 2018]: https://doi.org/10.1016%2Fj.dib.2018.04.094
[Yang, 1994]: https://doi.org/10.1007/BF00160154
[Yang, 1995]: http://www.genetics.org/content/139/2/993.abstract
[Yang et al., 1998]: http://mbe.oxfordjournals.org/content/15/12/1600.abstract
[Zharkikh, 1994]: https://doi.org/10.1007/BF00160155