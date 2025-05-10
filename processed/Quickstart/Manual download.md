Getting started
Recommended for users who just downloaded IQ-TREE the first time.

### Manual download

IQ-TREE for Windows, MacOSX and Linux can be [downloaded here](http://www.iqtree.org/#download).

* Extract the `.zip` (Windows, MacOSX) or `.tar.gz` (Linux) file to create a directory `iqtree-X.Y.Z-OS`, where `X.Y.Z` is the version number and `OS` is the operating system (Windows, MacOSX or Linux).
* You will find the executable in the `bin` sub-folder. Copy all files in `bin` folder to your system search path such that you can run IQ-TREE by entering `iqtree` from the Terminal.

Now you need to open a Terminal (or Console) to run IQ-TREE. See below the guide for [Windows users](#for-windows-users) and [Mac OS X users](#for-mac-os-x-users).

For Windows users

Since IQ-TREE is a command-line program, clicking on `iqtree.exe` will not work. You have to open a Command Prompt for all analyses:

1. Click on "Start" menu (below left corner of Windows screen).
2. Type in "cmd" and press "Enter". It will open the Command Prompt window (see Figure below).
3. Go into IQ-TREE folder you just extracted by entering e.g. (assuming you downloaded version 1.5.0):

        cd Downloads\iqtree-1.5.0-Windows
        
    (assuming that IQ-TREE was downloaded into `Downloads` folder).
4. Now you can try an example run by entering:

        bin\iqtree -s example.phy
        
    (`example.phy` is the example PHYLIP alignment file also extracted in that folder).
5. After a few seconds, IQ-TREE finishes and you may see something like this:

![Windows command prompt](images/win-cmd2.png)

Congratulations ;-) You have finished the first IQ-TREE analysis.


For Mac OS X users

1. Open the "Terminal", e.g., by clicking on the Spotlight icon (top-right corner), typing "terminal" and press "Enter".
2. Go into IQ-TREE folder by entering (assuming you downloaded version 1.5.0):

        cd Downloads/iqtree-1.5.0-MacOSX

    (assuming that IQ-TREE was downloaded into `Downloads` folder).
3. Now you can try an example run by entering 

        bin/iqtree -s example.phy

    (`example.phy` is the example PHYLIP alignment file also extracted in that folder).
4. After a few seconds, IQ-TREE finishes and you may see something like this:

![Mac terminal](images/mac-cmd2.png)

Congratulations ;-) You have finished the first IQ-TREE analysis.