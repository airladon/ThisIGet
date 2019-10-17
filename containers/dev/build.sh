#!/bin/bash

# build.sh                           Test and build dev version
# build.sh dev                       Test and build dev version
# build.sh stage                     Test and build stage version
# build.sh prod                      Test and build prod version
# build.sh deploy                    Deploy prod build to thisiget-dev
# build.sh deploy dev                Deploy prod build to thisiget-dev
# build.sh deploy test               Deploy prod build to thisiget-test
# build.sh deploy beta               Deploy prod build to thisiget-beta
# build.sh deploy thisiget           Deploy prod build to thisiget
# build.sh deploy APP_NAME           Deploy prod build to APP_NAME

# build.sh dev skip-tests         Test and build dev version skipping tests
# build.sh stage skip-tests       Test and build stage version skipping tests
# build.sh prod skip-tests        Test and build prod version skipping tests


# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`
normal="\\033[2m"

MODE=prod
DEPLOY=no_deploy
TESTS=run
BUILD=run
HEROKU_APP_NAME=thisiget            # Production app name on Heroku
HEROKU_BETA_APP_NAME=thisiget-beta  # Testing with production database
HEROKU_TEST_APP_NAME=thisiget-test  # Automated web app testing
HEROKU_DEV_APP_NAME=thisiget-dev    # For developer testing
# DEPLOY_PROD_BRANCH=master           # Branch to test and deploy to prod
# DEPLOY_BETA_BRANCH=release-candidate # Branch to test and deploy to dev
# TRAVIS_DEBUG_BRANCH=travis          # Branch for fast travis debug
# BRANCH=test
APP_NAME="$HEROKU_DEV_APP_NAME"
FAIL=0

# Check current build status and exit if in failure state
check_fail() {
  if [ $FAIL = 1 ];
  then
    echo
    echo "${bold}${red}Build failed at${bold}${cyan}" $1 "${reset}"
    echo
    exit 1
  else
    echo "${bold}${green}OK${reset}"
  fi
}

check_status() {
  if [ $? != 0 ];
  then
    echo
    echo "${bold}${red}Build failed at${bold}${cyan}" $1 "${reset}"
    echo
    exit 1
  else
    echo "${bold}${green}OK${reset}"
  fi
}

# Check first command line argument to see how to build javascript
case "$1" in
  dev) MODE=dev;;
  stage) MODE=stage;;
  prod) MODE=prod;;
  deploy) MODE=prod; DEPLOY=deploy;;
  *) MODE=dev;;
esac

if [ "$2" ];
then
  case "$2" in
    dev) APP_NAME=$HEROKU_DEV_APP_NAME;;
    test) APP_NAME=$HEROKU_TEST_APP_NAME;;
    beta) APP_NAME=$HEROKU_BETA_APP_NAME;;
    thisiget) APP_NAME=$HEROKU_APP_NAME;;
    skip-tests) TESTS="skip";;
    skip-build) BUILD="skip";;
    *) APP_NAME="$2";;
  esac
fi

if [ "$3" ];
then
  if [ "$3" = "skip-tests" ];
  then
    TESTS="skip"
  fi
  if [ "$3" = "skip-build" ];
  then
    BUILD="skip"
  fi
fi

if [ "$4" ];
then
  if [ "$4" = "skip-build" ];
  then
    BUILD=skip
  fi
fi

