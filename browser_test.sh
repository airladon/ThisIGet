#!/bin/bash

# To execute tests at some site:
# browser_test.sh local <TEST_REGEX>       http://host.docker.internal:5003
# browser_test.sh 5000 <TEST_REGEX>        http://host.docker.internal:5002
# browser_test.sh 5001 <TEST_REGEX>        http://host.docker.internal:5001
# browser_test.sh 5002 <TEST_REGEX>        http://host.docker.internal:5002
# browser_test.sh 5003 <TEST_REGEX>        http://host.docker.internal:5003
# browser_test.sh dev  <TEST_REGEX>        https://thisiget-dev.herokuapp.com
# browser_test.sh test <TEST_REGEX>        https://thisiget-test.herokuapp.com
# browser_test.sh beta <TEST_REGEX>        https://thisiget-beta.herokuapp.com
# browser_test.sh prod <TEST_REGEX>        https://thisiget.com
# browser_test.sh <SITE> <TEST_REGEX>      SITE
# browser_test.sh <SITE> -u <TEST_REGEX>   SITE updating jest snap shots



# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

if [ -z "${TIG_ADDRESS}" ];
then
  TIG_ADDRESS=http://host.docker.internal:5003       # default to local
fi

# check_status() {
#   if [ $? != 0 ];
#   then
#     echo
#     echo "${bold}${red}Build failed${reset}"
#     echo
#     exit 1
#   else
#     echo "${bold}${green}OK${reset}"
#   fi
# }

title() {
    echo
    echo "${bold}${cyan}=================== $1 ===================${reset}"
}

ADDRESS=$1

if [ $ADDRESS ];
then
    case $ADDRESS in
        local) TIG_ADDRESS='http://host.docker.internal:5003';;
        5000) TIG_ADDRESS='http://host.docker.internal:5000';;
        5001) TIG_ADDRESS='http://host.docker.internal:5001';;
        5002) TIG_ADDRESS='http://host.docker.internal:5002';;
        5003) TIG_ADDRESS='http://host.docker.internal:5003';;
        dev) TIG_ADDRESS='https://thisiget-dev.herokuapp.com';;
        test) TIG_ADDRESS='https://thisiget-test.herokuapp.com';;
        beta) TIG_ADDRESS='https://thisiget-beta.herokuapp.com';;
        prod) TIG_ADDRESS='https://thisiget.herokuapp.com';;
        *) TIG_ADDRESS=$ADDRESS;;
    esac
fi

title "Running tests on $TIG_ADDRESS"

export TIG_ADDRESS=$TIG_ADDRESS
jest --runInBand $2