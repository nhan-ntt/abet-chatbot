Beginner's tutorial
This tutorial gives a beginner's guide. 

Please first [download](http://www.iqtree.org/#download) and [install](Quickstart) the binary
for your platform. For the next steps, the folder containing your  `iqtree` executable should be added to your PATH enviroment variable so that IQ-TREE can be invoked by simply entering `iqtree` at the command-line. Alternatively, you can also copy `iqtree` binary into your system search.
TIP: For quick overview of all supported options in IQ-TREE, run the command  `iqtree -h`.

### Utilizing multi-core CPUs

IQ-TREE can utilize multiple CPU cores to speed up the analysis. A complement option `-T` (or `-nt` for version 1.x) allows specifying the number of CPU cores to use. For example:

    iqtree -s example.phy -m TIM2+I+G -T 2
    # for version 1.x change -T to -nt
    

Here, IQ-TREE will use 2 CPU cores to perform the analysis. 

Note that the parallel efficiency is only good for long alignments. A good practice is to use `-T AUTO` to determine the best number of cores:

    iqtree -s example.phy -m TIM2+I+G -T AUTO
    # for version 1.x change -T to -nt

Then while running IQ-TREE may print something like this on to the screen:

    Measuring multi-threading efficiency up to 8 CPU cores
    Threads: 1 / Time: 8.001 sec / Speedup: 1.000 / Efficiency: 100% / LogL: -22217
    Threads: 2 / Time: 4.346 sec / Speedup: 1.841 / Efficiency: 92% / LogL: -22217
    Threads: 3 / Time: 3.381 sec / Speedup: 2.367 / Efficiency: 79% / LogL: -22217
    Threads: 4 / Time: 4.385 sec / Speedup: 1.825 / Efficiency: 46% / LogL: -22217
    BEST NUMBER OF THREADS: 3

Therefore, I would only use 3 cores for this example data. For later analysis with your same data set, you can stick to the determined number.

Depending on the compute system it might be required to set an upper limit of CPU cores that can automatically be assigned. Use the `-ntmax` option to do so. For instance

    iqtree -s example.phy -m TIM2+I+G -T AUTO -ntmax 8
    # for version 1.x change -T to -nt

does the same as above, but only allows to use up to 8 CPU cores. By default all cores of the current machine would be used as maximum.