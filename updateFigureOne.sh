#!/usr/bin/env sh

FIGURE_ONE_VERSION=`npm show figureone version`
npm install figureone@$FIGURE_ONE_VERSION
MD5=`md5 -q node_modules/figureone/figureone.min.js`
rm app/app/static/figureone.min-*
cp node_modules/figureone/figureone.min.js app/app/static/figureone.min-$MD5.js
cat containers/dev/Dockerfile | sed "s/\(RUN npm install figureone@\).*/\1$FIGURE_ONE_VERSION/" > temp_docker_file
mv temp_docker_file containers/dev/Dockerfile
