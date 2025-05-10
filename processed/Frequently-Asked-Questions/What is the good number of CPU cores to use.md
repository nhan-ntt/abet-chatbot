Frequently asked questions
For common questions and answers.

### What is the good number of CPU cores to use?

Starting with version 1.5.1, you can use option `-nt AUTO` to automatically determine the best number of threads for your current data and computer.

If you want to know more details: IQ-TREE can utilize multicore machines to speed up the analysis via `-nt` option. However, it does not mean that using more cores will always result in less running time: if your alignment is short, using too many cores may even slow down the analysis. This is because IQ-TREE parallelizes the likelihood computation along the alignment. Thus, the parallel efficiency is only increased with longer alignments. 

If you want to restrict the number of CPU cores allocated by `-nt AUTO` use `-ntmax` to specify the maximal number of CPU cores allowed (DEFAULT: #CPU cores on the current machine).