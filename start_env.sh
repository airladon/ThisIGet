#!/bin/bash

# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

# Default values of variables
DOCKERFILE='prod/Dockerfile'
HOST_PORT=5000
CMD=''
FAIL=0

LOCAL_PROJECT_PATH=`pwd`
if [ $HOST_PATH ];
then
  PROJECT_PATH=$HOST_PATH
else
  PROJECT_PATH=`pwd`
fi

stop_dev_server() {
  SERVER_RUNNING=`docker ps --format {{.Names}} \
                | grep devenv-dev-server`
  if [ $SERVER_RUNNING ];
    then
    echo Dev server container is running - stopping...
    docker stop devenv-dev-server
  fi
}

# Check environment variables
# $1: Deploy variable - can be "deploy" or "no_deploy"
# $2: ENV name
check_env_exists() {
  if [ -z ${!1} ];
  then
    echo "${bold}${yellow}Warning: $1 environment variable not set. $2${reset}"
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

if [ "$1" != pupp ];
then
  echo
  echo "${bold}${cyan}============ Checking Environment Variables ============${reset}"
  check_env_exists MAIL_SERVER "Emails will not be sent by app."
  check_env_exists MAIL_USERNAME "Emails will not be sent by app."
  check_env_exists MAIL_PASSWORD "Emails will not be sent by app."
  check_env_exists MAIL_SENDER "Emails will not be sent by app."
  check_env_exists DATABASE_URL "Database will default to local SQLite3."
  check_status "Checking environment variables"
  echo "Environment variable checking complete"
fi


if [ $1 ];
then
  DOCKERFILE=$1/Dockerfile
fi

if [ "$1" = "prod" ];
then
  HOST_PORT=5000
  CONTAINER_PORT=4000
  stop_dev_server
  DOCKERFILE="prod/Dockerfile"
fi

if [ "$1" = "stage" ];
then
  HOST_PORT=5001
  CONTAINER_PORT=5000
  DOCKERFILE="stage/Dockerfile"
fi

if [ "$1" = "dev" ];
then
  HOST_PORT=5002
  CONTAINER_PORT=5000
  DOCKERFILE="dev/Dockerfile"
fi

if [ "$1" = "pupp" ];
then
  CONTAINER_PORT=5000
  DOCKERFILE="pupp/Dockerfile"
fi

if [ "$1" = 'dev-server' ];
then
  HOST_PORT=5003
  CONTAINER_PORT=5000
  DOCKERFILE="dev/Dockerfile"
  CMD=/opt/app/dev-server.sh
fi

if [ "$1" = 'deploy_pipeline' ];
then
  HOST_PORT=5004
  CONTAINER_PORT=5000
  CMD="/opt/app/deploy_pipeline.sh"
  DOCKERFILE="dev/Dockerfile"
fi


if [ "$1" != "pupp" ];
then
  echo
  echo "${bold}${cyan}================= Building container ===================${reset}"
  cp containers/$DOCKERFILE Dockerfile

  cp containers/$DOCKERFILE DockerfileTemp
  # set user id of new user in production container to the same user id of the 
  # user calling the container so permissions of files work out ok
  DOCKER_GROUP_ID=`grep -e '^host-docker:' /etc/group | sed 's/[^:]*:[^:]*:\([0-9]*\).*/\1/'`
  if [ -z "$DOCKER_GROUP_ID" ];
  then
    DOCKER_GROUP_ID=`ls -n /var/run/docker.sock | sed "s/[^ ]* *[^ ]* *\([^ ]*\).*/\1/"`
  fi
  HOST_USER_GROUP_ID=`id -g`
  HOST_USER_ID=`id -u`

  sed "s/HOST_USER_ID/${HOST_USER_ID}/;s/HOST_USER_GROUP_ID/${HOST_USER_GROUP_ID}/;s/DOCKER_GROUP_ID/${DOCKER_GROUP_ID}/" < DockerfileTemp > Dockerfile 
  rm DockerfileTemp

  GUNICORN_PORT=4000
  docker build -t "devenv-$1" .
  rm Dockerfile
fi

# --env-file=$PROJECT_PATH/containers/env.txt \
echo
echo "${bold}${cyan}================= Starting container ===================${reset}"
if [ "$1" = 'prod' ];
then
  docker run -it --rm \
    --name "devenv-$1" \
    -p $HOST_PORT:$CONTAINER_PORT \
    --env PORT=$CONTAINER_PORT \
    --env-file=$PROJECT_PATH/containers/env.txt \
    "devenv-$1"
elif [ "$1" = 'pupp' ];
then
  docker run -it --rm \
    --name "devenv-$1" \
    -p $HOST_PORT:$CONTAINER_PORT \
    --env PORT=$CONTAINER_PORT \
    -v $PROJECT_PATH/tests/browser:/home/pptruser/tests \
    -v $PROJECT_PATH/containers/pupp/jest.config.js:/home/pptruser/jest.config.js \
    -v $PROJECT_PATH/containers/pupp/jest-puppeteer.config.js:/home/pptruser/jest-puppeteer.config.js \
    -v $PROJECT_PATH/.babelrc:/home/pptruser/.babelrc \
    airladon/pynode:python3.7.3-node12.1.0-npm6.9.0-puppeteer \
    bash
else
  # docker volume create browser-tests
  # docker run 
  docker run -it --rm \
    -v $PROJECT_PATH/containers:/opt/app/containers \
    -v $PROJECT_PATH/webpack:/opt/app/webpack \
    -v $PROJECT_PATH/tools:/opt/app/tools \
    -v $PROJECT_PATH/containers/dev/browser_test.sh:/opt/app/browser_test.sh \
    -v $PROJECT_PATH/containers/dev/browser_test_diff_master.py:/opt/app/browser_test_diff_master.py \
    -v $PROJECT_PATH/.git:/opt/app/.git \
    -v $PROJECT_PATH/containers/dev/ratings_test.sh:/opt/app/ratings_test.sh \
    -v $PROJECT_PATH/containers/dev/create_site_map.py:/opt/app/create_site_map.py \
    -v $PROJECT_PATH/containers/dev/create_site_hashes.py:/opt/app/create_site_hashes.py \
    -v $PROJECT_PATH/containers/dev/setFilesForBuild.js:/opt/app/setFilesForBuild.js \
    -v $PROJECT_PATH/tests:/opt/app/tests \
    -v $PROJECT_PATH/app:/opt/app/app \
    -v $PROJECT_PATH/src:/opt/app/src \
    -v $PROJECT_PATH/migrations:/opt/app/migrations \
    -v $PROJECT_PATH/reports:/opt/app/reports \
    -v $PROJECT_PATH/build.sh:/opt/app/build.sh \
    -v $PROJECT_PATH/deploy_pipeline.sh:/opt/app/deploy_pipeline.sh \
    -v $PROJECT_PATH/dev-server.sh:/opt/app/dev-server.sh \
    -v $PROJECT_PATH/.babelrc:/opt/app/.babelrc \
    -v $PROJECT_PATH/.eslintignore:/opt/app/.eslintignore \
    -v $PROJECT_PATH/.eslintrc.json:/opt/app/.eslintrc.json \
    -v $PROJECT_PATH/.flake8:/opt/app/.flake8 \
    -v $PROJECT_PATH/.flowconfig:/opt/app/.flowconfig \
    -v $PROJECT_PATH/.stylelintignore:/opt/app/.stylelintignore \
    -v $PROJECT_PATH/.stylelintrc:/opt/app/.stylelintrc \
    -v $PROJECT_PATH/jest.config.js:/opt/app/jest.config.js \
    -v $PROJECT_PATH/jest.index.config.js:/opt/app/jest.index.config.js \
    -v $PROJECT_PATH/pytest.ini:/opt/app/pytest.ini \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --env-file=$LOCAL_PROJECT_PATH/containers/env.txt \
    -e HOST_PATH=$PROJECT_PATH \
    --name "devenv-$1" \
    -p $HOST_PORT:$CONTAINER_PORT \
    "devenv-$1" $CMD
fi

# -v $PROJECT_PATH/containers/dev/update_paths.py:/opt/app/update_paths.py \
# -v $PROJECT_PATH/containers/dev/webpack.config.js:/opt/app/webpack.config.js \
# -v $PROJECT_PATH/containers/dev/math-loader.js:/opt/app/math-loader.js \
# -v $PROJECT_PATH/containers/dev/quiz-loader.js:/opt/app/quiz-loader.js \
# -v $PROJECT_PATH/containers/dev/link-loader.js:/opt/app/link-loader.js \
# -v $PROJECT_PATH/containers/dev/post-markdown-loader.js:/opt/app/post-markdown-loader.js \
# -v $PROJECT_PATH/containers/dev/flaskReloaderPlugin.js:/opt/app/flaskReloaderPlugin.js \
# -v $PROJECT_PATH/containers/dev/pathTools.js:/opt/app/pathTools.js \
# -v $PROJECT_PATH/containers/dev/createIndex.js:/opt/app/createIndex.js \
# -v $PROJECT_PATH/containers/dev/getContent.js:/opt/app/getContent.js \
# -v $PROJECT_PATH/containers/dev/getContent.test.js:/opt/app/getContent.test.js \