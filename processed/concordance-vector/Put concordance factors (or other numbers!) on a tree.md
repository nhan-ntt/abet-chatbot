Recipes
Estimating gene, site, and quartet concordance vectors

### Put concordance factors (or other numbers!) on a tree

A common aim is to annotate your tree with the statistics you are interested in. The output tree above has rather unwieldy labels on each branch like this:

`'[q1=0.570241231975882;q2=0.17602481596980715;q3=0.25373395205431093;f1=207.567808439221;f2=64.0730330130098;f3=92.3591585477691 7;pp1=1.0;pp2=1.575119358351017E-20;pp3=2.952157354351003E-20;QC=8496;EN=364.0]'/25.4/47.0:0.0055956557`

But we can use the tree with branch IDs to put any label on a tree. An example is in the `change_labels.R` script. As written, this script just updates the branch ID labels in the `gcf.cf.branch` tree to show the ID and the three concordance factors (the &#936;<sub>1</sub> values), each labelled with the first letter of the input data (i.e. `g` for genes, `s` for sites, and `q` for quartets). You can run this script like so:

```
Rscript change_labels.R
```

This will output a nexus-formatted tree file called `id_gcf_scf_qcf.nex`. Each branch on this tree is labelled as follows:

`391-g98.54-s84.09-q98.54`

The first number is the branch ID, and the next three are the three concordance factors. This can be useful for exploring your data. For example, if you look at the part of the species tree we inferred in this recipe that groups the kiwis (genus *Apteryx*), you can see that there is a lot of concordance in this part of the tree:

![kiwis](https://github.com/iqtree/iqtree2/assets/895251/e3ab2493-4105-4099-b822-5ddc4b5583aa)

The concordance factors tell you a certain amount, but to understand things better, you really need to examine the concordance vectors. 

> If you want to put different labels on your tree, that is relatively simple to do by editing the `change_labels.R` script, which you can get from GitHub here: [https://github.com/roblanf/concordance_vectors/blob/main/change_labels.R](https://github.com/roblanf/concordance_vectors/blob/main/change_labels.R)