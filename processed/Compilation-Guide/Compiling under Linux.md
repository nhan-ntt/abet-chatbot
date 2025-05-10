Compilation guide
For advanced users to compile IQ-TREE source code.

### Compiling under Linux

>**TIP**: Ready made IQ-TREE packages are provided for [Debian](https://packages.debian.org/unstable/science/iqtree) and [Arch Linux (AUR)](https://aur.archlinux.org/packages/iqtree-latest/).
{: .tip}

1. Open a Terminal.
2. Change to the source code folder:

        cd PATH_TO_EXTRACTED_SOURCE_CODE

3. Create a subfolder, say, `build` and go into this subfolder:

        mkdir build
        cd build

4. Configure source code with CMake:

        cmake ..

    If `cmake` failed with message about `Eigen3 not found`, then install Eigen3 library and run `cmake` again. If this still failed, you have to manually specify the downloaded directory of Eigen3 with:
    
        cmake -DEIGEN3_INCLUDE_DIR=<eigen3_dir> ..
        

5. Compile source code with `make`:

        make -j
    
    `j` option tells it to use all CPU cores to speed up the compilation. Without this option, `make` uses only one core, which might be slow.
    
This creates an executable `iqtree2` (`iqtree` for version 1). It can be copied to your system search path so that IQ-TREE can be called from the Terminal simply with the command line `iqtree2`.

To compile IQ-TREE under Linux with ARM processor, use either GCC 10 (but not above), or Clang 14 or above.

>**TIP**: The above guide typically compiles IQ-TREE with `gcc`. If you have Clang installed and want to compile with Clang, the compilation will be similar to Mac OS X like below.
{: .tip}