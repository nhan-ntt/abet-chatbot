Recipes
Estimating gene, site, and quartet concordance vectors

### Generate the concordance vectors for each branch

The final step of this tutorial is to get the full gene, site, and quartet concordance vectors. 

The information we need to calculate these is in two files: `gcf.cf.stat` and `scfl.cf.stat`. These are described above, and you can download them above or here: [stat_and_tree_files.zip](https://github.com/user-attachments/files/15949173/stat_and_tree_files.zip)

We'll use the R script you downloaded to organise these files into concordance vectors:

```bash
Rscript concordance_vector.R
```

This will produce a file called `concordance_vectors.csv` (you can download a copy here: [concordance_vectors.csv](https://github.com/user-attachments/files/15949742/concordance_vectors.csv)), which has gene, site, and quartet concordance vectors, along with branch lengths in units of substitutions per site and coalescent units, and branch IDs which correspond to the `gcf.cf.branch` tree file.

The first five rows of your csv file should look something like this:

| ID  | gene_psi1 | gene_psi2 | gene_psi3 | gene_psi4 | gene_psi1_N | gene_psi2_N | gene_psi3_N | gene_psi4_N | gene_N | site_psi1 | site_psi2 | site_psi3 | site_psi4 | site_psi1_N | site_psi2_N | site_psi3_N | site_psi4_N | site_N  | quartet_psi1 | quartet_psi2 | quartet_psi3 | quartet_psi1_N | quartet_psi2_N | quartet_psi3_N | quartet_N | quartet_psi1_pp | quartet_psi2_pp | quartet_psi3_pp | length_subs_per_site | length_coalescent |
|-----|-----------|-----------|-----------|-----------|-------------|-------------|-------------|-------------|--------|-----------|-----------|-----------|-----------|-------------|-------------|-------------|-------------|---------|--------------|--------------|--------------|----------------|----------------|----------------|------------|------------------|------------------|------------------|---------------------|-------------------|
| 364 | 83        | 8.5       | 7.37      | 1.13      | 293         | 30          | 26          | 4           | 353    | 51.51     | 24.77     | 23.72     | 0         | 1867.35     | 898         | 859.86      | 0           | 3625.21 | 0.84         | 0.09         | 0.07         | 296.48         | 30.25          | 26.27          | 353        | 1                | 0                | 0                | 0.0137341            | 0.0531013         |
| 365 | 99.46     | 0         | 0         | 0.54      | 370         | 0           | 0           | 2           | 372    | 42.53     | 33.62     | 23.85     | 0         | 445.8       | 352.46      | 250         | 0           | 1048.26 | 1            | 0            | 0            | 371.99         | 0.01           | 0              | 372        | 1                | 0                | 0                | 0.0376558            | 0.201927          |
| 366 | 79.03     | 10.22     | 6.99      | 3.76      | 294         | 38          | 26          | 14          | 372    | 18.07     | 67.17     | 14.77     | 0         | 103.48      | 384.96      | 84.53       | 0           | 572.97  | 0.81         | 0.11         | 0.08         | 300.86         | 41.51          | 29.63          | 372        | 1                | 0                | 0                | 0.0100011            | 0.0460157         |
| 367 | 97.59     | 0.27      | 0         | 2.14      | 364         | 1           | 0           | 8           | 373    | 37.86     | 42.92     | 19.22     | 0         | 280.21      | 317.69      | 142.28      | 0           | 740.18  | 0.99         | 0.01         | 0.01         | 368.14         | 2.74           | 2.11           | 373        | 1                | 0                | 0                | 0.0230637            | 0.138847          |
| 368 | 83.87     | 1.88      | 1.34      | 12.9      | 312         | 7           | 5           | 48          | 372    | 30.61     | 43.46     | 25.94     | 0         | 227.76      | 323.6       | 193.02      | 0           | 744.38  | 0.89         | 0.06         | 0.05         | 332.72         | 21.04          | 18.23          | 372        | 1                | 0                | 0                | 0.0116769            | 0.0672212         |


This table has a lot of columns. For easy reference, here's a description of every column:

| Column                 | Description | Calculated from                                                                       |
|------------------------|-------------|---------------------------------------------------------------------------------------|
| ID                     | Branch ID   								  						| `ID` `gcf.cf.branch` file                                                     		|
| gene_psi1              | &#936;<sub>1</sub> for genes (%) 		  						| `gCF` from `gcf.cf.stat`       														|
| gene_psi2              | &#936;<sub>2</sub> for genes (%)           						| Larger `gDF1` and `gDF2` from `gcf.cf.stat`                                		|
| gene_psi3              | &#936;<sub>3</sub> for genes (%)           						| Smaller `gDF1` and `gDF2` from `gcf.cf.stat`                               			|
| gene_psi4              | &#936;<sub>4</sub> for genes (%)           						| `gDFP` from `gcf.cf.stat`                                             				|
| gene_psi1_N            | &#936;<sub>1</sub> for genes (count)       						| `gCF_N` from `gcf.cf.stat`       										                |
| gene_psi2_N            | &#936;<sub>2</sub> for genes (count)       						| Larger `gDF1_N` and `gDF2_N` from `gcf.cf.stat`						                |
| gene_psi3_N            | &#936;<sub>3</sub> for genes (count)       						| Smaller `gDF1_N` and `gDF2_N` from `gcf.cf.stat`						                |
| gene_psi4_N            | &#936;<sub>4</sub> for genes (count)       						| `gDFP_N` from `gcf.cf.stat`                     						                |
| gene_N                 | Number of decisive gene trees              						| `gN` from `gcf.cf.stat`                                             |
| site_psi1              | &#936;<sub>1</sub> for sites (%) 		  						| `sCF` from `scfl.cf.stat`       														|
| site_psi2              | &#936;<sub>2</sub> for sites (%)           						| Larger `sDF1` and `sDF2` from `scfl.cf.stat`                                		|
| site_psi3              | &#936;<sub>3</sub> for sites (%)           						| Smaller `sDF1` and `sDF2` from `scfl.cf.stat`                               			|
| site_psi4              | &#936;<sub>4</sub> for sites (%)           						| Always zero by assumption                                              				|
| site_psi1_N            | &#936;<sub>1</sub> for sites (count)       						| `sCF_N` from `scfl.cf.stat`       										                |
| site_psi2_N            | &#936;<sub>2</sub> for sites (count)       						| Larger `sDF1_N` and `sDF2_N` from `scfl.cf.stat`						                |
| site_psi3_N            | &#936;<sub>3</sub> for sites (count)       						| Smaller `sDF1_N` and `sDF2_N` from `scfl.cf.stat`						                |
| site_psi4_N            | &#936;<sub>4</sub> for sites (count)       						| Always zero by assumption                     						                |
| site_N                 | Number of decisive sites 	              						| `sN` from `scfl.cf.stat`                                             |
| quartet_psi1           | &#936;<sub>1</sub> for quartets (%) 		     					| `q1` from `scfl.cf.stat` 'Label' column (calculated in ASTRAL)       														|
| quartet_psi2           | &#936;<sub>2</sub> for quartets (%)           					| Larger `q2` and `q3` from `scfl.cf.stat` 'Label' column (calculated in ASTRAL)                               		|
| quartet_psi3           | &#936;<sub>3</sub> for quartets (%)           					| Smaller `q2` and `q3` from `scfl.cf.stat` 'Label' column (calculated in ASTRAL)                              			|
| quartet_psi4           | &#936;<sub>4</sub> for quartets (%)           					| Always zero by assumption                                              				|
| quartet_psi1_N         | &#936;<sub>1</sub> for quartets (count)       					| `f1` from `scfl.cf.stat` 'Label' column (calculated in ASTRAL)       										                |
| quartet_psi2_N         | &#936;<sub>2</sub> for quartets (count)       					| Larger `f2` and `f3` from `scfl.cf.stat` 'Label' column (calculated in ASTRAL)						                |
| quartet_psi3_N         | &#936;<sub>3</sub> for quartets (count)       					| Smaller `f2` and `f3` from `scfl.cf.stat` 'Label' column (calculated in ASTRAL)						                |
| quartet_psi4_N         | &#936;<sub>4</sub> for quartets (count)       					| Always zero by assumption                     						                |
| quartet_N              | Effective number of gene trees                					| `EN` from `scfl.cf.stat` 'Label' column (calculated in ASTRAL)                                              |
| quartet_psi1_pp        | ASTRAL posterior probability for &#936;<sub>1</sub>              | `pp1` from `scfl.cf.stat` 'Label' column (calculated in ASTRAL)                                                   |
| quartet_psi2_pp        | ASTRAL posterior probability for &#936;<sub>2</sub>              | Larger `pp2` and `pp3` from `scfl.cf.stat` 'Label' column (calculated in ASTRAL)                     |
| quartet_psi3_pp        | ASTRAL posterior probability for &#936;<sub>3</sub>              | Smaller `pp2` and `pp3` from `scfl.cf.stat` 'Label' column (calculated in ASTRAL)                    |
| length_subs_per_site   | branch length in substitutions per site             				| Calculated in IQ-TREE using a concatenated analysis                                                     |
| length_coalescent      | branch length in coalescent units            					| Calcualted in ASTRAL from the quartet concordance vector                                                             |