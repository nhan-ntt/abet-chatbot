Advanced tutorial
Recommended for experienced users to explore more features.
To get started, please read the [Beginner's Tutorial](Tutorial) first if not done so yet.

### Ultrafast bootstrapping with partition model

IQ-TREE can perform the ultrafast bootstrap with partition models by e.g.,

    iqtree -s example.phy -p example.nex -B 1000
    # for version 1.x change -p to -spp and -B to -bb

Here, IQ-TREE will resample the sites *within*  partitions (i.e., 
the bootstrap replicates are generated per partition separately and then concatenated together).
The same holds true if you do the standard nonparametric bootstrap. 

IQ-TREE supports the partition-resampling strategy as suggested by ([Nei et al., 2001]): 


    iqtree -s example.phy -p example.nex -B 1000 --sampling GENE
    # for version 1.x change -p to -spp and -B to -bb and --sampling to -bsam


to resample partitions instead of sites. Moreover, IQ-TREE allows an even more complicated
strategy: resampling partitions and then sites within resampled partitions  ([Gadagkar et al., 2005]; [Seo et al., 2005]). This may help to reduce false positives (i.e. wrong branch receiving 100% support):


    iqtree -s example.phy -p example.nex -B 1000 --sampling GENESITE
    # for version 1.x change -p to -spp and -B to -bb and --sampling to -bsam