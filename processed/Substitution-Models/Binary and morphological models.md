Substitution models
All common substitution models and usages.
IQ-TREE supports a wide range of substitution models, including advanced partition and mixture models. This guide gives a detailed information of all available models.

TIP: If you do not know which model to use, simply run IQ-TREE with the standard model selection (`-m TEST` option) or the new ModelFinder (`-m MFP`). It automatically determines best-fit model for your data.

### Binary and morphological models

The binary alignments should contain state `0` and `1`, whereas for morphological data, the valid states are `0` to `9` and `A` to `Z`.

| Model   | Explanation |
|---------|------------------------------------------------------------------------|
| JC2     | Jukes-Cantor type model for binary data.|
| GTR2    | General time reversible model for binary data.|
| MK      | Jukes-Cantor type model for morphological data.|
| ORDERED | Allowing exchange of neighboring states only.|

Except for `GTR2` that has unequal state frequencies, all other models have equal state frequencies.


>**TIP**: If morphological alignments do not contain constant sites (typically the case), then [an ascertainment bias correction model (`+ASC`)](#ascertainment-bias-correction) should be applied to correct the branch lengths for the absence of constant sites.
{: .tip}