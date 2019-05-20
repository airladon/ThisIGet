const fs = require('fs');
const path = require('path');

function walkSync(currentDirPath, fileIdentifier, callback) {
  fs.readdirSync(currentDirPath).forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (Array.isArray(fileIdentifier)) {
        fileIdentifier.forEach((id) => {
          if (id === name) {
            callback(currentDirPath, id);
          }
        });
      } else if (name === fileIdentifier) {
        callback(currentDirPath, fileIdentifier);
      }
    } else if (stat.isDirectory()) {
      walkSync(filePath, fileIdentifier, callback);
    }
  });
}

function getAllVersions(versionsPath) {
  const versions = [];
  walkSync(versionsPath, 'version.js', (versionPath) => {
    versions.push(versionPath);
  });
  return versions;
}

function createIndexList() {
  const projectPath = __dirname.split('/').slice(0, -1).join('/');
  const lessonsPath = `${projectPath}/src/Lessons`;
  const versions = getAllVersions(lessonsPath);
  let links = [];
  versions.forEach((versionPath) => {
    const versionFile = `${versionPath}/version.js`;
    const lessonPath = versionPath.replace(/^.*\/thisiget\/src/, '').split('/').slice(1, -3).join('/');
    const lessonUID = versionPath.split('/').slice(-3, -2)[0];
    const topic = versionPath.split('/').slice(-2, -1)[0];
    const versionUID = versionPath.split('/').slice(-1)[0];
    if (fs.existsSync(versionFile)) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const version = require(`${versionFile}`);
      if (version.details.links != null) {
        version.details.links.forEach((link) => {
          /* eslint-disable no-param-reassign */
          link.lessonPath = `/${lessonPath}`;
          link.lessonUID = lessonUID;
          link.topic = topic;
          link.versionUID = versionUID;
          /* eslint-enable */
        });
      }
      if (version.details.links != null) {
        links = [...links, ...version.details.links];
      }
    }
  });
  fs.writeFileSync(`${__dirname}/link_index.json`, JSON.stringify(links, null, 2), (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
}

createIndexList();
