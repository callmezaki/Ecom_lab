#!/bin/bash

mkdir -p /overlay/{upper,lower,work,merged}
mount -t overlay -o lowerdir=/overlay/lower,upperdir=/overlay/upper,workdir=/overlay/work overlay /overlay/merged
