#!/bin/bash
BLUE='\033[1;34m'
NC='\033[0m' # No Color

set -e
echo "###### date ######"
date +%d\ %m\ %Y
echo "###### whoami ######"
whoami
pwd
echo "###### last commit message ######"
comment="$(git log -1)"
printf "${BLUE}${comment}${NC}\n"
echo "###### remove dist dir ######"
rm -r -f dist
echo "###### install dev dependencies ######"
yarn install
echo "###### build ... ######"
yarn build
echo "###### Replace old created files with new ones ######"
mv out todelete
mv dist out
rm -r todelete
echo "###### DONE ######"
