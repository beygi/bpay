#!/bin/bash
echo "###### date ######"
date +%d\ %m\ %Y
echo "###### whoami ######"
whoami
echo "###### cd to src dir ######"
cd /home/staging/gateway
pwd
echo "###### last commit message ######"
git log -1 | cat
echo "###### remove dist dir ######"
rm -R dist
echo "###### install dev dependencies ######"
yarn install
echo "###### build ... ######"
yarn build
echo "###### Replace old created files with new ones ######"
mv out todelete
mv dist out
rm -R todelete
echo "###### DONE ######"

