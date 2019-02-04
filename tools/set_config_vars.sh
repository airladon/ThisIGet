#!/usr/bin/env sh

# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`


export SECRET_KEY=`python tools/generate_secret_key.py`
exit 1


# Check number of arguments
if [ -z $1 ] || [ -z $2 ];
then
  echo ''
  echo 'usage:'
  echo '      set_config_vars WHICH_VARS APP_NAME '
  echo ''
  echo 'where WHICH_VARS can be:'
  echo '  - existing: use existing environment variables'
  echo '  - new: generate new config vars and save as local environment variables'
  echo '  - unset: unset existing local config var environment variables'
  echo ''
  exit 1
fi

# Check argument one is correct
if [ $1 != new ] && [ $1 != unset ] && [ $1 != existing ];
then
  echo ''
  echo "'$1' is not a valid first argument. Must be 'new', 'existing' or 'unset'"
  echo ''
  exit 1
fi


# Check app exists
RESULT=`heroku apps | grep ^$2$ | wc -l | sed 's/ //g'`
if [ $RESULT != 1 ];
then
  echo ''
  echo "Heroku app '$2' doesn't exist"
  echo ''
  exit 1
fi

# Check Mail environment variables exist
check_env_exists() {
  if [ -z ${!1} ];
  then
    echo "${bold}${yellow}Warning: $1 environment variable not set. $2${reset}"
    FAIL=1
  fi
}

check_env_exists MAIL_SERVER
check_env_exists MAIL_USERNAME
check_env_exists MAIL_PASSWORD
check_env_exists MAIL_SENDER
FAIL=0

if [ $1 == 'existing' ];
then
  check_env_exists AES_KEY
  check_env_exists SECRET_KEY
  check_env_exists PEPPER
  if [ $FAIL == 1 ];
  then
    exit 1
  fi
fi

if [ $1 == 'new' ];
then
  export AES_KEY=`python tools/generate_aes_key.py`
fi


# if [ $1 == 'new' ];
# then
#   export SECRET_KEY=`python tools/generate_secret_key`
#   heroku config:set SECRET_KEY=$SECRET_KEY --app=$2
# fi

# if [ $1 == 'reset' ];
# then
#   unset SECRET_KEY
# fi


