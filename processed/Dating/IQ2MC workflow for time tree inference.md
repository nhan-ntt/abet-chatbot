Phylogenetic Dating

Bayesian dating with MCMCtree


From IQ-TREE 2.5 onwards, we provide the functionality in IQ-TREE to infer time trees
using Bayesian MCMCtree method.

If you use this feature, please cite:

> __P. Demotte, M. Panchaksaram, N. Ly-Trong, M. dos Reis  and B.Q. Minh__
>(2025) IQ2MC: A New Framework to Infer Phylogenetic Time Trees Using IQ-TREE
>and MCMCtree.

### IQ2MC workflow for time tree inference

The IQ2MC workflow has three steps that integrate IQ-TREE and MCMCtree. The
final output is a time-estimated phylogeny starting from a multiple-sequence
alignment as displayed in the following figure.

* `Step1`: Given an input multiple sequence alignment, IQ-TREE will infer the
maximum likelihood tree using the IQ-TREE tree search algorithm. Note that, the
tree estimated here should be a rooted tree or you need to manually root the
tree as MCMCtree only accepts rooted trees for phylogenetic dating. In this
step, IQ-TREE also estimates the best-fitted substitution model for the data if
you do not specify the model. This step is optional if you provide a rooted
tree, the MSA, and the substitution model for step 2.
* `step2`: For fast approximate likelihood dating, MCMC requires the gradients
and the Hessian/Hessians of the branch lengths calculated at maximum likelihood
estimates. Given the rooted tree with fossil/tip calibrations, the substitution
model, and the MSA, IQ-TREE generates the Hessian file containing the gradients
and the Hessian/Hessian and all required files to run MCMCtree for dating.
* `step3`: Now, you can directly run MCMCtree from the IQ-TREE output of step 2
and infer the time tree. 

![Node dates in FigTree](images/mcmctree-dating.png)