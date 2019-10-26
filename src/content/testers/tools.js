/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';

const path = require('path');
const fs = require('fs');

function joinObjects(...objects) {
  const assignObjectFromTo = (fromObject, toObject) => {
    Object.keys(fromObject).forEach((key) => {
      const value = fromObject[key];
      if (typeof value === 'number'
        || typeof value === 'boolean'
        || typeof value === 'string'
        || value == null
        || typeof value === 'function'
        || typeof value._dup === 'function'
        || Array.isArray(value)
      ) {
        // console.log(value, toObject[key])
        if (value !== undefined || toObject[key] === undefined) {
          // eslint-disable-next-line no-param-reassign
          toObject[key] = value;
        }
      } else {
        const toValue = toObject[key];
        if (typeof toValue === 'number'
          || typeof toValue === 'boolean'
          || typeof toValue === 'string'
          || toValue == null
          || typeof toValue === 'function'
          || Array.isArray(toValue)
        ) {
          // eslint-disable-next-line no-param-reassign
          toObject[key] = {};
        }
        assignObjectFromTo(value, toObject[key]);
      }
    });
  };

  const num = objects.length;
  const out = objects[0];
  for (let i = 1; i < num; i += 1) {
    const o = objects[i];
    if (o != null) {
      assignObjectFromTo(o, out);
    }
  }
  return out;
}

function writeImage(image, imagePath) {
  const folder = path.dirname(imagePath);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  fs.writeFile(imagePath, image, (err) => {
    if (err) {
      // eslint-disable-next-line
      console.log(err);
    }
  });
}

function cleanReplacementFolder(callingScriptPath) {
  const deleteFolderRecursive = (folderPath) => {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach((file) => {
        const curPath = path.join(folderPath, file);
        if (fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(folderPath);
    }
  };
  const folder = `${path.join(callingScriptPath, '__image_snapshots__', '__replacements__')}`;
  deleteFolderRecursive(folder);
  return folder;
}

function getReplacementsFolder(callingScriptPath) {
  return `${path.join(callingScriptPath, '__image_snapshots__', '__replacements__')}`;
}

export {
  writeImage, joinObjects, cleanReplacementFolder, getReplacementsFolder,
};
