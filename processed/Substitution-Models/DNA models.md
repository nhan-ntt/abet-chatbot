Substitution models
All common substitution models and usages.
IQ-TREE supports a wide range of substitution models, including advanced partition and mixture models. This guide gives a detailed information of all available models.

TIP: If you do not know which model to use, simply run IQ-TREE with the standard model selection (`-m TEST` option) or the new ModelFinder (`-m MFP`). It automatically determines best-fit model for your data.

### DNA models

Base substitution rates

IQ-TREE includes all common DNA models (ordered by complexity):

| Model        | df | Explanation | Code |
|--------------|----|---------------------------------------------------------------|--------|
| JC or JC69   | 0 | Equal substitution rates and equal base frequencies ([Jukes and Cantor, 1969]). | 000000 |
| F81          | 3 | Equal rates but unequal base freq. ([Felsenstein, 1981]). | 000000 |
| K80 or K2P   | 1 | Unequal transition/transversion rates and equal base freq. ([Kimura, 1980]). | 010010 |
| HKY or HKY85 | 4 | Unequal transition/transversion rates and unequal base freq. ([Hasegawa, Kishino and Yano, 1985]). | 010010 |
| TN or TN93   | 5 | Like `HKY` but unequal purine/pyrimidine rates ([Tamura and Nei, 1993]). | 010020 |
| TNe          | 2 | Like `TN` but equal base freq. | 010020 |
| K81 or K3P   | 2 | Three substitution types model and equal base freq. ([Kimura, 1981]). | 012210 |
| K81u         | 5 | Like `K81` but unequal base freq. | 012210 |
| TPM2         | 2 | AC=AT, AG=CT, CG=GT and equal base freq. | 010212 |
| TPM2u        | 5 | Like `TPM2` but unequal base freq. | 010212 |
| TPM3         | 2 | AC=CG, AG=CT, AT=GT and equal base freq. | 012012 |
| TPM3u        | 5 | Like `TPM3` but unequal base freq. | 012012 |
| TIM          | 6 | Transition model, AC=GT, AT=CG and unequal base freq. | 012230 |
| TIMe         | 3 | Like `TIM` but equal base freq. | 012230 |
| TIM2         | 6 | AC=AT, CG=GT and unequal base freq. | 010232 |
| TIM2e        | 3 | Like `TIM2` but equal base freq. | 010232 |
| TIM3         | 6 | AC=CG, AT=GT and unequal base freq. | 012032 |
| TIM3e        | 3 | Like `TIM3` but equal base freq. | 012032 |
| TVM          | 7 | Transversion model, AG=CT and unequal base freq. | 012314 |
| TVMe         | 4 | Like `TVM` but equal base freq. | 012314 |
| SYM          | 5 | Symmetric model with unequal rates but equal base freq. ([Zharkikh, 1994]). | 012345 |
| GTR          | 8 | General time reversible model with unequal rates and unequal base freq. ([Tavare, 1986]). | 012345 |

The last column `Code` is a 6-digit code defining the equality constraints for 6 *relative* substitution rates: A-C, A-G, A-T, C-G, C-T and G-T. `010010` means that A-G rate is equal to C-T rate (corresponding to `1` in the code) and the remaining four substitution rates are equal (corresponding to `0` in the code). Thus, `010010` is equivalent to K80 or HKY model (depending on whether base frequencies are equal or not). `012345` is equivalent to GTR or SYM model as there is no restriction defined by such 6-digit code.

Moreover, IQ-TREE supports arbitrarily restricted DNA model via a 6-digit code, e.g. with option `-m 012012+G`.

>**NOTE**: The digits in the codes do not necessarily have to have the same order as above. That means '101101' describes the same matrix as '010010'. The last rate, which corresponds to G-T, (and all rates with the same digit) is always set equal to 1.0 for convenience because the rates are relative.

If users want to fix model parameters, append the model name with a curly bracket `{`, followed by the comma-separated rate parameters, and a closing curly bracket `}`. For example, `GTR{1.0,2.0,1.5,3.7,2.8}` specifies 6 substitution rates A-C=1.0, A-G=2.0, A-T=1.5, C-G=3.7, C-T=2.8 and G-T=1.0. 

