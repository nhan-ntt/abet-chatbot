Frequently asked questions
For common questions and answers.

### What is the purpose of composition test?

At the beginning of each run, IQ-TREE performs a composition chi-square test for every sequence in the alignment.  The purpose is to test for homogeneity of character composition (e.g., nucleotide for DNA, amino-acid for protein sequences). A sequence is denoted `failed` if its character composition significantly deviates from the average composition of the alignment.    

More specifically, for each sequence, compute: 

    chi2 = \sum_{i=1}^k (O_i - E_i)^2 / E_i

where k is the size of the alphabet (e.g. 4 for DNA, 20 for amino acids) and the values 1 to k correspond uniquely to one of the characters. 
O_i is the character frequency in the sequence tested. 
E_i is the overall character frequency from the entire alignment.

Whether the character composition deviates significantly from the overall composition is done by testing the chi2 value using the chi2-distribution with k-1 degrees of freedom (df=3 for DNA or df=19 for amino acids). By and large it is a normal Chi^2 test. 

This test should be regarded as an *explorative tool* which might help to nail down problems in a dataset. One would typically not remove failing sequences by default. But if the tree shows unexpected topology the test might point in direction of the origin of the problem. 

Furthermore, please keep in mind, this test is performed at the very beginning, where IQ-TREE does not know anything about the models yet. That means:

* If you have partitioned (multi-gene) data, it might be more reasonable to test this separately for each partition in a partition analysis. Here, one might want to be able to decide whether some partitions should better be discarded if it is hard to find a composition representing the sequences in the partition. Or on the other hand if a sequence fails for many partitions and show very unexpected phylogenetic topologies, try without it.
* If you have (phylogenomic) protein data, you can also try several [protein mixture models](Substitution-Models#protein-mixture-models), which account for different amino-acid compositions along the sequences, for example, the `C10` to `C60` profile mixture models.
* Finally, it is recommended to always check the alignment (something one should always do anyway), especially if they have been collected and produced automatically.