#!/usr/bin/env sh

# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

# Check number of arguments
if [ -z $1 ];
then
  echo ''
  echo 'usage:'
  echo '      set_config_vars HEROKU_APP_NAME '
  echo ''
  exit 1
fi


# Check app exists
RESULT=`heroku apps | grep ^$1$ | wc -l | sed 's/ //g'`
if [ $RESULT != 1 ];
then
  echo ''
  echo "Heroku app '$1' doesn't exist"
  echo ''
  exit 1
fi

# Check environment variables exist
set_env() {
  if [ -z ${!2} ];
  then
    echo "${bold}${yellow}Warning: $2 environment variable not set.{reset}"
    FAIL=1
  else
    VALUE=`heroku config:get $2 --app=$1`
    if [ $VALUE != ${!2} ];
    then
      echo Changing value of $2 from $VALUE to ${!2}
      while true; do
        read -p "Are you sure you want to overwrite?" ync
        case $ync in
          [Yy]* ) heroku config:set $2=${!2} --app=$1; break;;
          [Nn]* ) echo No changes to $2.; break;;
          [Cc]* ) echo Cancelled; exit 1;;
          * ) echo "Please answer yes or no.";;
        esac
      done
    else
      echo No changes to $2 as it is the same as local.
    fi
    
  fi
}

set_env $1 MAIL_SERVER
set_env $1 SECRET_KEY
set_env $1 MAIL_USERNAME
set_env $1 MAIL_PASSWORD
set_env $1 MAIL_SENDER
set_env $1 AES_KEY
set_env $1 PEPPER
