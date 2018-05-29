#!/bin/bash
echo "###### cd to project dir ######"
cd /home/staging/web
echo "###### pull master branch ... ######"
git pull
echo "###### run project build file: ######"
echo "###### path : /home/staging/web/build.sh ######"
/home/staging/web/build.sh
