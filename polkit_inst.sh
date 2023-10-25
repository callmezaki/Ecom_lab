#!/bin/bash

# Set the Polkit version you want to install
POLKIT_VERSION="0.105"

# CVE-2021-3560
# Directory where you want to build and install Polkit
INSTALL_DIR="/usr/local"

# Clone the Polkit source code from GitHub
git clone https://github.com/polkit/polkit.git

# Navigate to the Polkit source directory
cd polkit

# Check out the specific version
git checkout "v$POLKIT_VERSION"

# Configure the build
./configure --prefix="$INSTALL_DIR"

# Compile and install Polkit
make
make install

# Check the installed Polkit version
pkaction --version

# Clean up - Remove the source code directory (optional)
cd ..
rm -rf polkit

echo "Polkit $POLKIT_VERSION has been installed."

apt-get install libexpat1-dev
apt-get install libelogind-dev
apt-get install libsystemd-dev

apt-cache search libmozjs
apt-get install libmozjs-78-0 libmozjs-78-dev -y
./configure --enable-libelogind=yes --enable-libsystemd-login=no

sudo apt-get install libpam0g-dev
sudo apt-get install libsystemd-dev


wget https://www.freedesktop.org/software/polkit/releases/polkit-0.118.tar.gz
tar xvf polkit-0.118.tar.gz