Another example is for model `TIM2` that has the 6-digit code `010232`. Thus, `TIM2{4.39,5.30,12.1}` means that A-C=A-T=4.39 (coded `0`), A-G=5.30 (coded `1`), C-T=12.1 (coded `3`) and C-G=G-T=1.0 (coded `2`). This is, in turn, equivalent to specifying `GTR{4.39,5.30,4.39,1.0,12.1}`.


Base frequencies

Users can specify three different kinds of base frequencies:

| FreqType | Explanation |
|----------|------------------------------------------------------------------------|
| +F  | Empirical base frequencies. This is the default if the model has unequal base freq. In AliSim, if users neither specify base frequencies nor supply an input alignment, AliSim will generate base frequencies from empirical distributions. |
| +FQ | Equal base frequencies.|
| +FO |  Optimized base frequencies by maximum-likelihood.|

For example, `GTR+FO` optimizes base frequencies by ML whereas `GTR+F` (default) counts base frequencies directly from the alignment.

Finally, users can fix base frequencies with e.g. `GTR+F{0.1,0.2,0.3,0.4}` to fix the corresponding frequencies of A, C, G and T (must sum up to 1.0).


Lie Markov models

Starting with version 1.6, IQ-TREE supports a series of Lie Markov models ([Woodhams et al., 2015]), many of which are non-reversible models. Lie Markov models have a consistent property, which is lacking in other common models such as GTR. The following table shows the list of all Lie Markov models (the number before `.` in the name shows the number of parameters of the model):

| Model  | Rev? | Freq | Note |
|--------|------|------|--------------------------------------|
| 1.1    | Yes  | 0    | equiv. to JC  |
| 2.2b   | Yes  | 0    | equiv. to K2P |
| 3.3a   | Yes  | 0    | equiv. to K3P |
| 3.3b   | No   | 0    |  |
| 3.3c   | Yes  | 0    | equiv. to TNe |
| 3.4    | Yes  | 1    |  |
| 4.4a   | Yes  | 3    | equiv. to F81 |
| 4.4b   | Yes  | 1    |  |
| 4.5a   | No   | 1    |  |
| 4.5b   | No   | 1    |  |
| 5.6a   | No   | 0    |  | 
| 5.6b   | No   | 3    |  |
| 5.7a   | No   | 2    |  |
| 5.7b   | No   | 0    |  |
| 5.7c   | No   | 0    |  |
| 5.11a  | No   | 2    |  |
| 5.11b  | No   | 0    |  |
| 5.11c  | No   | 0    |  |
| 5.16   | No   | 1    |  |
| 6.6    | No   | 1    | equiv. to STRSYM for strand-symmetric model ([Bielawski and Gold, 2002]) |
| 6.7a   | No   | 3    | F81+K3P |
| 6.7b   | No   | 3    |  |
| 6.8a   | No   | 3    |  |
| 6.8b   | No   | 1    |  |
| 6.17a  | No   | 1    |  |
| 6.17b  | No   | 1    |  |
| 8.8    | No   | 3    |  |
| 8.10a  | No   | 3    |  |
| 8.10b  | No   | 1    |  |
| 8.16   | No   | 3    |  |
| 8.17   | No   | 3    |  |
| 8.18   | No   | 3    |  |
| 9.20a  | No   | 2    |  |
| 9.20b  | No   | 0    | Doubly stochastic |
| 10.12  | No   | 3    |  |
| 10.34  | No   | 3    |  |
| 12.12  | No   | 3    | equiv. to UNREST (unrestricted model) |

Column __Rev?__ shows whether the model is reversible or not. Column __Freq__ shows the number of free base frequencies. 0 means equal base frequency; 1 means f(A)=f(G) and f(C)=f(T); 2 means f(A)+f(G)=0.5=f(C)+f(T); 3 means unconstrained frequencies.

All Lie Markov models can have one of the following prefices:

| Prefix | Meaning |
|--------|-------------------------------------|
| RY     | purine-pyrimidine pairing (default) |
| WS     | weak-strong pairing |
| MK     | aMino-Keto pairing |