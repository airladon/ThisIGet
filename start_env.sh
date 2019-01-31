# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

# Default values of variables
DOCKERFILE='Dockerfile_prod'
HOST_PORT=5000
CMD=''
PROJECT_PATH=`pwd`
FAIL=0

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

echo "${bold}${cyan}========== Checking Environment Variables ===========${reset}"
check_env_exists MAIL_PASSWORD "Emails will not be sent by app."
check_env_exists DATABASE_URL "Database will default to local SQLite3."
check_status "Checking environment variables"



if [ $1 ];
then
  DOCKERFILE=Dockerfile_$1
fi

if [ $1 = "prod" ];
then
  HOST_PORT=5000
  CONTAINTER_PORT=4000
  stop_dev_server
fi

if [ $1 = "stage" ];
then
  HOST_PORT=5001
  CONTAINTER_PORT=5000
fi

if [ $1 = "dev" ];
then
  HOST_PORT=5002
  CONTAINTER_PORT=5000
fi

if [ $1 = 'dev-server' ];
  then
  HOST_PORT=5003
  CONTAINTER_PORT=5000
  DOCKERFILE="Dockerfile_dev"
  CMD=/opt/app/dev-server.sh
fi

echo "${bold}${cyan}================= Building container ===================${reset}"
cp containers/$DOCKERFILE Dockerfile

GUNICORN_PORT=4000
docker build \
  --build-arg mail_password=$MAIL_PASSWORD \
  --build-arg database_url=$DATABASE_URL \
  -t devenv-$1 .

rm Dockerfile

# --env-file=$PROJECT_PATH/containers/env.txt \
echo "${bold}${cyan}================= Starting container ===================${reset}"
if [ $1 = 'prod' ];
  then
  docker run -it --rm \
    --name devenv-$1 \
    -p $HOST_PORT:$CONTAINTER_PORT \
    --env PORT=$CONTAINTER_PORT \
    devenv-$1
else
  docker run -it --rm \
    -v $PROJECT_PATH/tests:/opt/app/tests \
    -v $PROJECT_PATH/app:/opt/app/app \
    -v $PROJECT_PATH/src:/opt/app/src \
    -v $PROJECT_PATH/reports:/opt/app/reports \
    -v $PROJECT_PATH/containers/dev/webpack.config.js:/opt/app/webpack.config.js \
    -v $PROJECT_PATH/containers/dev/getLessons.js:/opt/app/getLessons.js \
    -v $PROJECT_PATH/containers/dev/setFilesForBuild.js:/opt/app/setFilesForBuild.js \
    -v $PROJECT_PATH/containers/dev/lessons.js:/opt/app/lessons.js \
    -v $PROJECT_PATH/containers/dev/update_paths.py:/opt/app/update_paths.py \
    -v $PROJECT_PATH/.eslintrc.json:/opt/app/.eslintrc.json \
    -v $PROJECT_PATH/.flake8:/opt/app/.flake8 \
    -v $PROJECT_PATH/.flowconfig:/opt/app/.flowconfig \
    -v $PROJECT_PATH/.babelrc:/opt/app/.babelrc \
    -v $PROJECT_PATH/jest.config.js:/opt/app/jest.config.js \
    -v $PROJECT_PATH/.stylelintrc:/opt/app/.stylelintrc \
    -v $PROJECT_PATH/containers/dev/pytest.ini:/opt/app/pytest.ini \
    --name devenv-$1 \
    -p $HOST_PORT:$CONTAINTER_PORT \
    devenv-$1 $CMD
fi