Advanced tutorial
Recommended for experienced users to explore more features.
To get started, please read the [Beginner's Tutorial](Tutorial) first if not done so yet.

### Inferring site-specific rates

IQ-TREE allows to infer site-specific evolutionary rates if a [site-rate heterogeneity model such as Gamma or FreeRate](Substitution-Models#rate-heterogeneity-across-sites) is the best model. Here, IQ-TREE will estimate model parameters and then apply an empirical Bayesian approach to assign site-rates as the mean over rate categories, weighted by the posterior probability of the site falling into each category. This approach is provided in IQ-TREE because such empirical Bayesian approach was shown to be most accurate ([Mayrose et al., 2004]). An example run:

    iqtree -s example.phy --rate
    # for version 1.x change --rate to -wsr
    
IQ-TREE will write an output file `example.phy.rate` that looks like:

    Site    Rate    Category        Categorized_rate
    1       0.26625 2       0.24393
    2       0.99345 3       0.81124
    3       2.69275 4       2.91367
    4       0.25822 2       0.24393
    5       0.25822 2       0.24393
    6       0.42589 2       0.24393
    7       0.30194 2       0.24393
    8       0.72790 3       0.81124
    9       0.25822 2       0.24393
    10      0.09177 1       0.03116

The 1st column is site index of the alignment (starting from 1), the 2nd column `Rate` shows the mean site-specific rate as explained above, and the 3rd and 4th columns show the category index and rate of the Gamma rate category with the highest probability for this site (1 for slow and 4 for fast rate).

The above run will perform a full tree search. To speed up you can use `-n 0` to only use a parsimony tree for site rate estimates. Or if you have already infered an ML tree, you can specify it to improve the rate estimate:


    iqtree -s example.phy -t ml.treefile -n 0 --rate 
    # for version 1.x change --rate to -wsr

where `-t` is the option to input a fixed tree topology and `ml.treefile` is the ML tree reconstructed previously. 

If you already know the best-fit model for the alignment, you can use specify it via `-m` option to omit model selection and hence speed it up:

    iqtree -s example.phy -m GTR+R10 -n 0 --rate 
    # for version 1.x change --rate to -wsr

Finally, IQ-TREE 2 allows to estimate rates by maximum likelihood via `--mlrate` option:

    iqtree -s example.phy -n 0 --mlrate 

This will print an output file `example.phy.mlrate` that looks like:

	# Site-specific subtitution rates determined by maximum likelihood
	# This file can be read in MS Excel or in R with command:
	#   tab=read.table('example.phy.mlrate',header=TRUE)
	# Columns are tab-separated with following meaning:
	#   Site:   Alignment site ID
	#   Rate:   Site rate estimated by maximum likelihood
	Site    Rate
	1       2.51550
	2       12.89129
	3       34.31350
	4       2.44313
	5       2.44313
	6       4.41889
	7       2.69577
	8       9.27503
	9       2.44313
	10      0.00001