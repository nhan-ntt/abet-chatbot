Recipes
Estimating gene, site, and quartet concordance vectors

### Estimating the gene trees

To estimate the gene trees, we'll use IQ-TREE2. Just set `-T` to the highest number of threads you have available. This step might take some time (about 3.5 hours with my 128 threads). If you prefer to skip it then you can download the key output files from this analysis here: 
[loci.zip](https://github.com/user-attachments/files/15907618/loci.zip)

```bash
iqtree2 -S bird_400 --prefix loci -T 128
```

This analysis will produce output files with lots of information, these include (all in the zip file `loci.zip` linked above):

* `loci.best_model.nex`: the substitution models in nexus format - these have every parameter value for every estimated model, e.g. for one locus, the GTR+F+R5 model has the following entry:
`GTR{1.07109,5.24905,0.776093,1.28398,3.93731}+F{0.212586,0.260909,0.256934,0.269571}+R5{0.0670095,0.202443,0.44871,0.605428,0.379555,1.13675,0.0791399,2.21831,0.0255857,4.21162}: chr10_1260000_1270000.1k.start299.fasta{17.1377}`
* `loci.iqtree`: a summary file of the entire analysis with tons of useful information neatly summarised
* `loci.log`: the full log file from the run (i.e. everything that was printed to the screen during the run)
* `loci.treefile`: the Maximum Likelihood single-locus trees estimated using the best-fit models (these trees are what we really want)