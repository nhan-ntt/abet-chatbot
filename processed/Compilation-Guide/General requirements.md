Compilation guide
For advanced users to compile IQ-TREE source code.

### General requirements

* A C++ compiler such as GCC (version >= 4.8), Clang, MS Visual Studio and Intel C++ compiler. 

* [CMake](http://www.cmake.org) version >= 2.8.10.

* [Boost library](https://www.boost.org) for IQ-TREE version 2. Boost library is typically available under Linux. Under MacOS you use [Homebrew](https://brew.sh) and run `brew install boost` to install the Boost library. By default IQ-TREE will detect the path to the installed Boost library. 

* [Eigen3 library](https://eigen.tuxfamily.org) (for IQ-TREE version >= 1.6). Under MacOS you use [Homebrew](https://brew.sh) and run `brew install eigen` to install the Boost library. By default IQ-TREE will  detect the path to the installed Eigen3 library. If this failed, you have to manually specify `-DEIGEN3_INCLUDE_DIR=<installed_eigen3_dir>` to the `cmake` command (see below).

* OpenMP library, which is used to compile the multicore version. This should typically be the case with `gcc` under Linux. Under MacOS you use [Homebrew](https://brew.sh) and run `brew install libomp` to install the OpenMP library.

* (_Optional_) Install [git](https://git-scm.com) if you want to clone source code from [IQ-TREE GitHub repository](https://github.com/Cibiv/IQ-TREE).