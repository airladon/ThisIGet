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
        thisiget-pupp \
        "run" "jest" "--" "--runInBand" $@
}

docker_start_browser_test_container() {
    docker run -it --rm \
        -v $HOST_PATH/tests/browser:/home/pptruser/tests/browser \
        -v $HOST_PATH/src:/home/pptruser/src \
        -v $HOST_PATH/containers/pupp/jest.config.js:/home/pptruser/jest.config.js \
        -v $HOST_PATH/containers/pupp/jest-puppeteer.config.js:/home/pptruser/jest-puppeteer.config.js \
        -v $HOST_PATH/.babelrc:/home/pptruser/.babelrc \
        -e TIG_ADDRESS=$1 \
        --name devenv-browser-test \
        thisiget-pupp \
        bash
}

title() {  
    echo
    echo "${bold}${cyan}=================== $1 ===================${reset}"
}
# chmod +777 -R src
# chmod +777 -R tests

cp containers/pupp/Dockerfile Dockerfile_pupp

HOST_USER_ID=`id -u`

sed "s/HOST_USER_ID/${HOST_USER_ID}/" < Dockerfile_pupp > Dockerfile 
rm Dockerfile_pupp

docker build -t thisiget-pupp .
rm Dockerfile

if [ "$1" = debug ];
then
    docker_start_browser_test_container
    exit 0
fi

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
