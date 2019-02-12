#!/usr/bin/env sh

# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`
normal="\\033[2m"

check_env_exists() {
  echo $1
  echo $2
  echo $3
  echo $4
  if [ !$3 ];
  then
    echo jere
  fi
  # if [ -z $3 ];
  # then
  #   # if [ $1 = "deploy" ];
  #   # then
  #     echo "${bold}${red}$2 environment variable not set${reset}"
  #     FAIL=1
  #   # else 
  #   #   echo "${bold}${yellow}Warning: $2 environment variable not set. $4${reset}"
  #   # fi
  # fi
}

check_env_exists deploy HOME1 $HOME1 'message'
