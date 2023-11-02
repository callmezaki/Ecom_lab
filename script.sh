#!/bin/bash


wget https://bugs.launchpad.net/ubuntu/+archive/primary/+sourcefiles/linux/6.2.0-20.20/linux_6.2.0.orig.tar.gz

tar -xvf linux_6.2.0.orig.tar.gz
cd linux-6.2.0

apt-get update

apt-get install build-essential libncurses-dev bison flex libssl-dev libelf-dev make gcc

cp /boot/config-$(uname -r) .config

mkdir -p /overlay/{upper,lower,work,merged}
mount -t overlay -o lowerdir=/overlay/lower,upperdir=/overlay/upper,workdir=/overlay/work overlay /overlay/merged

make -j$(nproc)
make modules_install install
update-grub
reboot
