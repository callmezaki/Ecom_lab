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
# apt-get install libelogind-dev
apt-get install libsystemd-dev
apt-get install intltool -y
apt-cache search libmozjs
apt-get install libmozjs-78-0 libmozjs-78-dev -y
./configure --enable-libelogind=no --enable-libsystemd-login=yes

apt-get install libpam0g-dev
apt-get install libsystemd-dev

make 
polkitd --version
tar xvf polkit-0.118.tar.gz

groupadd polkitd
useradd -r -g polkitd -d /var/lib/polkitd -s /bin/false polkitd

chown root:root /usr/local/lib/polkit-1/polkit-agent-helper-1
chmod 4755 /usr/local/lib/polkit-1/polkit-agent-helper-1
chown root:root /usr/local/bin/pkexec
chmod 4755 /usr/local/bin/pkexec
chown polkitd:polkitd /usr/local/etc/polkit-1/rules.d
chmod 700 /usr/local/etc/polkit-1/rules.d
chown polkitd:polkitd /usr/local/share/polkit-1/rules.d
chmod 700 /usr/local/share/polkit-1/rules.d
