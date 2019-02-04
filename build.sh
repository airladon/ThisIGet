#!/usr/bin/env sh

# Use:
#   ./build.sh dev              Lint, test and build dev version of app
#   ./build.sh stage            Lint, test and build stage version of app
#   ./build.sh prod             Lint, test and build prod version of app
#   ./build.sh prod deploy      Lint, test, build and deploy
# 
# NB: Deploying will only work if on branch master or release-candidate

MODE=prod
DEPLOY=no_deploy
RUN_TESTS=yes
HOST_PATH=`pwd`
HEROKU_APP_NAME=itgeti              # Production app name on Heroku
HEROKU_DEV_APP_NAME=itgetidev       # Dev app name on Heroku
HEROKU_TEST_APP_NAME=itgetitest     # Dev app name on Heroku
DEPLOY_PROD_BRANCH=master           # Branch to test and deploy to prod
DEPLOY_DEV_BRANCH=release-candidate # Branch to test and deploy to dev
TRAVIS_DEBUG_BRANCH=travis          # Branch for fast travis debug

# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

# If pull requesting to master, check that it is coming from release-candidate
# branch only. If not, fail the build.
if [ $TRAVIS_PULL_REQUEST ];
  then
  if [ "$TRAVIS_PULL_REQUEST" != "false" ];
    then
    if [ $TRAVIS_BRANCH = $DEPLOY_PROD_BRANCH -a $TRAVIS_PULL_REQUEST_BRANCH != $DEPLOY_DEV_BRANCH ];
      then
      echo "Tried to merge branch${bold}${red}" $TRAVIS_PULL_REQUEST_BRANCH "${reset}into${bold}${cyan}" $DEPLOY_PROD_BRANCH "${reset}"
      echo "Can only merge branch${bold}${cyan}" $DEPLOY_DEV_BRANCH "${reset}into${bold}${cyan}" $DEPLOY_PROD_BRANCH
      echo "${bold}${red}Build Failed.${reset}"
      exit 1
    fi
  fi
fi

# Get the current branch - if it is not yet defined, then get it from git.
# Note, that this git command will not work in a Heroku Environment, so BRANCH
# already be set as env variable before calling this script on Heroku.
if [ -z "${BRANCH}" ];
  then
  BRANCH=`git rev-parse --abbrev-ref HEAD`
fi

# Check first command line argument to see how to build javascript
if [ $1 = "dev" ];
then
  MODE=dev
fi

if [ $1 = "stage" ];
then
  MODE=stage
fi

if [ $2 ];
then
  if [ $2 = "deploy" ];
  then
    DEPLOY=deploy

  fi
fi

if [ $4 ];
then
  if [ $4 = "skip-tests" ];
  then
    RUN_TESTS=no
  fi
fi

# From https://github.com/travis-ci/travis-ci/issues/4704 to fix an issue 
# where Travis errors out if too much information goes on stdout and some
# npm package is blocking stdout.
python -c 'import os,sys,fcntl; flags = fcntl.fcntl(sys.stdout, fcntl.F_GETFL); fcntl.fcntl(sys.stdout, fcntl.F_SETFL, flags&~os.O_NONBLOCK);'

# Run a container while binding the appropriate volumes
docker_run() {
  echo "${bold}${cyan}" $1 "Starting${reset}"
  if [ $3 ];
    then
    docker run -it --rm \
      -v $HOST_PATH/app:/opt/app/app \
      -v $HOST_PATH/tests:/opt/app/tests \
      -v $HOST_PATH/src:/opt/app/src \
      --name devbuild \
      --entrypoint $2 \
      devbuild \
      -c $3 $4 $5 $6
    else
    docker run -it --rm \
      -v $HOST_PATH/app:/opt/app/app \
      -v $HOST_PATH/tests:/opt/app/tests \
      -v $HOST_PATH/src:/opt/app/src \
      --name devbuild \
      --entrypoint $2 \
      devbuild
  fi

  if [ $? != 0 ];
    then
    echo "${bold}${cyan}" $1 "${bold}${red}Failed${reset}"
    echo
    FAIL=1
    else
    echo "${bold}${cyan}" $1 "${bold}${green}Succeeded${reset}"
    echo
  fi
}

docker_run_cmd() {
  echo "${bold}${cyan}" $1 "Starting${reset}"
  docker run -it --rm \
    -v $HOST_PATH/app:/opt/app/app \
    -v $HOST_PATH/tests:/opt/app/tests \
    -v $HOST_PATH/src:/opt/app/src \
    --name devbuild \
    devbuild \
    $2

  if [ $? != 0 ];
    then
    echo "${bold}${cyan}" $1 "${bold}${red}Failed${reset}"
    echo
    FAIL=1
    else
    echo "${bold}${cyan}" $1 "${bold}${green}Succeeded${reset}"
    echo
  fi
}

# Check current build status and exit if in failure state
check_status() {
  if [ $FAIL != 0 ];
    then
    echo "${bold}${red}Build failed at${bold}${cyan}" $1 "${reset}"
    exit 1    
  fi
}

# Check environment variables
# $1: Deploy variable - can be "deploy" or "no_deploy"
# $2: ENV name
check_env_exists() {
  if [ -z ${!2} ];
  then
    if [ $1 = "deploy" ];
    then
      echo "${bold}${red}$2 environment variable not set${reset}"
      FAIL=1
    else 
      echo "${bold}${yellow}Warning: $2 environment variable not set. $3${reset}"
    fi
  fi
}

