Compilation guide
For advanced users to compile IQ-TREE source code.

### Compiling under Windows

* Please first install TDM-GCC (a GCC version for Windows) from <http://tdm-gcc.tdragon.net>.

* Then install Clang for Windows from <http://clang.llvm.org>.

>**WARNING**: Although IQ-TREE can also be built with TDM-GCC, the executable does not run properly due to stack alignment issue and the `libgomp` library causes downgraded performance for the OpenMP version. Thus, it is recommended to compile IQ-TREE with Clang. 

1. Open Command Prompt. 
2. Change to the source code folder:

        cd PATH_TO_EXTRACTED_SOURCE_CODE

    Please note that Windows uses back-slash (`\`) instead of slash (`/`) as path name separator.

3. Create a subfolder, say, `build` and go into this subfolder:

        mkdir build
        cd build

4. Configure source code with CMake:

        cmake -G "MinGW Makefiles" -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ -DCMAKE_C_FLAGS=--target=x86_64-pc-windows-gnu -DCMAKE_CXX_FLAGS=--target=x86_64-pc-windows-gnu -DCMAKE_MAKE_PROGRAM=mingw32-make ..

    To build the multicore version please add `-DIQTREE_FLAGS=omp` to the cmake command. Note that the make program shipped with TDM-GCC is called `mingw32-make`, thus needed to specify like above. You can also copy `mingw32-make` to `make` to simplify this step.

5. Compile source code with:

        mingw32-make
        
    or
    
        mingw32-make -j4
        
    to use 4 cores for compilation instead of only 1.