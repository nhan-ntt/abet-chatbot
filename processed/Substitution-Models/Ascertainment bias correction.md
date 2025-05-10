Substitution models
All common substitution models and usages.
IQ-TREE supports a wide range of substitution models, including advanced partition and mixture models. This guide gives a detailed information of all available models.

TIP: If you do not know which model to use, simply run IQ-TREE with the standard model selection (`-m TEST` option) or the new ModelFinder (`-m MFP`). It automatically determines best-fit model for your data.

### Ascertainment bias correction

An ascertainment bias correction (`+ASC`) model ([Lewis, 2001]) should be applied if the alignment does not contain constant sites (such as morphological or SNPs data). For example:

* `MK+ASC`: For morphological data.
* `GTR+ASC`: For SNPs data.

`+ASC` will correct the likelihood conditioned on variable sites. Without `+ASC`, the branch lengths might be overestimated.