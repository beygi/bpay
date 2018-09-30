#!/bin/bash
echo "###### cd to project dir ######"
cd /home/staging/web
echo "###### checkout and pull master branch ... ######"
git checkout .
git pull
echo "###### run project build file: ######"
echo "###### path : /home/staging/web/build.sh ######"
/home/staging/gateway/build.sh
