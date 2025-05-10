Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Specifying substitution models

`-m` is a powerful option to specify substitution models, state frequency and rate heterogeneity type. The general syntax is:

    -m MODEL+FreqType+RateType

where `MODEL` is a model name, `+FreqType` (optional) is the frequency type and `+RateType` (optional) is the rate heterogeneity type. 

The following `MODEL`s are available:

| DataType | Model names |
|------------|------------------------------------------------------------------------------|
| DNA        | JC/JC69, F81, K2P/K80, HKY/HKY85, TN/TrN/TN93, TNe, K3P/K81, K81u, TPM2, TPM2u, TPM3, TPM3u, TIM, TIMe, TIM2, TIM2e, TIM3, TIM3e, TVM, TVMe, SYM, GTR and 6-digit specification. See [DNA models](Substitution-Models#dna-models) for more details. |
| Protein    | BLOSUM62, cpREV, Dayhoff, DCMut, FLU, HIVb, HIVw, JTT, JTTDCMut, LG, mtART, mtMAM, mtREV, mtZOA, mtMet, mtVer, mtInv, Poisson, PMB, rtREV, VT, WAG. |
| Protein    | Mixture models: C10, ..., C60 (CAT model) ([Lartillot and Philippe, 2004]), EX2, EX3, EHO, UL2, UL3, EX_EHO, LG4M, LG4X, CF4. See [Protein models](Substitution-Models#protein-models) for more details. |
| Codon      | MG, MGK, MG1KTS, MG1KTV, MG2K, GY, GY1KTS, GY1KTV, GY2K, ECMK07/KOSI07, ECMrest, ECMS05/SCHN05 and combined empirical-mechanistic models. See [Codon models](Substitution-Models#codon-models) for more details. |
| Binary     | JC2, GTR2. See [Binary and morphological models](Substitution-Models#binary-and-morphological-models) for more details. |
| Morphology | MK, ORDERED. See [Binary and morphological models](Substitution-Models#binary-and-morphological-models) for more details. |

The following `FreqType`s are supported:

| FreqType | Meaning |
|----------|------------------------------------------------------------------------------|
| `+F`     | Empirical state frequency observed from the data. |
| `+FO`    | State frequency optimized by maximum-likelihood from the data. Note that this is with letter-O and not digit-0. |
| `+FQ`    | Equal state frequency. |
| `+F1x4`  | See [Codon frequencies](Substitution-Models#codon-frequencies). |
| `+F3x4`  | See [Codon frequencies](Substitution-Models#codon-frequencies). |

Further options:

| Option | Usage and meaning |
|----------|------------------------------------------------------------------------------|
| `-mwopt` | Turn on optimizing weights of mixture models. Note that for models like `LG+C20+F+G` this mode is automatically turned on, but not for `LG+C20+G`. |

Example usages:

* Infer an ML tree for a DNA alignment `dna.phy` under GTR+I+G model:

        iqtree -s dna.phy -m GTR+I+G

* Infer an ML tree for a protein alignment `prot.phy` under LG+F+G model:

        iqtree -s prot.phy -m LG+F+G

* Infer an ML tree for a protein alignment `prot.phy` under profile mixture model LG+C10+F+G:

        iqtree -s prot.phy -m LG+C10+F+G


| Option | Usage and meaning |
|----------|------------------------------------------------------------------------------|
| `--link-exchange` | Turn on linked exchangeability estimation for a profile mixture model. Note that the model must have specified `GTR20` exchangeabilities for eg.`GTR20+C20+G`. This option also produces a nexus file `GTRPMIX.nex` with the exchangeability matrix obtained from the optimization. This file can be later used for phylogenetic inference with the use of the `-mdef` flag|
| `--init-exchange` | Specify the initial exchangeabilities for linked exchangeability estimation. Note that this must be used with `--link-exchange`. |

Example usages:

* Estimate linked exchangeabilities for a protein alignment `prot.phy` under C60+G model and a guide tree `guide.treefile`, where optimization is initialized from LG exchangeabilities

        iqtree -s prot.phy -m GTR20+C60+G --link-exchange --init-exchange LG -te guide.treefile

>**NOTE**: For better and faster performance, read the [recommendations](Estimating-amino-acid-substitution-models#estimating-linked-exchangeabilities) provided in the Estimating amino acid substitution models section.