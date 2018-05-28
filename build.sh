#!/bin/bash
echo "###### date ######"
date +%d\ %m\ %Y
echo "###### whoami ######"
whoami
echo "###### cd to src dir ######"
cd /home/staging/web/dist
pwd
echo "###### pull master branch ... ######"
git pull
echo "###### install dependencies ######"
yarn install
echo "###### build ... ######"
yarn build
echo "###### DONE ######"
