Compilation guide
For advanced users to compile IQ-TREE source code.

### Setup an Xcode project in MacOS

Many developers in MacOS use Xcode to develop the code. To generate an XCode project for IQ-TREE, you need to run:

    mkdir build-xcode
    cd build-xcode
    cmake -G Xcode <IQTREE_SOURCE_DIR>

This will generate a a subfolder `build-xcode/iqtree.xcodeproj`, which you can open in Xcode now.