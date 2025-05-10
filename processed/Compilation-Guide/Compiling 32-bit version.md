Compilation guide
For advanced users to compile IQ-TREE source code.

### Compiling 32-bit version

>**NOTE**: Typically a 64-bit IQ-TREE version is built and recommended! The 32-bit version has several restriction like maximal RAM usage of 2GB and no AVX support, thus not suitable to analyze large data sets.

To compile the 32-bit version instead, simply add `m32` into `IQTREE_FLAGS` of the cmake command:

    cmake -DIQTREE_FLAGS=m32 .. 
    
To build the 32-bit multicore version, run: 

    cmake -DIQTREE_FLAGS=omp-m32 ..

For Windows you need to change Clang target with:

    cmake -G "MinGW Makefiles" -DCMAKE_C_FLAGS=--target=i686-pc-windows-gnu -DCMAKE_CXX_FLAGS=--target=i686-pc-windows-gnu -DCMAKE_MAKE_PROGRAM=mingw32-make ..