FAIL=0

echo "${bold}${cyan}========== Checking Environment Variables ===========${reset}"
# check_env_exists $DEPLOY MAIL_PASSWORD "Emails will not be sent by app."
# check_env_exists $DEPLOY DATABASE_URL "Database will default to local SQLite3."
check_env_exists $DEPLOY HEROKU_TOKEN "This is needed to deploy to Heroku."
check_status "Checking environment variables"
echo "Environment variable checking complete"

if [ $RUN_TESTS = "yes" ];
then
  # Build docker image
  echo "${bold}${cyan}================= Building Image ===================${reset}"
  cp containers/Dockerfile_dev Dockerfile
  docker build -t devbuild .
  rm Dockerfile

  # Lint and type check
  echo "${bold}${cyan}============ Linting and Type Checking =============${reset}"
  docker_run_cmd "Python Linting" "/opt/app/start.sh flake8"
  check_status "Linting and Type Checking"
  docker_run "JS Linting" npm run lint
  docker_run "CSS and SCSS Linting" npm run css
  docker_run "Flow" npm run flow
  check_status "Linting and Type Checking"

  # Test
  echo "${bold}${cyan}===================== Testing ======================${reset}"
  docker_run "JS Testing" npm run jest
  docker_run_cmd "Python Testing" "/opt/app/start.sh pytest"
  check_status "Tests"
  if [ $IN_TRAVIS ];
    then
    sudo rm -rf tests/__pycache__
  fi

  # Package
  echo "${bold}${cyan}==================== Packaging =====================${reset}"
  docker_run "Packaging" npm run webpack -- --env.mode=$MODE
  check_status "Building"
fi

# Deploy to:
#   Production if branch is master
#   Dev if branch is release-candidate
echo $2
if [ $2 = "deploy" ];
then
  APP_NAME=''
  TITLE_STRING=''
  if [ $BRANCH = $DEPLOY_PROD_BRANCH ];
    then
    APP_NAME=$HEROKU_APP_NAME
    TITLE_STRING='============= Deploying to Production =============='
  fi
  if [ $BRANCH = $DEPLOY_DEV_BRANCH ];
    then
    APP_NAME=$HEROKU_DEV_APP_NAME
    TITLE_STRING='================= Deploying to Dev ================='
  fi
  if [ $BRANCH = $TRAVIS_DEBUG_BRANCH ];
    then
    APP_NAME=$HEROKU_TEST_APP_NAME
    TITLE_STRING='================= Deploying to Test ================='
  fi
  if [ $3 ];
    then
    if [ $3 = "test" ];
      then
      APP_NAME=$HEROKU_TEST_APP_NAME;
      TITLE_STRING='================= Deploying to Test ================='
    fi
  fi
  if [ $APP_NAME ];
    then
    # first check the heroku app has the required config vars already set
    echo "${bold}${cyan}==== Checking Heroku Config Vars Exist ${reset} ====="
    EXPECTED_CONFIG_VARS[0]=MAIL_SERVER
    EXPECTED_CONFIG_VARS[1]=SECRET_KEY
    EXPECTED_CONFIG_VARS[2]=MAIL_USERNAME
    EXPECTED_CONFIG_VARS[3]=MAIL_SENDER
    EXPECTED_CONFIG_VARS[4]=AES_KEY
    EXPECTED_CONFIG_VARS[5]=PEPPER1

    HEROKU_CONFIG_VARS=`heroku config --app=$APP_NAME | sed '1d' | sed 's/:.*$//' | tr " " "\n"`

    check_var() {
      VALUE=`echo $1 | sed 's/ /\'$'\n/g' | sed -n "/^${2}/p"`
      if [ -z $VALUE ];
      then
        echo "Checking $2 - ${yellow}${bold}Fail - does not exist on Heroku.${reset}"
        FAIL=1
        NO_VAR=1
      fi
    }

    EXPECTED_CONFIG_VARS_ARRAY=(${EXPECTED_CONFIG_VARS})
    for VAR in ${EXPECTED_CONFIG_VARS[@]}; do
      # echo "Checking " $VAR
      NO_VAR=0
      check_var "$HEROKU_CONFIG_VARS" $VAR
      if [ NO_VAR == 0 ];
      then
        echo "Checking $VAR - ${green}OK${reset}"
      fi
    done

    check_status "Config Vars Check"

    echo "${bold}${cyan}" $TITLE_STRING "${reset}"
    docker login --username=_ --password=$HEROKU_TOKEN registry.heroku.com
    cp containers/Dockerfile_prod ./Dockerfile
    echo "${bold}${cyan}Building deployment image${reset}"
    docker build -t registry.heroku.com/$APP_NAME/web .
    echo "${bold}${cyan}Pushing deployment image${reset}"
    docker push registry.heroku.com/$APP_NAME/web
    if [ $IN_TRAVIS ];
      then
        /usr/local/bin/heroku container:release web --app $APP_NAME
      else
        heroku container:release web --app $APP_NAME
    fi
    if [ $? != 0 ];
      then
      echo "${bold}${cyan}" Deployment "${bold}${red}Failed${reset}"
      exit 1
      else
      echo "${bold}${cyan}" Deployment "${bold}${green}Succeeded${reset}"
    fi
  fi
fi
