Web server tutorial
A quick starting guide for the IQ-TREE Web Server.

This tutorial explains briefly how to use the IQ-TREE web server for fast online phylogenetic inference, accessible at <a target="_blank" href="http://iqtree.cibiv.univie.ac.at"> <b>iqtree.cibiv.univie.ac.at</b></a>.

There are three tabs: [Tree Inference](#tree-inference), [Model Selection](#model-selection) and [Analysis Results](#analysis-results).

### Tree Inference

Tree Inference provides the most frequently used features of IQ-TREE and allows users to carry out phylogenetic analysis on a multiple sequence alignment (MSA). In the most basic case, no more than an MSA file is required to submit the job. Without further input, IQ-TREE will run with the default parameters and auto-detect the sequence type as well as the best-fitting substitution model. Additionally, Ultrafast Bootstrap ([Hoang et al., 2018]) and the SH-aLRT branch test ([Guindon et al., 2010]) will be performed. 

You can either try out the web server with an example alignment by ticking the corresponding box or upload your own alignment file. By clicking on 'Browse' a dialog will open where you can select your MSA; the file formats Phylip, Fasta, Nexus, Clustal and MSF are supported. 

![Tree Inference Tab](images/tut1.png)

After that you can submit the job. If you provide an email address, a notification will be sent to you once the job is finished. In case you don't specify an email address, you will receive a link in the next step; you can bookmark this link to retrieve your results after the job is finished.