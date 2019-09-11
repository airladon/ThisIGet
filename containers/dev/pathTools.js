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

function getAllPaths(
  topicsPath,
  prodPaths,
  devPaths,
  buildMode,
) {
  const topics = [];
  let fileId = prodPaths;
  if (buildMode === 'development') {
    fileId = [...prodPaths, ...devPaths];
  }
  walkSync(topicsPath, fileId, (topicPath, fileName) => {
    if (!topicPath.includes('boilerplate')) {
      topics.push({ path: topicPath, name: fileName });
    }
  });
  return topics;
}

function getAllTopics(topicsPath) {
  const topics = [];
  walkSync(topicsPath, 'details.js', (topicPath) => {
    if (!topicPath.includes('boilerplate')) {
      topics.push(topicPath);
    }
  });
  return topics;
}

function getAllVersions(versionsPath) {
  const versions = [];
  walkSync(versionsPath, 'version.js', (versionPath) => {
    versions.push(versionPath);
  });
  return versions;
}

module.exports = {
  walkSync, getAllTopics, getAllVersions, getAllPaths,
};
