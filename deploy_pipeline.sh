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

docker_run_build() {
    docker run -it --rm \
        -v $PROJECT_PATH/containers:/opt/app/containers \
        -v $PROJECT_PATH/containers/dev/pytest.ini:/opt/app/pytest.ini \
        -v $PROJECT_PATH/containers/dev/build.sh:/opt/app/build.sh \
        -v $PROJECT_PATH/tests:/opt/app/tests \
        -v $PROJECT_PATH/.babelrc:/opt/app/.babelrc \
        -v $PROJECT_PATH/jest.config.js:/opt/app/jest.config.js \
        -v /var/run/docker.sock:/var/run/docker.sock \
        --env-file=$PROJECT_PATH/containers/env.txt \
        --name devenv-builder \
        --entrypoint "/opt/app/build.sh" \
        devenv-builder \
        $1 $2 $3 $4

    check_status
}

docker_run_browser_test() {
    docker run -it --rm \
        -v $PROJECT_PATH/tests/browser:/home/pptruser/tests \
        -v $PROJECT_PATH/containers/pupp/jest.config.js:/home/pptruser/jest.config.js \
        -v $PROJECT_PATH/containers/pupp/jest-puppeteer.config.js:/home/pptruser/jest-puppeteer.config.js \
        -v $PROJECT_PATH/.babelrc:/home/pptruser/.babelrc \
        -e TIG_ADDRESS=$1 \
        --name devenv-browser-test \
        --entrypoint "jest" \
        airladon/pynode:python3.7.2-node10.15.0-npm6.6.0-puppeteer
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
title "Building Development Container"
cp containers/Dockerfile_dev Dockerfile
docker build -t devenv-builder .
rm Dockerfile
check_status


###########################################################################
title "Run Lint Checks, Tests and Build App"
docker_run_build prod


###########################################################################
title "Deploy to thisiget-test"
docker_run_build deploy test skip-tests skip-build

title "Delay for thisiget-test to restart"
sleep 5s
check_status

title "Browser Tests: thisiget-test"
docker_run_browser_test 'https://thisiget-test.herokuapp.com'
check_status

###########################################################################
title "Deploy to thisiget-beta"
docker_run_build deploy beta skip-tests skip-build

title "Delay for thisiget-beta to restart"
sleep 5s
check_status

title "Browser Tests: thisiget-beta"
docker_run_browser_test 'https://thisiget-beta.herokuapp.com'
check_status

###########################################################################
CURRENT_VERSION=`heroku releases -a thisiget | sed -n '1p' | sed 's/^.*: //'`
title "Deploy to thisiget - current: $CURRENT_VERSION"
docker_run_build deploy thisiget skip-tests skip-build

title "Delay for thisiget to restart"
sleep 5s
check_status

title "Browser Tests: thisiget"
docker_run_browser_test 'https://www.thisiget.com'
if [ $? != 0 ];
then
    docker run -it --rm \
        -v /var/run/docker.sock:/var/run/docker.sock \
        --env-file=$PROJECT_PATH/containers/env.txt \
        --name devenv-builder \
        --entrypoint "/usr/bin/heroku" \
        devenv-builder \
        rollback $CURRENT_VERSION

    # NEW_VERSION=`heroku releases -a thisiget | sed -n '1p' | sed 's/^.*: //'`
    # echo "${red}${bold}Production deployment failed${reset}"
    # if [ "$NEW_VERSION" = "$CURRENT_VERSION" ];
    # then
    echo "${red}${bold}Rolled back to $CURRENT_VERSION${reset}"
    echo
    # else
    #     echo "${red}${bold}Rollback to $CURRENT_VERSION failed${reset}"
    #     echo
    # fi
    exit 1
fi

# CURRENT_PRODUCTION_VERSION=`heroku releases -a thisiget | sed -n '1p' | sed 's/^.*: //'`
