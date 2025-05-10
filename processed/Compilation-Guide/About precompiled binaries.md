Compilation guide
For advanced users to compile IQ-TREE source code.

### About precompiled binaries

To provide the pre-compiled IQ-TREE binaries at <http://www.iqtree.org>, we used Clang 3.9.0 for Windows and Clang 4.0 for Linux and macOS. We recommend to use Clang instead of GCC as Clang-compiled binaries run about 5-10% faster than GCC-compiled ones.

Linux binaries were statically compiled with Ubuntu 16.4 using [libc++ library](https://libcxx.llvm.org). The static-linked binaries will thus run on most Linux distributions. The CMake command is (assuming that clang-4 and clang++-4 point to the installed Clang):

    # 64-bit version
    cmake -DIQTREE_FLAGS=static-libcxx -DCMAKE_C_COMPILER=clang-4 -DCMAKE_CXX_COMPILER=clang++-4 <source_dir>

    # 32-bit version
    cmake -DIQTREE_FLAGS=static-m32 -DCMAKE_C_COMPILER=clang-4 -DCMAKE_CXX_COMPILER=clang++-4 <source_dir>
    
macOS binaries were compiled under macOS Sierra, but the binaries are backward compatible with Mac OS X 10.7 Lion:

    cmake -DCMAKE_C_COMPILER=clang-4 -DCMAKE_CXX_COMPILER=clang++-4 <source_dir>

Windows binaries were statically compiled under Windows 7 using Clang 3.9.0 in combination with [TDM-GCC 5.1.0](http://tdm-gcc.tdragon.net), which provides the neccessary libraries for Clang. 

    # 64-bit version
    cmake -G "MinGW Makefiles" -DIQTREE_FLAGS=static -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ -DCMAKE_C_FLAGS=--target=x86_64-pc-windows-gnu -DCMAKE_CXX_FLAGS=--target=x86_64-pc-windows-gnu -DCMAKE_MAKE_PROGRAM=mingw32-make ..
    
    #32-bit version
    cmake -G "MinGW Makefiles" -DIQTREE_FLAGS=static -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ -DCMAKE_C_FLAGS=--target=i686-pc-windows-gnu -DCMAKE_CXX_FLAGS=--target=i686-pc-windows-gnu -DCMAKE_MAKE_PROGRAM=mingw32-make ..