#!/bin/bash

# ratings_test.sh                    http://host.docker.internal:5003
# ratings_test.sh local              http://host.docker.internal:5003
# ratings_test.sh dev                https://thisiget-dev.herokuapp.com
# ratings_test.sh test               https://thisiget-test.herokuapp.com
# ratings_test.sh beta               https://thisiget-beta.herokuapp.com
# ratings_test.sh prod               https://thisiget.com
# ratings_test.sh <SITE>             SITE

# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

TIG_ADDRESS=http://host.docker.internal:5003       # default to local

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

if [ $1 ];
then
    case $1 in
        local) TIG_ADDRESS='http://host.docker.internal:5003';;
        dev) TIG_ADDRESS='https://thisiget-dev.herokuapp.com';;
        test) TIG_ADDRESS='https://thisiget-test.herokuapp.com';;
        beta) TIG_ADDRESS='https://thisiget-beta.herokuapp.com';;
        prod) TIG_ADDRESS='https://www.thisiget.com';;
        *) TIG_ADDRESS=$1;;
    esac
fi

title "Running tests on $TIG_ADDRESS"
# docker_run_browser_test "$TIG_ADDRESS" $2 $3 $4
echo $TIG_ADDRESS > /opt/app/tests/lessons/tig_address
jest --config /opt/app/jest.index.config.js ratings.test.js

