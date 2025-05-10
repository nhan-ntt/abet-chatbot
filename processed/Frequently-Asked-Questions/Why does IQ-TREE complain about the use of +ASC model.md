Frequently asked questions
For common questions and answers.

### Why does IQ-TREE complain about the use of +ASC model?

When using ascertainment bias correction (ASC) model, sometimes you may get an error message:

`ERROR: Invaid use of +ASC because of ... invariant sites in the alignment`

or when performing model testing:

`Skipped since +ASC is not applicable`

This is because your alignment contains _invariant_ sites (columns), which violate the mathematical condition of the model. The invariant sites can be:

* Constant sites: containing a single character state over all sequences. For example, all sequences show an `A` (Adenine) at a particular site in a DNA alignment. 
* Partially constant sites: containing a single character, gap or unknown character. For example, at a particular site some sequences show a `G` (Guanine), some sequences have `-` (gap) and the other have `N`.
* Ambiguously constant sites: For example, some sequences show a `C` (Cytosine), some show a `Y` (meaning `C` or `T`) and some show a `-` (gap). 

All these sites must be removed from the alignment before a +ASC model can be applied.

>**TIP**: Starting with IQ-TREE version 1.5.0, an output alignment file with suffix `.varsites` is written in such cases, which contain only variable sites from the input alignment. The `.varsites` alignment can then be used with the +ASC model.
{: .tip}