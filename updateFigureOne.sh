#!/usr/bin/env sh

FIGURE_ONE_VERSION=`npm show figureone version`
npm install figureone@$FIGURE_ONE_VERSION
MD5=`md5 -q node_modules/figureone/figureone.min.js`
cp node_modules/figureone/figureone.min.js app/app/static/figureone.min-$MD5.js
cat containers/Dockerfile_dev | sed "s/\(RUN npm install figureone@\).*/\1$FIGURE_ONE_VERSION/" > temp
mv temp containers/Dockerfile_dev
