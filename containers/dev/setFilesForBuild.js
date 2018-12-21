const fs = require('fs');
// const path = require('path');

function setBaseHTML(buildMode) {
  const templates = '/opt/app/app/app/templates/';
  const sourceFileName = `base-${buildMode}.html`;
  const destFileName = 'base.html';
  const sourceFile = `${templates}${sourceFileName}`;
  const destFile = `${templates}${destFileName}`;
  fs.copyFile(sourceFile, destFile, (err) => {
    if (err) throw err;
    console.log(`${sourceFileName} was copied to ${destFileName}`);
  });
}

module.exports = {
  setBaseHTML,
};
