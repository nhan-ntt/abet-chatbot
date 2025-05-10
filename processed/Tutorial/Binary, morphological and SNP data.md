Beginner's tutorial
This tutorial gives a beginner's guide. 

Please first [download](http://www.iqtree.org/#download) and [install](Quickstart) the binary
for your platform. For the next steps, the folder containing your  `iqtree` executable should be added to your PATH enviroment variable so that IQ-TREE can be invoked by simply entering `iqtree` at the command-line. Alternatively, you can also copy `iqtree` binary into your system search.
TIP: For quick overview of all supported options in IQ-TREE, run the command  `iqtree -h`.

### Binary, morphological and SNP data

Binary alignments contain sequences with characters 0 and 1, which can be in any common formats supported by IQ-TREE, for example, in PHYLIP format:

    4 6
    S1   010101
    S2   110011
    S3   0--100
    S4   10--10

Morphological alignments have an extended characeter alphabet of 0-9 and A-Z (for states 10-31). For example (PHYLIP format):

    4 10
    S1   0123401234
    S2   03---20432
    S3   3202-04--0
    S4   4230120340

IQ-TREE will automatically determine the sequence type and the alphabet size. To run IQ-TREE on such alignments:

    iqtree -s morphology.phy

or

    iqtree -s morphology.phy -st MORPH

IQ-TREE implements to two morphological ML models: [MK and ORDERED](Substitution-Models#binary-and-morphological-models). Morphological data typically do not have constant (uninformative) sites. 
In such cases, you should apply [ascertainment bias correction](Substitution-Models#ascertainment-bias-correction) model by e.g.:
 
    iqtree -s morphology.phy -st MORPH -m MK+ASC

You can again select the best-fit binary/morphological model:

    iqtree -s morphology.phy -st MORPH


For SNP data (DNA) that typically do not contain constant sites, you can explicitly tell the model to include
ascertainment bias correction:

    iqtree -s SNP_data.phy -m GTR+ASC

You can explicitly tell model testing to only include  `+ASC` model with:

    iqtree -s SNP_data.phy -m MFP+ASC