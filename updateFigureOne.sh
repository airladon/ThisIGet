#!/usr/bin/env sh

FIGURE_ONE_VERSION=`npm show figureone version`
npm install figureone@$FIGURE_ONE_VERSION
cp node_modules/figureone/figureone.min.js app/app/static
cat containers/Dockerfile_dev | sed "s/\(RUN npm install figureone@\).*/\1$FIGURE_ONE_VERSION/" > temp
mv temp containers/Dockerfile_dev