if [ "$DEPLOY" = deploy ];
then
  TITLE_STRING=''
  if [ $APP_NAME ];
  then
    # Check heroku token exists
    echo
    echo "${bold}${cyan}==== Checking ${reset}${cyan}HEROKU_API_KEY${bold} Exists locally =====${reset} "
    if [ -z $HEROKU_API_KEY ];
    then
      echo "${red}${bold}HEROKU_API_KEY ${reset}${red}environment variable not defined${reset}"
      FAIL=1
    fi
    check_fail "Heroku api key check"

    # Check app exists
    echo
    echo "${bold}${cyan}==== Checking ${reset}${cyan}$APP_NAME${bold} Exists on Heroku =====${reset} "
    RESULT=`heroku apps | grep ^$APP_NAME$ | wc -l | sed 's/ //g'`
    if [ $RESULT != 1 ];
    then
      echo ''
      echo "${red}Heroku app ${bold}$APP_NAME${reset}${red} doesn't exist or is not associated with this account."
      FAIL=1
    fi
    check_fail "Heroku App Check"

    # Check the heroku app has the required config vars already set
    echo
    echo "${bold}${cyan}==== Checking ${reset}${cyan}$APP_NAME${bold} Heroku Config Variables Exist =====${reset} "

    EXPECTED_CONFIG_VARS[0]=MAIL_SERVER
    EXPECTED_CONFIG_VARS[1]=SECRET_KEY
    EXPECTED_CONFIG_VARS[2]=MAIL_USERNAME
    EXPECTED_CONFIG_VARS[3]=MAIL_SENDER
    EXPECTED_CONFIG_VARS[4]=AES_KEY
    EXPECTED_CONFIG_VARS[5]=PEPPER
    EXPECTED_CONFIG_VARS[6]=DATABASE_URL
    EXPECTED_CONFIG_VARS[7]=ADMIN
    EXPECTED_CONFIG_VARS[8]=LOGGING

    HEROKU_CONFIG_VARS=`heroku config --app=$APP_NAME | sed '1d' | sed 's/:.*$//' | tr " " "\n"`

    check_var() {
      VALUE=`echo $1 | sed 's/ /\'$'\n/g' | sed -n "/^${2}/p"`
      if [ -z $VALUE ];
      then
        echo "$2 - ${yellow}${bold}Fail:${reset}${yellow} does not exist on Heroku.${reset}"
        FAIL=1
      else
        echo "$2 - ${green}OK${reset}"
      fi
    }

    EXPECTED_CONFIG_VARS_ARRAY=("${EXPECTED_CONFIG_VARS}")
    for VAR in ${EXPECTED_CONFIG_VARS[@]}; do
      check_var "$HEROKU_CONFIG_VARS" $VAR
    done

    check_fail "Heroku Config Variables Check"
  fi
fi

# From https://github.com/travis-ci/travis-ci/issues/4704 to fix an issue 
# where Travis errors out if too much information goes on stdout and some
# npm package is blocking stdout.
python -c 'import os,sys,fcntl; flags = fcntl.fcntl(sys.stdout, fcntl.F_GETFL); fcntl.fcntl(sys.stdout, fcntl.F_SETFL, flags&~os.O_NONBLOCK);'

run_cmd() {
  echo "${bold}${cyan}Starting $1 ${reset}"
  eval $2
  check_status $1
}

if [ "$TESTS" = run ];
then
  echo
  echo "${bold}${cyan}============ Linting and Type Checking =============${reset}"
  run_cmd "Python linting" "flake8"
  run_cmd "CSS and SCSS Linting" "npm run css"
  run_cmd "JS Linting" "npm run lint"
  run_cmd "Flow" "npm run flow"

  echo
  echo "${bold}${cyan}===================== Testing ======================${reset}"
  run_cmd "JS Testing" "npm run jest"
  run_cmd "Python Testing" "pytest"
  echo
fi

if [ "$BUILD" = run ];
then
  echo
  echo "${bold}${cyan}==================== Packaging =====================${reset}"
  run_cmd "Packaging" "npm run webpack -- --env.mode=$MODE"
fi


if [ "$DEPLOY" = "deploy" ];
then
  echo "${bold}${cyan}Login to Docker${reset}"
  echo $HEROKU_API_KEY | docker login --username=_ --password-stdin registry.heroku.com
  check_status "Docker Login"

  echo "${bold}${cyan}Building deployment image${reset}"
  cp containers/prod/Dockerfile ./Dockerfile
  docker build -t registry.heroku.com/$APP_NAME/web .
  check_status "Building deployment image"

  echo "${bold}${cyan}Pushing deployment image${reset}"
  docker push registry.heroku.com/$APP_NAME/web
  check_status "Pushing deployment to Heroku"

  echo "${bold}${cyan}Releasing Container${reset}"
  heroku container:release web --app $APP_NAME
  check_status "Releasing container"
fi
