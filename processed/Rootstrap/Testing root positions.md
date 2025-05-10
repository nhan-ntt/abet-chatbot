

### Testing root positions

The rootstrap introduced above is one way to measure our confidence in the root placement, but it is not a 
statistical test. Alternatively, we can apply the [tree topology tests](Advanced-Tutorial#tree-topology-tests) to compare the log-likelihoods of the trees being rooted
on every branch of the ML tree. IQ-TREE v2.1.3 provides a convenient option `--root-test`
that will re-root the tree on every branch and perform the test for you. So you can run:

	iqtree2 -s bovidae.phy -p rev_aa.best_scheme.nex --model-joint NONREV -st NT2AA --root-test -zb 1000 -au -te nonrev_aa.treefile --prefix nonrev_aa_test

`-zb 1000 -au` is to perform several tree topology tests including the approximately-unbiased (AU) test for the tree found above (`-te nonrev_aa.treefile`). This run will
write a file `nonrev_aa_test.roottest.csv` which might look like:

	# Test results for rooting positions on every branch
	# This file can be read in MS Excel or in R with command:
	#    dat=read.csv('nonrev_aa_test.roottest.csv',comment.char='#')
	# Columns are comma-separated with following meanings:
	#    ID:      Branch ID
	#    logL:    Log-likelihood of the tree rooted at this branch
	#    deltaL:  logL difference from the maximal logl
	#    bp-RELL: bootstrap proportion using RELL method (Kishino et al. 1990)
	#    p-KH:    p-value of one sided Kishino-Hasegawa test (1989)
	#    p-SH:    p-value of Shimodaira-Hasegawa test (2000)
	#    c-ELW:   Expected Likelihood Weight (Strimmer & Rambaut 2002)
	#    p-AU:    p-value of approximately unbiased (AU) test (Shimodaira, 2002)
	ID,logL,deltaL,bp-RELL,p-KH,p-SH,c-ELW,p-AU
	1,-90388.66044,0,0.983,0.96,1,0.9695602131,0.9975595105
	8,-90401.6833,13.02286164,0.005,0.04,0.19,0.01262108065,0.00558089101
	5,-90401.68371,13.0232665,0.01,0.04,0.19,0.01262245766,0.006374455939
	3,-90410.10499,21.44455589,0.002,0.016,0.104,0.002397842346,0.001014359781
	2,-90410.1084,21.44796542,0,0.016,0.104,0.002389013519,0.0008999725939
	6,-90413.04441,24.38397245,0,0.005,0.059,0.0002047272296,0.0004975092439
	7,-90413.04797,24.38753181,0,0.005,0.059,0.0002046654974,0.0005061888325

The branches are sorted by log-likelihoods in descending order. The last column (p-AU)
shows the p-values of the AU test. The branch ID 1 has an AU p-value of 0.9975595105,
whereas all other branches has p-values < 0.01. To associate branch ID you can return to the FigTree window for `nonrev_aa.rootstrap.nex` file and select "Display" to "id" in the "Branch Labels" tab. 

The conclusion from this analysis: we can reject all rooting positions on branches
other than branch ID 1, which agrees with the rootstrap measure.


TIP: These options `--root-test -zb 1000 -au` can be combined with the rootstrap run 
in the previous section to calculate the rootstrap support values and the rooting test p-values in one single analysis.


[Naser-Khdour et al., 2021]: https://doi.org/10.1101/2020.07.31.230144
[Wu et al., 2018]: https://doi.org/10.1016/j.dib.2018.04.094