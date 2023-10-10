#/bin/bash

sudo apt update

#apt list --all-versions linux-image-*


sudo apt install linux-image-4.18.0-25-generic

sudo update-grub

sudo reboot

uname -r

sudo apt remove linux-image-5.10.0-14-generic

sudo apt remove linux-image-5.10.0-14-generic

sudo apt-mark hold linux-image-$(uname -r)
sudo apt-mark hold linux-headers-$(uname -r)
