Substitution models
All common substitution models and usages.
IQ-TREE supports a wide range of substitution models, including advanced partition and mixture models. This guide gives a detailed information of all available models.

TIP: If you do not know which model to use, simply run IQ-TREE with the standard model selection (`-m TEST` option) or the new ModelFinder (`-m MFP`). It automatically determines best-fit model for your data.

### Codon models

To apply a codon model one should use the option `-st CODON` to tell IQ-TREE that the alignment contains protein coding sequences (otherwise, IQ-TREE thinks that it contains DNA sequences and will apply DNA models). This implicitly applies the standard genetic code. You can change to an other genetic code by appending the appropriate ID to the `CODON` keyword:

| Code    | Genetic code meaning |
|---------|------------------------------------------------------------------------|
| CODON1  | The Standard Code (same as `-st CODON`)|
| CODON2  | The Vertebrate Mitochondrial Code |
| CODON3  | The Yeast Mitochondrial Code |
| CODON4  | The Mold, Protozoan, and Coelenterate Mitochondrial Code and the Mycoplasma/Spiroplasma Code |
| CODON5  | The Invertebrate Mitochondrial Code |
| CODON6  | The Ciliate, Dasycladacean and Hexamita Nuclear Code |
| CODON9  | The Echinoderm and Flatworm Mitochondrial Code |
| CODON10 | The Euplotid Nuclear Code |
| CODON11 | The Bacterial, Archaeal and Plant Plastid Code |
| CODON12 | The Alternative Yeast Nuclear Code |
| CODON13 | The Ascidian Mitochondrial Code |
| CODON14 | The Alternative Flatworm Mitochondrial Code |
| CODON16 | Chlorophycean Mitochondrial Code |
| CODON21 | Trematode Mitochondrial Code |
| CODON22 | Scenedesmus obliquus Mitochondrial Code |
| CODON23 | Thraustochytrium Mitochondrial Code |
| CODON24 | Pterobranchia Mitochondrial Code |
| CODON25 | Candidate Division SR1 and Gracilibacteria Code |

(The IDs follow the specification at <http://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi>).

Codon substitution rates

IQ-TREE supports several codon models:

| Model            | Explanation |
|------------------|------------------------------------------------------------------------|
| MG               | Nonsynonymous/synonymous (dn/ds) rate ratio ([Muse and Gaut, 1994]).
| MGK              | Like `MG` with additional transition/transversion (ts/tv) rate ratio.
| MG1KTS or MGKAP2 | Like `MG` with a transition rate ([Kosiol et al., 2007]).
| MG1KTV or MGKAP3 | Like `MG` with a transversion rate ([Kosiol et al., 2007]).
| MG2K or MGKAP4   | Like `MG` with a transition rate and a transversion rate ([Kosiol et al., 2007]).
| GY               | Nonsynonymous/synonymous and transition/transversion rate ratios ([Goldman and Yang, 1994]).
| GY1KTS or GYKAP2 | Like `GY` with a transition rate ([Kosiol et al., 2007]).
| GY1KTV or GYKAP3 | Like `GY` with a transversion rate ([Kosiol et al., 2007]).
| GY2K or GYKAP4   | Like `GY` with a transition rate and a transversion rate ([Kosiol et al., 2007]).
| ECMK07 or KOSI07 | Empirical codon model ([Kosiol et al., 2007]).
| ECMrest          | Restricted version of `ECMK07` that allows only one nucleotide exchange.
| ECMS05 or SCHN05 | Empirical codon model ([Schneider et al., 2005]).

Users could specify the model parameters (e.g., Nonsynonymous/synonymous (dn/ds) rate ratio, and/or transition/transversion (ts/tv) rate ratio, and/or transition rate, and/or a transversion rate) by `<Model_Name>{<omega>,[<kappa>],[<kappa2>]}`. For example, `MG2K{1.0,0.3,0.5}` specifies the nonsynonymous/synonymous (dn/ds) rate ratio, the transition rate, and the transversion rate are 1.0, 0.3, 0.5, respectively. The number of input parameters depends on the definition of each model.

The last three models (`ECMK07`, `ECMrest` or `ECMS05`) are called *empirical* codon models, whereas the others are called *mechanistic* codon models.

Moreover, IQ-TREE supports combined empirical-mechanistic codon models using an underscore separator (`_`). For example:

* `ECMK07_GY2K`: The combined `ECMK07` and `GY2K` model, with the rate entries being multiplication of the two corresponding rate matrices.

Thus, there can be many such combinations.

**Starting with version 1.5.6:** If the model name does not match any of the above listed models, IQ-TREE assumes that it is a file containing lower diagonal part of non-stop codon exchange rate matrix, non-stop codon frequencies and a list of non-stop codons. The rest of the file will be ignored. Example files (ECMrest.dat and ECMunrest.dat) can be downloaded from the supplementary material ([Kosiol et al., 2007]).


>**NOTE**: Branch lengths under codon models are interpreted as number of nucleotide substitutions per codon site. Thus, they are typically 3 times longer than under DNA models.


Codon frequencies

IQ-TREE supports the following codon frequencies:

| FreqType | Explanation |
|----------|------------------------------------------------------------------------|
| +F       | Empirical codon frequencies counted from the data. In AliSim, if users neither specify base frequencies nor supply an input alignment, AliSim will generate base frequencies from empirical distributions.|
| +FQ      | Equal codon frequencies.|
| +F1X4    | Unequal nucleotide frequencies but equal nt frequencies over three codon positions. In AliSim, if users don't supply an input alignment, the base frequencies are randomly generated based on empirical distributions, or users could specify the frequencies via `+F1X4{<freq_0>,...,<freq_4>}`.|
| +F3X4    | Unequal nucleotide frequencies and unequal nt frequencies over three codon positions. In AliSim, if users don't supply an input alignment, the base frequencies are randomly generated based on empirical distributions, or users could specify the frequencies via  `+F3X4{<freq_0>,...,<freq_11>}`|

If not specified, the default codon frequency will be `+F3X4` for `MG`-type models, `+F` for `GY`-type models and given by the model for empirical codon models.