Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Site-specific frequency model options

The site-specific frequency model is used to substantially reduce the time and memory requirement compared with full profile mixture models `C10` to `C60`. For full details see [site-specific frequency model](Complex-Models#site-specific-frequency-models). To use this model you have to specify a profile mixture model with e.g. `-m LG+C20+F+G` together with a guide tree or a site frequency file: 

| Option | Usage and meaning |
|---------|------------------------------------------------------------------------------|
| `-ft`   | Specify a guide tree (in Newick format) to infer site frequency profiles. |
| `-fs`   | Specify a site frequency file, e.g. the `.sitefreq` file obtained from `-ft` run. This will save memory used for the first phase of the analysis. | 
| `-fmax` | Switch to posterior maximum mode for obtaining site-specific profiles. Default: posterior mean. |

With `-fs` option you can input a file containing your own site frequency profiles. The format of this file is that each line contains the site ID (starting from 1) and the state frequencies (20 for amino-acid) separated by white space. So it has as many lines as the number of sites in the alignment. The order of amino-acids is:


     A   R   N   D   C   Q   E   G   H   I   L   K   M   F   P   S   T   W   Y   V