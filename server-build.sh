#!/bin/bash
echo "###### cd to project dir ######"
cd "/home/my/${DEPLOY_TYPE}"
echo "###### checkout and pull master branch ... ######"
git checkout .
git pull
echo "###### run project build file: ######"
./build.sh
