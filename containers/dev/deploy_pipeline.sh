#!/bin/bash

# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

PROJECT_PATH=`pwd`

check_status() {
  if [ $? != 0 ];
  then
    echo
    echo "${bold}${red}Build failed${reset}"
    echo
    exit 1
  else
    echo "${bold}${green}OK${reset}"
  fi
}

title() {
    echo
    echo "${bold}${cyan}=================== $1 ===================${reset}"
}

# From https://github.com/travis-ci/travis-ci/issues/4704 to fix an issue 
# where Travis errors out if too much information goes on stdout and some
# npm package is blocking stdout.
python -c 'import os,sys,fcntl; flags = fcntl.fcntl(sys.stdout, fcntl.F_GETFL); fcntl.fcntl(sys.stdout, fcntl.F_SETFL, flags&~os.O_NONBLOCK);'


###########################################################################
title "Run Lint Checks, Tests and Build App"
./build.sh prod
check_status

title "Creating hashes"
python ./create_site_hashes.py

title "Creating site map"
python ./create_site_map.py
check_status

###########################################################################
title "Deploy to thisiget-test"
./build.sh deploy test skip-tests skip-build
check_status

title "Delay for thisiget-test to restart"
sleep 5s
check_status

title "Ratings Test: thisiget-test"
./ratings_test.sh test
check_status

title "Browser Tests: thisiget-test"
JEST_OPTIONS=`python browser_test_diff_master.py`
echo Testing: $JEST_OPTIONS
if [ -z "$JEST_OPTIONS" ];
then
    echo No extended tests needed
else
    ./browser_test.sh test $JEST_OPTIONS
    check_status
fi

###########################################################################
title "Deploy to thisiget-beta"
./build.sh deploy beta skip-tests skip-build
check_status

title "Delay for thisiget-beta to restart"
sleep 5s
check_status

title "Ratings Test: thisiget-beta"
./ratings_test.sh beta
check_status

title "Browser Tests: thisiget-beta"
./browser_test.sh beta prod.btest.js
check_status

###########################################################################
CURRENT_VERSION=`heroku releases -a thisiget | sed -n '1p' | sed 's/^.*: //'`
title "Deploy to thisiget - current: $CURRENT_VERSION"
./build.sh deploy thisiget skip-tests skip-build
check_status

title "Delay for thisiget to restart"
sleep 5s
check_status

title "Ratings Test: thisiget"
./ratings_test.sh prod
check_status

title "Browser Tests: thisiget"
./browser_test.sh prod prod.btest.js
if [ $? != 0 ];
then
    heroku rollback $CURRENT_VERSION
    NEW_VERSION=`heroku releases -a thisiget | sed -n '1p' | sed 's/^.*: //'`
    echo "${red}${bold}Production deployment failed${reset}"
    if [ "$NEW_VERSION" = "$CURRENT_VERSION" ];
    then
        echo "${red}${bold}Rolled back to $CURRENT_VERSION${reset}"
        echo
    else
        echo "${red}${bold}Rollback to $CURRENT_VERSION failed${reset}"
        echo
    fi
    exit 1
fi

