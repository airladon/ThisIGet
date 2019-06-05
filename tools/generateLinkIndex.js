const fs = require('fs');
const crypto = require('crypto');
// const path = require('path');
const pathTools = require('../containers/dev/pathTools.js');

function createIndexList() {
  const projectPath = __dirname.split('/').slice(0, -1).join('/');
  const lessonsPath = `${projectPath}/src/Lessons`;
  const versions = pathTools.getAllVersions(lessonsPath);
  let links = [];
  versions.forEach((versionPath) => {
    const versionFile = `${versionPath}/version.js`;
    const lessonPath = versionPath.replace(/^.*\/thisiget\/src/, '').split('/').slice(1, -3).join('/');
    const lessonUID = versionPath.split('/').slice(-3, -2)[0];
    if (lessonUID === 'boilerplate') {
      return;
    }
    const topic = versionPath.split('/').slice(-2, -1)[0];
    const versionUID = versionPath.split('/').slice(-1)[0];
    if (fs.existsSync(versionFile)) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const version = require(`${versionFile}`);
      if (version.links != null) {
        version.links.forEach((link) => {
          /* eslint-disable no-param-reassign */
          link.lessonPath = `/${lessonPath}`;
          link.lessonUID = lessonUID;
          link.topic = topic;
          link.versionUID = versionUID;
          link.hash = crypto.createHash('md5').update(link.url).digest('hex');
          /* eslint-enable */
        });
      }
      if (version.links != null) {
        links = [...links, ...version.links];
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
