#!/usr/bin/env sh

URL=''
DB_NAME=thisiget_local
case $1 in
  local ) URL=postgresql://postgres@localhost;;
  docker ) URL=postgresql://postgres@host.docker.internal;;
  * ) URL=postgresql://postgres@host.docker.internal;;
esac
echo
echo export DATABASE_URL=$URL/$DB_NAME
echo export DATABASE_URL=$URL/$DB_NAME | pbcopy
echo
