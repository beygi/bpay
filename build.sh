#!/bin/bash
echo "###### date ######"
date +%d\ %m\ %Y
echo "###### whoami ######"
whoami
echo "###### cd to src dir ######"
cd /home/staging/web
pwd
echo "###### last commit message ######"
git log -1 | cat
echo "###### remove node modules and dist dir ######"
rm -R node_modules dist
echo "###### install dependencies ######"
yarn install
echo "###### build ... ######"
yarn build
echo "###### DONE ######"
