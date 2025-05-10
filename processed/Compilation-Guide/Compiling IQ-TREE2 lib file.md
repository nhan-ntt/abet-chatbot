Compilation guide
For advanced users to compile IQ-TREE source code.

### Compiling IQ-TREE2 lib file

Starting with version 2.3.3, you can compile and create IQ-TREE2 lib file.

If you want to compile the IQ-TREE2 lib file, simply run:

    cmake -DBUILD_LIB=ON ..
    make -j4


<!--
Compling with deep learning kernel for ModelFinder 2
--------------------------------------------------

IQ-TREE version 2.2.x supports deep learning to speed up ModelFinder 2.
To compile you will need to install the [onnxruntime library](https://onnxruntime.ai). On a MacOS, the fastest way is via homebrew package manager:

	brew install onnxruntime
	
This will install the necessary header files in

	/usr/local/Cellar/onnxruntime/1.11.0/include/onnxruntime/core/session/

and the library file in:

	/usr/local/Cellar//onnxruntime/1.11.0/lib/
	
where 1.11.0 is the version of onnxruntime at the time of writing this document. You may need the version number which can be found by:

	brew info onnxruntime

Now you will need to run cmake by additional options:

	cmake -Donnxruntime_INCLUDE_DIRS=/usr/local/Cellar//onnxruntime/1.11.0/include/onnxruntime/core/session/ -Donnxruntime_LIBRARIES=/usr/local/Cellar//onnxruntime/1.11.0/lib/libonnxruntime.dylib ..
-->