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

heroku config --app=thisiget | \
  sed '1d' | \
  sed 's/ //g' | \
  sed 's/:/="/' | \
  sed 's/^/export /' | \
  sed 's/$/"/'
