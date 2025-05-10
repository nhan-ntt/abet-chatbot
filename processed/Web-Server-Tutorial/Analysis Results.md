Web server tutorial
A quick starting guide for the IQ-TREE Web Server.

This tutorial explains briefly how to use the IQ-TREE web server for fast online phylogenetic inference, accessible at <a target="_blank" href="http://iqtree.cibiv.univie.ac.at"> <b>iqtree.cibiv.univie.ac.at</b></a>.

There are three tabs: [Tree Inference](#tree-inference), [Model Selection](#model-selection) and [Analysis Results](#analysis-results).

### Analysis Results

In the tab Analysis Results you can monitor your jobs. With our example file, a run will only take a few seconds, depending on the server load. For your own alignments the CPU time limit is 24 hours. If you provided an email address when submitting the job, you will get an email once it is finished. 

![Analysis Results](images/tut3.png)

Once a job is finished, you can select it by checking the corresponding box and then **download the selected jobs** as a zip file. This zip file will contain the results of your run, including the **Run Log** and the **Full Result** which are also accessible in the webserver. 


| Suffix | Explanation |
|-------------|------------------------------------------------------------------------------|
| `.iqtree`   | Full result of the run, this is the main report file  |
| `.log`      | Run log |
| `.treefile` | Maximum likelihood tree in NEWICK format, can be visualized with treeviewer programs |
| `.svg`      |  Graphical tree representation in SVG format, done with ete view |
| `.pdf`      |  Graphical tree representation in PDF format, done with ete view |
| `.contree`  | Consensus tree with assigned branch supports where branch lengths are optimized on the original alignment; printed if Ultrafast Bootstrap is selected |
| `.ckp.gz`   | Checkpoint file; included if a job was stopped because of RAM/CPU limits |

>**NOTE**: Jobs which require more than 24 hours or 1GB RAM will be stopped. In such a case, you can download the stopped job and resume the run from the last checkpoint on your local PC as [described here](Command-Reference#checkpointing-to-resume-stopped-run). 

[Guindon et al., 2010]: https://doi.org/10.1093/sysbio/syq010
[Hoang et al., 2018]: https://doi.org/10.1093/molbev/msx281