Beginner's tutorial
This tutorial gives a beginner's guide. 

Please first [download](http://www.iqtree.org/#download) and [install](Quickstart) the binary
for your platform. For the next steps, the folder containing your  `iqtree` executable should be added to your PATH enviroment variable so that IQ-TREE can be invoked by simply entering `iqtree` at the command-line. Alternatively, you can also copy `iqtree` binary into your system search.
TIP: For quick overview of all supported options in IQ-TREE, run the command  `iqtree -h`.

### Choosing the right substitution model

NOTE: If you use model selection please cite the following paper:

> __S. Kalyaanamoorthy, B.Q. Minh, T.K.F. Wong, A. von Haeseler, and L.S. Jermiin__ (2017) ModelFinder: fast model selection for accurate phylogenetic estimates. _Nat. Methods_, 14:587–589. 
    DOI: [10.1038/nmeth.4285](https://doi.org/10.1038/nmeth.4285)

IQ-TREE supports a wide range of [substitution models](Substitution-Models) for DNA, protein, codon, binary and morphological alignments. If you do not know which model is appropriate for your data, you can use ModelFinder to determine the best-fit model:

    iqtree -s example.phy -m MFP
    # change -m MFP to -m TEST to resemble jModelTest/ProtTest
        

`-m` is the option to specify the model name to use during the analysis. The special `MFP` key word stands for _ModelFinder Plus_, which tells IQ-TREE to perform ModelFinder and the remaining analysis using the selected model. ModelFinder computes the log-likelihoods
of an initial parsimony tree for many different models and the *Akaike information criterion* (AIC), *corrected Akaike information criterion* (AICc), and the *Bayesian information criterion* (BIC).
Then ModelFinder chooses the model that minimizes the BIC score (you can also change to AIC or AICc by 
adding the option `-AIC` or `-AICc`, respectively).

>**TIP**: Starting with version 1.5.4, `-m MFP` is the default behavior. Thus, this run is equivalent to `iqtree -s example.phy`.
{: .tip}

Here, IQ-TREE will write an additional file:

* `example.phy.model`: log-likelihoods for all models tested. It serves as a checkpoint file to recover an interrupted model selection.

If you now look at `example.phy.iqtree` you will see that IQ-TREE selected `TIM2+I+G4` as the best-fit model for this example data. Thus, for additional analyses you do not have to perform the model test again and can use the selected model:

    iqtree -s example.phy -m TIM2+I+G

Sometimes you only want to find the best-fit model without doing tree reconstruction, then run:

    iqtree -s example.phy -m MF
    # change -m MF to -m TESTONLY to resemble jModelTest/ProtTest
    
By default, the maximum number of categories is limitted to 10 due to computational reasons. If your sequence alignment is long enough, then you can increase this upper limit with the `cmax` option:

    iqtree -s example.phy -m MF -cmax 15
    

will test `+R2` to `+R15` instead of at most `+R10`.

To reduce computational burden, one can use the option `-mset` to restrict the testing procedure to a subset of base models instead of testing the entire set of all available models. For example, `-mset WAG,LG` will test only models like `WAG+...` or `LG+...`. Another useful option in this respect is `-msub` for AA data sets. With `-msub nuclear` only general AA models are included, whereas with `-msub viral` only AA models for viruses are included.

If you have enough computational resource, you can perform a thorough and more accurate analysis that invokes a full tree search for each model considered via the `-mtree` option:

    iqtree -s example.phy -m MF -mtree