#!/usr/bin/env sh

# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

if [ -z $DATABASE_URL ];
then
  echo DATABASE_URL not set
  exit 1
fi

DATABASE_NAME=thisiget_local
if [ $1 ];
then
  DATABASE_NAME=$1
fi

echo $DATABASE_URL
echo "postgresql://postgres@localhost/$DATABASE_NAME"
REMOTE=1
if [ $DATABASE_URL = "postgresql://postgres@localhost/$DATABASE_NAME" ];
then
  REMOTE=0
fi
if [ $DATABASE_URL = "postgresql://postgres@host.docker.internal/$DATABASE_NAME" ];
then
  REMOTE=0
fi

if [ $REMOTE == 1 ];
then
  echo "${yellow}About to overwrite remote database ${reset}"
  echo "You need to have already reset the database"
  while true; do
    read -p "${yellow}Are you sure you want to continue?${reset} (y/n/c): " ync
    case $ync in
      [Yy]* ) break;;
      [Nn]* ) echo Cancelled; exit 1;;
      [Cc]* ) echo Cancelled; exit 1;;
      * ) echo "Please answer yes or no.";;
    esac
  done
fi

if [ $REMOTE == 0 ];
then
  echo
  echo "${bold}${cyan}==== Resetting Database =====${reset} "
  psql -c "drop database $DATABASE_NAME"
  psql -c "create database $DATABASE_NAME"
fi
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

echo
echo "${bold}${cyan}==== Flask db upgrade =====${reset} "
flask db upgrade

echo
echo "${bold}${cyan}==== Loading Lessons =====${reset} "
python ./tools/update_lessons_db.py

echo
echo "${bold}${cyan}==== Prepopulating =====${reset} "
python ./tools/prepopulate.py
