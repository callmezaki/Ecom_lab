#!/bin/bash

# Define the desired kernel version
KERNEL_VERSION="5.8.0"

# Update package list
sudo apt-get update

# Search for available kernel images and headers
KERNEL_IMAGE=$(apt-cache search linux-image-$KERNEL_VERSION)
KERNEL_HEADERS=$(apt-cache search linux-headers-$KERNEL_VERSION)

# Check if the desired kernel version is available
if [[ -z $KERNEL_IMAGE || -z $KERNEL_HEADERS ]]; then
  echo "The specified kernel version is not available in the repositories."
  exit 1
fi

# Extract the exact package names
KERNEL_IMAGE_PKG=$(echo $KERNEL_IMAGE | awk '{print $1}')
KERNEL_HEADERS_PKG=$(echo $KERNEL_HEADERS | awk '{print $1}')

# Install the kernel image and headers
sudo apt-get install -y $KERNEL_IMAGE_PKG $KERNEL_HEADERS_PKG

# Update grub and reboot
sudo update-grub
echo "Rebooting in 5 seconds..."
sleep 5
sudo reboot
