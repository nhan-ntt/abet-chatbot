Recipes
Estimating gene, site, and quartet concordance vectors

### What you need

Software

First you need the following software:

* The latest stable version of IQ-TREE2 for your system: http://www.iqtree.org/
* ASTRAL-III: https://github.com/smirarab/ASTRAL/releases/latest
* R, and the `tidyverse` and `boot` packages
* A few R scripts to process lots of output files and produce concordance vectors, tree files, and tables from: [https://github.com/roblanf/concordance_vectors](https://github.com/roblanf/concordance_vectors)

I use conda to install all of these, and suggest you do too. If you want to do that, here's one way to do it:

```bash
# set up a fresh environment and activate it
conda create --name concordance
conda activate concordance

# install what we need for this recipe
conda install -c bioconda iqtree astral-tree
conda install -c conda-forge r-base r-tidyverse r-boot r-ape r-ggtext

# get the R script
wget https://raw.githubusercontent.com/roblanf/concordance_vectors/main/concordance_vector.R
wget https://raw.githubusercontent.com/roblanf/concordance_vectors/main/concordance_table.R
wget https://raw.githubusercontent.com/roblanf/concordance_vectors/main/change_labels.R

```

After installation, double check that you have the latest versions of both pieces of software. You will need IQ-TREE version 2.3 or above for this. 

> Note that the R script is itself on GitHub here: [https://github.com/roblanf/concordance_vectors/blob/main/concordance_vector.R](https://github.com/roblanf/concordance_vectors/blob/main/concordance_vector.R)

Data

Next you need the data. The data for this recipe is 400 randomly selected alignments of intergenic regions from the paper ["Complexity of avian evolution revealed by family-level genomes" by Stiller et al. in 2024](https://doi.org/10.1038/s41586-024-07323-1). Each locus has up to  363 species represented from across the diversity of birds, and to the best of the author's ability to carefully sequence and filter the data, each locus is also a single-copy orthologue. This means that we can go ahead and use these alignments to estimate gene trees, species trees, and concordance vectors. 

You can download these 400 alignments from here: [bird_400.tar.gz](https://github.com/user-attachments/files/15894364/bird_400.tar.gz). You will need to decompress this data using the following command

```bash
tar -xzf bird_400.tar.gz
```

For the sake of reproducibility, you can also create your own set of 400 randomly selected loci from the intergenic regions sequenced for this paper using the following commands:

```bash
# Get the data from the paper's supplementary data repository
wget https://erda.ku.dk/archives/341f72708302f1d0c461ad616e783b86/B10K/data_upload/01_alignments_and_gene_trees/intergenic_regions/63430.alns.tar.gz

# decompress it
tar -xvzf 63430.alns.tar.gz

# select 400 random loci, then compress them
mkdir -p bird_400
find 63k_alns/ -type f ! -name '.*' | shuf -n 400 | xargs -I {} mv {} bird_400/ # avoid files that start with '.'
tar -czf bird_400.tar.gz -C bird_400 .
```

The last set of commands will produce a file just like the one you can download above, with 400 randomly selected loci. Note that you should expect to get a slightly different species tree and concordance factors, because there's a *lot* of discordance along the backbone of the species tree of birds, so different groups of 400 loci are highly likely to give different species trees.