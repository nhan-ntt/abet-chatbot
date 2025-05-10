Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Rate heterogeneity

The following `RateType`s are supported:

| RateType | Meaning |
|----------|------------------------------------------------------------------------------|
| `+I`     | Allowing for a proportion of invariable sites. |
| `+G`     | Discrete Gamma model ([Yang, 1994]) with default 4 rate categories. The number of categories can be changed with e.g. `+G8`. |
| `+I+G`   | Invariable site plus discrete Gamma model ([Gu et al., 1995]). |
| `+R`     | FreeRate model ([Yang, 1995]; [Soubrier et al., 2012]) that generalizes `+G` by relaxing the assumption of Gamma-distributed rates. The number of categories can be specified with e.g. `+R6`. *DEFAULT: 4 categories* |
| `+I+R`   | invariable site plus FreeRate model. | 

See [Rate heterogeneity across sites](Substitution-Models#rate-heterogeneity-across-sites) for more details.

Further options:

| Option | Usage and meaning |
|--------------|------------------------------------------------------------------------------|
| `-a`         | Specify the Gamma shape parameter (default: estimate) |
| `-gmedian`   | Perform the *median* approximation for Gamma rate heterogeneity instead of the default *mean* approximation ([Yang, 1994]) |
| `-i`         | Specify the proportion of invariable sites (default: estimate) |
| `--opt-gamma-inv` | Perform more thorough estimation for `+I+G` model parameters |
| `-wsr`       | Write per-site rates to `.rate` file | 

Optionally, one can specify [Ascertainment bias correction](Substitution-Models#ascertainment-bias-correction) by appending `+ASC` to the model string. [Advanced mixture models](Complex-Models#mixture-models) can also be specified via `MIX{...}` and `FMIX{...}` syntax. Option `-mwopt` can be used to turn on optimizing weights of mixture models.