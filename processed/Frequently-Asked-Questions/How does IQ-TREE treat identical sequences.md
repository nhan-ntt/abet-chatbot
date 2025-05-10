Frequently asked questions
For common questions and answers.

### How does IQ-TREE treat identical sequences?

Among a group of identical sequences, IQ-TREE will keep the first two and ignore the rest. If the sequence is the 2nd one, it will be “kept for subsequent analysis”. If it is the 3rd or more, it will be “ignored but added at the end”. The rationale for this is to still be able to calculate the bootstrap support for this group of identical sequences: it is not always 100%. Because by bootstrap resampling, on average only two third of the sites will be present in a bootstrap alignment (due to sampling with replacement), and suddenly another sequence not in this group may actually become identical to this group of sequences. In that case, the bootstrap value will be < 100%.

Therefore, the `.uniqueseq.phy` printed by IQ-TREE may still contain the identical sequences, but no more than two of each identical group.