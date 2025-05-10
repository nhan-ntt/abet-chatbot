Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Single branch tests

The following single branch tests are faster than all bootstrap analysis and recommended for extremely large data sets (e.g., >10,000 taxa):

| Option | Usage and meaning |
|-----------|------------------------------------------------------------------------------|
| `-alrt`   | Specify number of replicates (>=1000) to perform SH-like approximate likelihood ratio test (SH-aLRT) ([Guindon et al., 2010]). If number of replicates is set to 0 (`-alrt 0`), then the parametric aLRT test ([Anisimova and Gascuel 2006]) is performed, instead of SH-aLRT. |
| `-abayes` | Perform approximate Bayes test ([Anisimova et al., 2011]). |
| `-lbp`    | Specify number of replicates (>=1000) to perform fast local bootstrap probability method ([Adachi and Hasegawa, 1996b]). |

>**TIP**: One can combine all these tests (also including UFBoot `-bb` option) within a single IQ-TREE run. Each branch in the resulting tree will be assigned several support values separated by slash (`/`), where the order of support values is stated in the `.iqtree` report file.
{: .tip}

Example usages:

* Infer an ML tree and perform SH-aLRT test as well as ultrafast bootstrap with 1000 replicates:

        iqtree -s data.phy -m TEST -alrt 1000 -bb 1000