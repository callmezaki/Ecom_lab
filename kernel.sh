#!/bin/bash

FILE_PATH="/boot/grub/grub.cfg"

pattern1=$(grep -oE 'gnulinux-6\.2\.0-20-generic-advanced-\w+-\w+-\w+-\w+-\w+' "$FILE_PATH" | sort | uniq)
pattern2=$(grep -oE 'gnulinux-advanced-\w+-\w+-\w+-\w+-\w+' "$FILE_PATH" | sort | uniq)


Kernel="$pattern2>$pattern1"

sed -i "s/^GRUB_DEFAULT=\".*\"/GRUB_DEFAULT=\"$Kernel\"/" /etc/default/grub
