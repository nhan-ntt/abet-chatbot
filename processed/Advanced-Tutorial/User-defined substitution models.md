Advanced tutorial
Recommended for experienced users to explore more features.
To get started, please read the [Beginner's Tutorial](Tutorial) first if not done so yet.

### User-defined substitution models

Users can specify any DNA model using a 6-letter code that defines which rates should be equal. 
For example, `010010` corresponds to the HKY model and `012345` to the GTR model.
In fact, IQ-TREE  uses this specification internally to simplify the coding. The 6-letter code is specified via the `-m` option, e.g.:


    iqtree -s example.phy -m 010010+G


Moreover, with the `-m` option one can input a file which contains the 6 rates (A-C, A-G, A-T, C-G, C-T, G-T) and 4 base frequencies (A, C, G, T).  For example:

    iqtree -s example.phy -m mymodel+G


where `mymodel` is a file containing the 10 entries described above, in the correct order. The entries can be seperated by either empty space(s) or newline character. One can even specify the rates within `-m` option by e.g.:


    iqtree -s example.phy -m 'TN{2.0,3.0}+G8{0.5}+I{0.15}'


That means, we use Tamura-Nei model with fixed transition-transversion rate ratio of 2.0 and purine/pyrimidine rate ratio of 3.0. Moreover, we
use 8-category Gamma-distributed site rates with the shape parameter (alpha) equal to 0.5 and a proportion of invariable sites p-inv=0.15.

By default IQ-TREE computes empirical state frequencies from the alignment by counting, but one can also estimate the frequencies by maximum-likelihood
with `+Fo` in the model name:


    iqtree -s example.phy -m GTR+G+Fo


For amino-acid alignments, IQ-TREE use the empirical frequencies specified in the model. If you want frequencies as counted from the alignment, use `+F`, for example:


    iqtree -s myprotein_alignment -m WAG+G+F


Note that all model specifications above can be used in the partition model NEXUS file.