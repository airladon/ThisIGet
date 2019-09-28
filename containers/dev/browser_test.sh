#!/bin/bash

# browser_test.sh                    http://host.docker.internal:5003
# browser_test.sh local              http://host.docker.internal:5003
# browser_test.sh dev                https://thisiget-dev.herokuapp.com
# browser_test.sh test               https://thisiget-test.herokuapp.com
# browser_test.sh beta               https://thisiget-beta.herokuapp.com
# browser_test.sh prod               https://thisiget.com
# browser_test.sh <SITE>             SITE
# browser_test.sh <SITE> -u          SITE updating jest snap shots

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

# --entrypoint "/home/pptruser/node_modules/.bin/jest" \
docker_run_browser_test() {
    echo "$@"
    docker run -it --rm \
        -v $HOST_PATH/tests/browser:/home/pptruser/tests/browser \
        -v $HOST_PATH/src:/home/pptruser/src \
        -v $HOST_PATH/containers/pupp/jest.config.js:/home/pptruser/jest.config.js \
        -v $HOST_PATH/containers/pupp/jest-puppeteer.config.js:/home/pptruser/jest-puppeteer.config.js \
        -v $HOST_PATH/.babelrc:/home/pptruser/.babelrc \
        -e TIG_ADDRESS=$1 \
        --name devenv-browser-test \
        --entrypoint "npm" \
        airladon/pynode:python3.7.4-node12.10.0-npm6.11.3-puppeteer1.20.0-chrome79.0.3921.0 \
        "run" "jest" "--" "--runInBand" $@
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
        prod) TIG_ADDRESS='https://thisiget.herokuapp.com';;
        *) TIG_ADDRESS=$1;;
    esac
fi

title "Running tests on $TIG_ADDRESS"
docker_run_browser_test "$TIG_ADDRESS" "${@:2}"

