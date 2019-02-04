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

# Get Config Vars:
CONFIG_VARS=`heroku config --app=$1 | sed "1d" | sed 's/ //g' | sed 's/:/=/g'`

# Check environment variables exist
CHANGES=""
set_env() {
  # echo $1
  # echo $2
  # echo $3
  echo
  echo "${bold}${cyan}$3${reset}"
  sleep 0.2s
  if [ -z ${!3} ];
  then
    echo "${bold}${yellow}Warning: ${red}$3 ${yellow}environment variable not set.${reset}"
    FAIL=1
  else
    VALUE=`echo $2 | sed 's/ /\'$'\n/g' | sed -n "/^${3}/p" | sed 's/^.*=//'`
    if [ $VALUE != ${!3} ];
    then
      echo "${yellow}Changing value on Heroku${reset}"
      echo "  from: $VALUE"
      echo "  to:   ${!3}"
      while true; do
        read -p "${yellow}Are you sure you want to change?${reset} (y/n/c): " ync
        case $ync in
          # [Yy]* ) heroku config:set $2=${!2} --app=$1; break;;
          [Yy]* ) CHANGES="$CHANGES $3=${!3}"; CHANGES="$CHANGES OLD_$3=$VALUE"; break;;
          [Nn]* ) echo No changes to $3.; break;;
          [Cc]* ) echo Cancelled; exit 1;;
          * ) echo "Please answer yes or no.";;
        esac
      done
    else
      echo No changes as Heroku config var value is same as local environment variable.
    fi
  fi
  sleep 0.2s
}

set_env $1 "$CONFIG_VARS" MAIL_SERVER
set_env $1 "$CONFIG_VARS" SECRET_KEY
set_env $1 "$CONFIG_VARS" MAIL_USERNAME
set_env $1 "$CONFIG_VARS" MAIL_PASSWORD
set_env $1 "$CONFIG_VARS" MAIL_SENDER
set_env $1 "$CONFIG_VARS" AES_KEY
set_env $1 "$CONFIG_VARS" PEPPER

if [ -z $CHANGES ];
then
  exit 1
fi

if [ $1 == thisiget ] || [ $1 == thisiget-beta ];
then
  echo
  echo "${bold}${yellow}================================================${reset}"
  echo "${bold}${yellow}WARNING${reset}"
  echo "${bold}${yellow}================================================${reset}"
  echo "${yellow}About to change the production app ${bold}$1${reset}."
  echo
  echo "Existing hash and encrypted database entries might not be readable if database hasn't been updated to these changes"
  echo
  
  while true; do
    read -p "${yellow}If you are sure you want to change, then type the app name ${bold}$1${reset}${yellow}. If not, type ${bold}c${reset}${yellow} or ${bold}n${reset}${yellow} to cancel: ${reset}" ync
    case $ync in
      # [Yy]* ) heroku config:set $2=${!2} --app=$1; break;;
      # [Yy]* ) heroku config:set $CHANGES --app=$1; break;;
      $1 ) heroku config:set $CHANGES --app=$1; break;;
      [Nn]* ) echo Cancelled; echo; exit 1;;
      [Cc]* ) echo Cancelled; echo; exit 1;;
      * ) echo "Please type ${bold}n${reset}, ${bold}c${reset} or ${bold}$1${reset}";;
    esac
  done
fi

