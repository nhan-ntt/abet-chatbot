Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Nonparametric bootstrap

The slow standard nonparametric bootstrap ([Felsenstein, 1985]) can be run with:

| Option | Usage and meaning |
|--------|------------------------------------------------------------------------------|
| `-b`   | Specify number of bootstrap replicates (recommended >=100). This will perform both bootstrap and analysis on original alignment and provide a consensus tree. |
| `-bc`  | Like `-b` but omit analysis on original alignment. |
| `-bo`  | Like `-b` but only perform bootstrap analysis (no analysis on original alignment and no consensus tree). |