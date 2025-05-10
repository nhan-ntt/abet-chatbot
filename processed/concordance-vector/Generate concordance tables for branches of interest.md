Recipes
Estimating gene, site, and quartet concordance vectors

### Generate concordance tables for branches of interest

A concordance table is just a table of the three concordance vectors, as shown in the Lanfear and Hahn paper. The `concordance_table.R` script lets you generate a concordance table for any branch, based on the branch ID. Here we'll do that for two branches that were recovered in the original Nature paper, discussed in Lanfear and Hahn, and also recovered in the ASTRAL tree we estimated here from 400 loci (I found the branch IDs for these branches by studying the tree labelled with branch IDs that I made above):

* **Branch 598**: the Palaeognathae (kiwis and other cool birds)
* **Branch 545**: the Telluraves (passerines and other closely related groups)

The `concordance_table.R` script takes two input variables:

* the `concordance_vectors.csv` file we generated above
* the branch ID

So to get the tables for our two branches, we run it once for each as follows:

```
Rscript concordance_table.R concordance_vectors.csv 598
Rscript concordance_table.R concordance_vectors.csv 545
```

The output includes 2 files for each run:

* a PDF of the table, e.g. `concordance_table_598.pdf`
* a CSV file of the table, e.g. `concordance_table_598.csv`

The CSV looks like this (using Telluraves as an example):

| type | psi | value | lower_CI | upper_CI |
|------|-----|-------|----------|----------|
| gene | 1   | 5.60  | 3.562341 | 7.888041 |
| gene | 2   | 0.25  | 0.000000 | 0.769720 |
| gene | 3   | 0.00  | 0.000000 | 0.000000 |
| gene | 4   | 94.15 | 91.857506 | 96.183206 |
| site | 1   | 45.63 | 42.518891 | 48.434787 |
| site | 2   | 18.70 | 16.490210 | 20.934787 |
| site | 3   | 16.00 | 13.710630 | 18.320910 |
| site | 4   | 19.67 | 17.383025 | 21.849787 |
| site | 5   | 0.00  | 0.000000 | 0.000000 |
| site | 6   | 0.00  | 0.000000 | 0.000000 |
| site | 7   | 0.00  | 0.000000 | 0.000000 |
| site | 8   | 0.00  | 0.000000 | 0.000000 |
| site | 9   | 0.00  | 0.000000 | 0.000000 |
| site | 10  | 0.00  | 0.000000 | 0.000000 |

And the PDF looks like this:

![concordance_table_545_telluraves](https://github.com/iqtree/iqtree2/assets/895251/ec7c1b35-0441-4e18-85cc-8a543fda4155)

Clearly there is substantial discordance around this branch! Compare this to the palaeognathae, which have far less discordance:

![concordance_table_598_palaeognathae](https://github.com/iqtree/iqtree2/assets/895251/5cf10aae-6c7c-4850-bdbb-90c5c0219c46)

These tables allow you to quickly dig into the concordance vectors on any given branch in your tree. 

Confidence intervals on the concordance vectors

You'll notice that the tables include 95% confidence intervals for the concordance and discordance factors. These are calculated using 1000 bootstraps of the count data, and provide useful context for interpreting the values, and particularly for interpreting potential *differences* in the values.

These bootstrap confidence intervals are calculated by resampling from the counts for each concordance vector. The total sample size for each category (genes, sites, and quartets) is shown on the table underneath the y axis label. Note that for sites and quartets, the counts are not always whole numbers because of how they are calculated. This can also mean that the bootstrap confidence intervals can be a little off for very low counts, because the numbers have to be rounded to integers in order to calculate them.