#!/bin/bash

# Setup colors and text formatting
red=`tput setaf 1`
green=`tput setaf 2`
cyan=`tput setaf 6`
yellow=`tput setaf 3`
bold=`tput bold`
reset=`tput sgr0`

PROJECT_PATH=`pwd`

echo
echo "${bold}${cyan}================= Building container ===================${reset}"
cp containers/Dockerfile_dev Dockerfile

docker build -t devenv-builder .

rm Dockerfile

echo
echo "${bold}${cyan}================= Starting container ===================${reset}"
docker run -it --rm \
    -v $PROJECT_PATH/tests:/opt/app/tests \
    -v $PROJECT_PATH/app:/opt/app/app \
    -v $PROJECT_PATH/src:/opt/app/src \
    -v $PROJECT_PATH/migrations:/opt/app/migrations \
    -v $PROJECT_PATH/reports:/opt/app/reports \
    -v $PROJECT_PATH/containers:/opt/app/containers \
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
    -v $PROJECT_PATH/containers/dev/build.sh:/opt/app/build.sh \
    -v $PROJECT_PATH/containers/dev/pytest.ini:/opt/app/pytest.ini \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --env-file=$PROJECT_PATH/containers/env.txt \
    --name devenv-builder \
    --entrypoint "/opt/app/build.sh" \
    devenv-builder \
    deploy dev
