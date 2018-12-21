DOCKERFILE='Dockerfile_prod'
HOST_PORT=5000
CMD=''
PROJECT_PATH=`pwd`

stop_dev_server() {
  SERVER_RUNNING=`docker ps --format {{.Names}} \
                | grep devenv-dev-server`
  if [ $SERVER_RUNNING ];
    then
    echo Dev server container is running - stopping...
    docker stop devenv-dev-server
  fi
}

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

cp containers/$DOCKERFILE Dockerfile

GUNICORN_PORT=4000
docker build -t devenv-$1 .

rm Dockerfile

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