Command reference
Commprehensive documentation of command-line options.
IQ-TREE is invoked from the command-line with e.g.:

    iqtree -s <alignment> [OPTIONS]

assuming that IQ-TREE can be run by simply entering `iqtree`. If not, please change `iqtree` to the actual path of the executable or read the [Quick start guide](Quickstart).

### Tree search for pathogen data

For pathogen data such as SARS-CoV-2 virus alignments, version 2.3.4.cmaple implements
the MAPLE algorithm ([De Maio et al., 2023]) that performs tree search very quickly by
exploiting the low divergent property of the sequences (i.e., sequences in the alignment
are very similar to each other).

| Option | Usage and meaning |
|----------|------------------------------------------------------------------------------|
| `--pathogen` | Apply CMAPLE tree search algorithm if sequence divergence is low, otherwise, apply IQ-TREE algorithm. |
| `--pathogen-force` | Apply CMAPLE tree search algorithm regardless of sequence divergence. |
| `--alrt <num_rep>`   | Specify the number of replicates to compute SH-like approximate likelihood ratio test (SH-aLRT) ([Guindon et al., 2010]). |
| `--sprta`           | Compute SPRTA ([De Maio et al., 2024]) branch supports. |
| `--sprta-zero-branch`| Compute SPRTA supports for zero-length branches.|
| `--sprta-other-places`   | Output alternative SPRs and their SPRTA supports.|
| `-T <num_thread>`   | Specify the number of threads used for computing branch supports (SH-aLRT or SPRTA). If `-T AUTO` is specified, all available cores will be used.|

Example usages:

* Infer a maximum-likelihood tree for an alignment, automatically switching to CMAPLE algorithm 
  if sequence divergence is low:

        iqtree2 -s data.phy --pathogen --prefix pathogen
        
It will print two output files:

* `pathogen.treefile`: The best approximate maximum-likelihood tree in NEWICK format.
* `pathogen.log`: The log file.


If you want to do other analyses on this tree and thus saving the tree search time, 
add `-te pathogen.treefile` to the command line of a subsequent IQ-TREE run to fix this tree topology
and remove `--pathogen` option to invoke the default IQ-TREE machinery.

* Infer a tree like above and additionally assign branch supports using SH-aLRT test 
  with 1000 replicates using 4 CPU cores:

        iqtree2 -s data.phy --pathogen --alrt 1000 -T 4 --prefix pathogen_sh_alrt

The output file `pathogen_sh_alrt.treefile` will contain SH-aLRT branch supports for all internal branches.

* Infer a tree like above and additionally assign SPRTA branch supports:

        iqtree2 -s data.phy --pathogen-force --sprta --prefix pathogen_sprta

The output file `pathogen_sprta.nex` will contain SPRTA branch supports for all (internal and external) branches.