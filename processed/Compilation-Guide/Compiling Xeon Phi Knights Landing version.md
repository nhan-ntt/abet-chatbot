Compilation guide
For advanced users to compile IQ-TREE source code.

### Compiling Xeon Phi Knights Landing version

Starting with version 1.6, IQ-TREE supports Xeon Phi Knights Landing (AVX-512 instruction set). To build this version the following requirements must be met:

* A C++ compiler, which supports AVX-512 instruction set: GCC 5.1, Clang 3.7, or Intel compiler 14.0.

The compilation steps are the same except that you need to add `-DIQTREE_FLAGS=KNL` to the cmake command:  

    cmake -DIQTREE_FLAGS=KNL ..
    make -j4

The compiled `iqtree` binary will automatically choose the proper computational kernel for the running computer. Thus, it works as normal and will speed up on Knights Landing CPUs. Run `./iqtree` to make sure that the binary was compiled correctly: 

    IQ-TREE multicore Xeon Phi KNL version 1.6.beta for Linux 64-bit built May  7 2017