Phylogenetic Dating

Bayesian dating with MCMCtree


From IQ-TREE 2.5 onwards, we provide the functionality in IQ-TREE to infer time trees
using Bayesian MCMCtree method.

If you use this feature, please cite:

> __P. Demotte, M. Panchaksaram, N. Ly-Trong, M. dos Reis  and B.Q. Minh__
>(2025) IQ2MC: A New Framework to Infer Phylogenetic Time Trees Using IQ-TREE
>and MCMCtree.

### Estimating the gradients and the Hessian for MCMCtree dating

To obtain the Hessian file for MCMCtree approximate likelihood dating, you need
to perform step 2 in the workflow. For this step, IQ-TREE expects a rooted tree
file, the substitution model, and the multiple sequence alignment. When
`--dating mcmctree` option is used as below, IQ-TREE performs the gradients and
the Hessian calculation and generates the `Hessian file`. This Hessian file is
compatible with MCMCtree and you can use it as an input to MCMCtree for
approximate likelihood dating. 

If the alignment file is called `example.phy` and the rooted tree file is called
`example_tree.nwk`,

```
iqtree -s example.phy -m GTR+G4 -te example_tree.nwk --dating mcmctree --prefix example
```


Note that, Here we generate the Hessian file for a fixed rooted tree. You can
directly input the rooted tree which already contains fossil/tip calibration
information added using tree editing tools such as FigTree. When using the above
command, IQ-TREE generates the following files which can be used to run MCMCtree
for phylogenetic dating.

* `example.mcmctree.hessian`:  the hessian file which contains the gradients
vector and the Hessian for approximate likelihood dating.
* `example.rooted.nwk` : the rooted tree file which is compatible with the
Hessian file. It is necessary to use this tree file with MCMCtree for dating as
the Hessian is calculated with respect to the ordering of taxa of this tree
file.
* `example.mcmctree.ctl` : the control file that can be used directly to run
MCMCtree from IQ-TREE output of step 2.
* `example.dummy.aln` : It is not necessary to use the alignment with MCMCtree
under approximate likelihood dating. However, in the current format MCMCtree
requires an alignment, and you can simply use this dummy alignment file as the
input to MCMCtree to save compute.


You can specify more parameters in the workflow to generate the control file
accurately for the analysis with IQ-TREE.

```
iqtree -s example.phy -m GTR+G4 -te example_tree.nwk --dating mcmctree --mcmc-iter 20000,200,50000 --mcmc-bds 1,1,0.5 --mcmc-clock IND
```

* `--mcmc-iter burnin,samplefreq,nsample` : use to set number of burin samples,
sample frequency and number of MCMC samples in the control file. In the above
example, burnin =20000, samplefreq = 200 and nsample = 50000

* `--mcmc-bds birth-rate,death-rate,sampling-fraction`: use to set the
parameters for birth-death prior in MCMCtree. In the above example, 
birth-rate=1, death-rate=1 and sampling-fraction=0.5

* `--mcmc-clock <EQUAL|IND|CORR>` : use to set clock model for MCMCtree.
Currently supported clocks models are EQUAL: global clock with equal rates, IND:
independent rates model with independent rates across lineages and CORR:
correlated clock model with auto-correlated rates across the lineages.