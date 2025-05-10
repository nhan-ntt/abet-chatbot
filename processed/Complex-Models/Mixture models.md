Complex models
Complex models such as partition and mixture models.

This document gives detailed descriptions of complex maximum-likelihood models available in IQ-TREE. It is assumed that you know the [basic substitution models](Substitution-Models) already.

### Mixture models

What is the difference between partition and mixture models?

Mixture models,  like partition models, allow more than one substitution model along the sequences. However, while a partition model assigns each alignment site a given specific model, mixture models do not need this information. A mixture model will compute for each site its probability (or weight) of belonging to each of the mixture classes (also called categories or components). Since the site-to-class assignment is unknown, the site likelihood under mixture models is the weighted sum of site likelihoods per mixture class.

For example, the [discrete Gamma rate heterogeneity](Substitution-Models#rate-heterogeneity-across-sites) is a simple mixture model type. It has several rate categories with equal weight. IQ-TREE also supports a number of [predefined protein mixture models](Substitution-Models#protein-mixture-models) such as the profile mixture models `C10` to `C60` (The ML variants of Bayesian `CAT` models).

Here, we discuss several possibilities to define new mixture models in IQ-TREE.

Defining mixture models

To start with, the following command:

    iqtree -s example.phy -m "MIX{JC,HKY}"

specifies a mixture model (via the `MIX` keyword in the model string) with two components. The components (1) `JC` model, and (2) `HKY` model, are given in curly brackets and separated with a comma.  IQ-TREE will then estimate the parameters of both mixture components as well as their weights: the proportion of sites belonging to each component. 

>**NOTE**: Do not forget the double-quotes around model string! They prevent interpretation of the curly brackets by the command line shell, i.e., `MIX{JC,HKY}` would otherwise be interpreted as `MIXJC MIXHKY`.

Mixture models can be combined with rate heterogeneity, e.g.:

    iqtree -s example.phy -m "MIX{JC,HKY}+G4"

Here, we specify two mixture components and four Gamma rate categories. Effectively, this means that there are eight mixture components. Each site has a probability belonging to either `JC` or `HKY` and to one of the four rate categories.

MixtureFinder

MixtureFinder is an approach to select the optimum number of classes and the substitution model in each class for a mixture model of Q matrices. Starting with version 2.3.1, MixtureFinder is available in IQ-TREE. To run MixtureFinder:

	iqtree -s example.phy -m MIX+MF
	
Here, we estimate the optimal Q mixture model. To select mixture model and then do the tree search:

	iqtree -s example.phy -m MIX+MFP
	
BIC is the default criterion to assess the number of classes in the Q mixture model. AIC, AICc or likelihood ratio test (LRT) are also available to assess the number of classes.

To use AIC:

	iqtree -s example.phy -m MIX+MF -merit AIC
	
To use likelihood ratio test with p-value = 0.05 to assess the number of classes:

	iqtree -s example.phy -m MIX+MF -lrt 0.05 
	
(Note that: `-merit` also decides the creterion for selecting subtitution model type in each classes. If using LRT for assessing the number of classes, the default creterion for selecting subtitution model type is BIC.)

Options for ModelFinder also work for MixtureFinder, e.g.:

	iqtree -s example.phy -m MIX+MF -mset HKY,GTR -mrate E,I,G,I+G
	
The `-mset HKY,GTR` means we select subtitution model type among only `HKY` and `GTR` substitution models in each iteration of adding one more class. The `-mrate E,I,G,I+G` means we select the rate heterogeneity across sites models among `+E`, `+I`, `G` and `+I+G` models.

Other options for MixtureFinder:

| Model option   | Description                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `-qmax`        | Maximum number of Q-mixture classes (default: 10). Specify a number after the option (e.g., `-qmax 5`).                              |
| `-mrate-twice` | Whether estimate the rate heterogeneity across sites models again after select the best Q-mixture model. 1: yes, 0: no. (default: 0) |

If you use MixtureFinder in a publication please cite:

> __H. Ren, T.K.F. Wong, B.Q. Minh, R. Lanfear__ (2025) MixtureFinder: Estimating DNA mixture models for phylogenetic analyses. _Mol. Biol. Evol_. <https://doi.org/10.1093/molbev/msae264>



Profile mixture models

Sometimes one only wants to model the changes in nucleotide or amino-acid frequencies along the sequences while keeping the substitution rate matrix the same. This can be specified in IQ-TREE via `FMIX{...}` model syntax. For convenience the mixture components can be defined in a NEXUS file like this (example corresponds to [the CF4 model](Substitution-Models#protein-mixture-models) of ([Wang et al., 2008])): 

    #nexus
    begin models;
        frequency Fclass1 = 0.02549352 0.01296012 0.005545202 0.006005566 0.01002193 0.01112289 0.008811948 0.001796161 0.004312188 0.2108274 0.2730413 0.01335451 0.07862202 0.03859909 0.005058205 0.008209453 0.03210019 0.002668138 0.01379098 0.2376598;
        frequency Fclass2 = 0.09596966 0.008786096 0.02805857 0.01880183 0.005026264 0.006454635 0.01582725 0.7215719 0.003379354 0.002257725 0.003013483 0.01343441 0.001511657 0.002107865 0.006751404 0.04798539 0.01141559 0.000523736 0.002188483 0.004934972;
        frequency Fclass3 = 0.01726065 0.005467988 0.01092937 0.3627871 0.001046402 0.01984758 0.5149206 0.004145081 0.002563289 0.002955213 0.005286931 0.01558693 0.002693098 0.002075771 0.003006167 0.01263069 0.01082144 0.000253451 0.001144787 0.004573568;
        frequency Fclass4 = 0.1263139 0.09564027 0.07050061 0.03316681 0.02095119 0.05473468 0.02790523 0.009007538 0.03441334 0.005855319 0.008061884 0.1078084 0.009019514 0.05018693 0.07948 0.09447839 0.09258897 0.01390669 0.05367769 0.01230413;

        frequency CF4model = FMIX{empirical,Fclass1,Fclass2,Fclass3,Fclass4};
    end;

>**NOTE**: The amino-acid order in this file is: A   R   N   D   C   Q   E   G   H   I   L   K   M   F   P   S   T   W   Y   V.

Here, the NEXUS file contains a `models` block to define new models. More explicitly, we define four AA profiles `Fclass1` to `Fclass4`, each containing 20 AA frequencies. Then, the frequency mixture is defined with

    FMIX{empirical,Fclass1,Fclass2,Fclass3,Fclass4}

This means, we have five components: the first corresponds to empirical AA frequencies to be inferred from the  data and the remaining four components are specified in this NEXUS file. Please save this to a file, say, `mymodels.nex`. One can now start the analysis with:

    iqtree -s some_protein.aln -mdef mymodels.nex -m JTT+CF4model+G

The `-mdef` option specifies the NEXUS file containing user-defined models (see below). Here, the `JTT` matrix is applied for all alignment sites and one varies the AA profiles along the alignment. One can use the NEXUS syntax to define all other profile mixture models such as `C10` to `C60`.

NEXUS model file

In fact, IQ-TREE uses this NEXUS model file internally to define all [protein mixture models](Substitution-Models#protein-mixture-models). In addition to defining state frequencies, one can specify the entire model with rate matrix and state frequencies together. For example, the LG4M model ([Le et al., 2012]) can be defined by:

    #nexus
    begin models;
        model LG4M1 =
            0.269343
            0.254612 0.150988
            0.236821 0.031863 0.659648
            ....;
        ....
        model LG4M4 = ....;
        
        model LG4M = MIX{LG4M1,LG4M2,LG4M3,LG4M4}*G4;
    end;

Here, we first define the four matrices `LG4M1`, `LG4M2`, `LG4M3` and `LG4M4` in PAML format (see [protein models](Substitution-Models#protein-models)). Then `LG4M` is defined as mixture model with these four components *fused* with Gamma rate heterogeneity (via `*G4` syntax instead of `+G4`). This means that, in total, we have 4 mixture components instead of 16. The first component `LG4M1` is rescaled by the rate of the lowest Gamma rate category. The fourth component `LG4M4` corresponds to the highest rate.

Note that both `frequency` and `model` commands can be embedded into a single model file.