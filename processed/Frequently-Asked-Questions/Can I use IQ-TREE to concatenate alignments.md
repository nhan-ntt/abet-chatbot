Frequently asked questions
For common questions and answers.

### Can I use IQ-TREE to concatenate alignments?

Yes! If you put all of your alignments you want to concatenate into a single folder, you can do this:

```
iqtree2 -p FOLDER_NAME --out-aln OUTFILE_NAME
```

This will produce:
* OUTFILE_NAME: the concatenated alignment (default is phylip format)
* OUTFILE_NAME.nex: the partition file in nexus format
* OUTFILE_NAME.partitions: the partition file in RAxML format

Optionally, you can add `--out-format FASTA|NEXUS` option to specify concatenated alignment format, e.g.

```
iqtree2 -p FOLDER_NAME --out-aln OUTFILE_NAME --out-format NEXUS
```

would output the alignment in nexus format.