Compilation guide
For advanced users to compile IQ-TREE source code.

### Compiling under Mac OS X

* Make sure that Clang compiler is installed, which is typically the case if you installed Xcode and the associated command line tools.

* If you installed cmake with Homebrew 

* Find the path to the CMake executable, which is typically `/Applications/CMake.app/Contents/bin/cmake`. For later convenience, please create a symbolic link `cmake` to this cmake executable, so that cmake can be invoked from the Terminal by simply entering `cmake`.

The steps to compile IQ-TREE are similar to Linux (see above), except that you need to specify `clang` as compiler when configuring source code with CMake (step 4):

    cmake -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ ..

(please change `cmake` to absolute path like `/Applications/CMake.app/Contents/bin/cmake`).

* To compile IQ-TREE under Mac with ARM processor, use Clang 17 or above.

* If the OpenMP include or lib files cannot be found, then you can specify the location of OpenMP include or lib files, for example:

		export LDFLAGS="-L/opt/homebrew/opt/libomp/lib"

    	export CPPFLAGS="-I/opt/homebrew/opt/libomp/include"

    	cmake -DCMAKE_CXX_FLAGS="$LDFLAGS $CPPFLAGS" -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ ..

(please change the path to the installed location of your OpenMP library)