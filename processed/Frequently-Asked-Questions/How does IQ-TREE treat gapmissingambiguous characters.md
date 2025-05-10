Frequently asked questions
For common questions and answers.

### How does IQ-TREE treat gap/missing/ambiguous characters?

Gaps (`-`) and missing characters (`?` or `N` for DNA alignments) are treated in the same way as `unknown` characters, which represent no information. The same treatment holds for many other ML software (e.g., RAxML, PhyML). More explicitly,
for a site (column) of an alignment containing `AC-AG-A` (i.e. A for sequence 1, C for sequence 2, `-` for sequence 3, and so on), the site-likelihood of a tree T is equal to the site-likelihood of the subtree of T restricted to those sequences containing non-gap characters (`ACAGA`).

Ambiguous characters that represent more than one character are also supported: each represented character will have equal likelihood. For DNA the following ambigous nucleotides are supported according to [IUPAC nomenclature](https://en.wikipedia.org/wiki/Nucleic_acid_notation):

| Nucleotide | Meaning |
|------------|---------------------------------------------------------------|
| R    | A or G (purine)  |
| Y    | C or T (pyrimidine) |
| W    | A or T (weak) |
| S    | G or C (strong) |
| M    | A or C (amino)|
| K    | G or T (keto)|
| B    | C, G or T (next letter after A) |
| H    | A, C or T (next letter after G) |
| D    | A, G or T (next letter after C) |
| V    | A, G or C (next letter after T) |
| ?, -, ., ~, !, O, N, X | A, G, C or T (unknown; all 4 nucleotides are equally likely) |

For protein sequences the following ambiguous amino-acids are supported:

| Amino-acid | Meaning |
|------------|---------------------------------------------------------------|
| B          | N or D |
| Z          | Q or E |
| J          | I or L |
| U          | unknown AA (although it is the 21st AA) |
| ?, -, ., ~, *, ! or X | unknown AA (all 20 AAs are equally likely) |

The letters `*` and `!` may found in alignments of protein and/or coding DNA sequences. 
Stop codon is typically translated to `*`. Some alignment programs also mark frameshift mutations (cf. [Ranwez et al., 2011]), that means since frameshift mutations in a codon alignment cause incomplete codons that cannot be unambiguously translated the resulting position in the translated protein sequence and padding positions in the respective codon are marked using `!`.