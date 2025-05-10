Recipe
Perform a Goldman-Cox test

### Input files

For this recipe I'll use data from the Bovidae family with five taxa (Yak, Cow, Goat, Sheep and Antelope) and 5,000 sites. This is a (very) small subset of the amazing [Wu et al 2018](https://doi.org/10.1016/j.dib.2018.04.094) dataset. I keep the file to 5K sites because that helps keep the file sizes manageable and analyses fast for a demonstration.

> Note: for this version of the Goldman-Cox test, you can only use alignments with no gaps or ambiguities. So I have removed any sites with gaps or ambituities from the alignment.

* [bovidae_4K.phy](http://www.iqtree.org/doc/data/bovidae_4K.phy), our input alignment of 5 taxa and 5,000 sites.