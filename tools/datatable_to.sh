#!/usr/bin/env sh

URL=URL=postgresql://postgres@host.docker.internal
DB_NAME=thisiget_local
if [ $1 ];
then
  case $1 in
    local ) URL=postgresql://postgres@localhost;;
    docker ) URL=postgresql://postgres@host.docker.internal;;
    * ) URL=`heroku config:get DATABASE_URL --app=$1`;;
  esac
fi
echo
echo export DATABASE_URL=$URL/$DB_NAME
echo export DATABASE_URL=$URL/$DB_NAME | pbcopy
echo
