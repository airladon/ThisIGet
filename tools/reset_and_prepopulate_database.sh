#!/usr/bin/env sh

# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

if [ -z $DATABASE_URL ] && [ $1 ];
then
  echo
  echo "${red}${bold}DATABASE_URL not set${reset}"
  echo DATABASE_URL needs to be set if trying to reset a postgress database
  echo
  exit 1
fi



# DATABASE_NAME=thisiget_local
APP_OR_DB_NAME=''
if [ $1 ];
then
  if [ $1 == 'help' ] || [ $1 == '--help' ];
  then
    echo
    echo 'Usage:'
    echo '      reset_and_prepopulate_database.sh [APP_NAME|DATABASE_NAME] [init_flask]'
    echo
    echo 'Resets and prepopulates database at DATABASE_URL. If DATABASE_URL is undefined, then will reset and prepopulate local SQLite db.'
    echo 'Use "init_flask" if you want to remove migrations and reinitialize flask db'
    echo
    exit 1   
  fi
  # DATABASE_NAME=$1
fi

INITIALIZE_FLASK_DB=0
if [ $2 ];
then
  if [ $2 == 'init_flask' ];
  then
    INITIALIZE_FLASK_DB=1
  fi
fi

if [ $1 ];
then
  if [ $1 == 'init_flask' ];
  then
    INITIALIZE_FLASK_DB=1
  else
    APP_OR_DB_NAME=$1
  fi
fi

REMOTE=0
LOCALHOST=`echo $DATABASE_URL | grep localhost`
LOCALDOCKER=`echo $DATABASE_URL | grep docker.internal`
if [ -z $LOCALHOST ] && [ -z $LOCALDOCKER ] && [ $DATABASE_URL ];
then
  REMOTE=1
fi

if [ $LOCALHOST ] || [ $LOCALDOCKER ];
then
  if [ -z APP_OR_DB_NAME ];
  then
    echo "Cannot overwrite a local postgress database without a database name"
    exit 1
  fi
fi

if [ $REMOTE == 1 ];
then
  if [ -z APP_OR_DB_NAME ];
  then
    echo "Cannot overwrite a remote database without an app name"
    exit 1
  fi
  echo
  echo "${yellow}${bold}About to overwrite remote database ${reset}"
  while true; do
    read -p "${yellow}Are you sure you want to continue?${reset} (y/n/c): " ync
    case $ync in
      [Yy]* ) break;;
      [Nn]* ) echo Cancelled; exit 1;;
      [Cc]* ) echo Cancelled; exit 1;;
      * ) echo "Please answer yes or no.";;
    esac
  done

  echo
  echo "${cyan}${bold}==== Checking local environment variables match remote ====${reset}"
  # Check heroku config vars are the same as local
  RESULT=`heroku config --app=$1`
  REMOTE_PEPPER=`echo $RESULT | sed -n 's/.*PEPPER: \([^ ]*\).*/\1/p'`
  REMOTE_AES=`echo $RESULT | sed -n 's/.*AES_KEY: \([^ ]*\).*/\1/p'`
  FAIL=0
  if [ -z $AES_KEY ];
  then
    echo
    echo "${red}Local AES_KEY not defined. Remote and local AES_KEY needs to be the same.${reset}"
  elif [ $REMOTE_AES != $AES_KEY ];
  then
    echo
    echo "${red}Remote and local AES_KEY are differen. They need to be the same.${reset}"
    FAIL=1
  fi
  if [ -z $PEPPER ];
  then
    echo
    echo "${red}Local PEPPER not defined. Remote and local PEPPER needs to be the same.${reset}"
    FAIL=1
  elif [ $REMOTE_PEPPER != $PEPPER ];
  then
    echo
    echo "${red}Remote and local PEPPER are different. They need to be the same${reset}."
    FAIL=1
  fi
  if [ $FAIL = 1 ];
  then
    echo
    exit 1
  fi
  echo "${green}Ok${reset}"
fi

if [ $INITIALIZE_FLASK_DB == 1 ];
then
  echo
  echo "${bold}${cyan}==== Removing Migrations =====${reset} "
  rm -rf migrations
  echo done

  echo
  echo "${bold}${cyan}==== Flask db init =====${reset} "
  flask db init

  echo
  echo "${bold}${cyan}==== Flask db migrate =====${reset} "
  flask db migrate
fi

if [ -z $DATABASE_URL ];
then
  echo
  echo "${bold}${cyan}==== Resetting SQLite Database =====${reset} "
  rm app/app/app.db
fi

if [ $LOCALHOST ] || [ $LOCALDOCKER ];
then
  echo
  echo "${bold}${cyan}==== Resetting Database $APP_OR_DB_NAME =====${reset} "
  psql -c "drop database $DATABASE_NAME"
  psql -c "create database $DATABASE_NAME"
fi

if [ $REMOTE == 1 ];
then
  echo
  echo "${bold}${cyan}==== Resetting Database for $APP_OR_DB_NAME =====${reset} "
  heroku pg:reset -a $APP_OR_DB_NAME
fi

echo
echo "${bold}${cyan}==== Flask db upgrade =====${reset} "
flask db upgrade

echo
echo "${bold}${cyan}==== Loading Lessons =====${reset} "
./updatedb.sh

echo
echo "${bold}${cyan}==== Prepopulating =====${reset} "
python ./tools/prepopulate.py
