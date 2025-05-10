Compilation guide
For advanced users to compile IQ-TREE source code.

### Compiling MPI version

**Requirements**:

* Download source code of IQ-TREE version 1.5.1 or later. 
* Install an MPI library (e.g., [OpenMPI](http://open-mpi.org/)) if not available in your system. For Mac OS X, the easiest is to install [Homebrew package manager](http://brew.sh), and then install OpenMPI library from the command line with:

        brew install openmpi

Then simply run `CMake` and `make` by:

    cmake -DIQTREE_FLAGS=mpi ..
    make -j4

IQ-TREE will automatically detect and setup the MPI paths and library. Alternatively, you can also use the MPI C/C++ compiler wrappers (typically named `mpicc` and `mpicxx`), for example:

    cmake -DCMAKE_C_COMPILER=mpicc -DCMAKE_CXX_COMPILER=mpicxx ..
    make -j4

The executable is named `iqtree-mpi`. One can then run `mpirun` to start the MPI version with e.g. 2 processes:

    mpirun -np 2 iqtree-mpi -s alignment ...

If you want to compile the hybrid MPI/OpenMP version, simply run:

    cmake -DIQTREE_FLAGS=omp-mpi ..
    make -j4

The resulting executable is then named `iqtree-mpi` (`iqtree-omp-mpi` for IQ-TREE versions <= 1.5.X). This can be used to start an MPI run with e.g. 4 processes and 2 cores each (i.e., a total of 8 cores will be used):

    # For IQ-TREE version <= 1.5.X
    mpirun -np 4 iqtree-omp-mpi -nt 2 -s alignment ...

    # For IQ-TREE version >= 1.6.0
    mpirun -np 4 iqtree-mpi -nt 2 -s alignment ...



>**NOTE**: Please be aware that [OpenMP](http://openmp.org/) and [OpenMPI](http://open-mpi.org/) are different! OpenMP is the standard to implement shared-memory multithreading program, that we use to provide the multicore IQ-TREE version. Whereas OpenMPI is a message passing interface (MPI) library for distributed memory parallel system, that is used to compile `iqtree-mpi`. Thus, **one cannot run `iqtree` with `mpirun`!**