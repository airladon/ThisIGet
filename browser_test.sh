#!/bin/bash

# To execute tests at some site:
# browser_test.sh local              http://host.docker.internal:5003
# browser_test.sh 5000               http://host.docker.internal:5002
# browser_test.sh 5001               http://host.docker.internal:5001
# browser_test.sh 5002               http://host.docker.internal:5002
# browser_test.sh 5003               http://host.docker.internal:5003
# browser_test.sh dev                https://thisiget-dev.herokuapp.com
# browser_test.sh test               https://thisiget-test.herokuapp.com
# browser_test.sh beta               https://thisiget-beta.herokuapp.com
# browser_test.sh prod               https://thisiget.com
# browser_test.sh <SITE>             SITE
# browser_test.sh <SITE> -u          SITE updating jest snap shots

# To open a bash terminal where calling jest will use some site by default:
# browser_test.sh debug local
# browser_test.sh debug 5000
# browser_test.sh debug 5001
# browser_test.sh debug 5002
# browser_test.sh debug 5003
# browser_test.sh debug dev
# browser_test.sh debug test
# browser_test.sh debug beta
# browser_test.sh debug prod
# browser_test.sh debug <SITE>


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
        -e TIG_ADDRESS=$TIG_ADDRESS \
        -e MAIL_RECEIVE_SERVER=$MAIL_RECEIVE_SERVER \
        -e MAIL_RECEIVE_USERNAME=$MAIL_RECEIVE_USERNAME \
        -e MAIL_RECEIVE_PASSWORD=$MAIL_RECEIVE_PASSWORD \
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
        -e TIG_ADDRESS=$TIG_ADDRESS \
        -e MAIL_RECEIVE_SERVER=$MAIL_RECEIVE_SERVER \
        -e MAIL_RECEIVE_USERNAME=$MAIL_RECEIVE_USERNAME \
        -e MAIL_RECEIVE_PASSWORD=$MAIL_RECEIVE_PASSWORD \
        --name devenv-browser-test \
        thisiget-pupp \
        bash
}

title() {  
    echo
    echo "${bold}${cyan}=================== $1 ===================${reset}"
}

cp containers/pupp/Dockerfile Dockerfile_pupp
cp containers/pupp/.dockerignore .dockerignore

HOST_USER_ID=`id -u`

sed "s/HOST_USER_ID/${HOST_USER_ID}/" < Dockerfile_pupp > Dockerfile 
rm Dockerfile_pupp

docker build -t thisiget-pupp .
rm Dockerfile
rm .dockerignore

ADDRESS=$1
if [ "$1" = debug ];
then
  ADDRESS=$2
fi

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

if [ "$1" = debug ];
then
    docker_start_browser_test_container
    exit 0
fi

title "Running tests on $TIG_ADDRESS"
# docker_run_browser_test "$TIG_ADDRESS" "${@:2}"
docker_run_browser_test "${@:2}"

