Developer guide
This guide gives developers an overview of IQ-TREE software design, data structures and discusses possibility to incorporate new models into IQ-TREE.

>**NOTICE**: This guide is still under preparation, thus the contents may change frequently.

To achieve both high performance and flexibility, IQ-TREE software has been entirely written in object oriented C++. Thus, it faciliates extending with new sequence data types or new models. IQ-TREE code consists of C++ *classes*, most of which inherits from three basal classes: `Alignment`, `ModelSubst` and `PhyloTree` to handle sequence alignments, models of substitution and phylogenetic trees, respectively. In the following we introduce these basal classes.

>**TIP**: IQ-TREE extensively uses *Standard Template Library (STL)* in C++. Thus, be first familiar with STL and fundamental STL data structures like `string`, `vector`, `set` and `map`.
{: .tip}

### Alignment class

The `Alignment` class stores the data as a `vector` of `Pattern`. Each `Pattern` is in turn a `string` representing the characters across the sequences at an alignment site, with a `frequency` of occurrences in the `Alignment` (from header file [`pattern.h`](https://github.com/Cibiv/IQ-TREE/blob/master/pattern.h)):

~~~cpp
/**
	Site-patterns in a multiple sequence alignment
*/
class Pattern : public string {
public:
	...

	/**
		frequency appearance of the pattern
	*/
	int frequency;
};
~~~

The rationale for storing the data this way (instead of storing a set of sequences) is that most computations are carried out along the site-patterns of the `Alignment`. Thus, it makes all operations more convenient and faster.

As noted above, the `Alignment` class is defined as (from header file [alignment.h](https://github.com/Cibiv/IQ-TREE/blob/master/alignment.h)): 

~~~cpp
/**
    Multiple Sequence Alignment. Stored by a vector of site-patterns
*/
class Alignment : public vector<Pattern> {
public:
    /**
            constructor
            @param filename file name
            @param sequence_type type of the sequence, either "BIN", "DNA", "AA", or NULL
            @param intype (OUT) input format of the file
     */
    Alignment(char *filename, char *sequence_type, InputType &intype);

    ...
};
~~~

>**NOTE**: Please follow the commenting style of the code when declaring new components (classes, functions or variables) like the example above. That way, the source code documentation can be generated with tools like [Doxygen](http://doxygen.org/). See [Doxygen commenting manual](http://www.stack.nl/~dimitri/doxygen/manual/docblocks.html) for more details.