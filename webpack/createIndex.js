const fs = require('fs');
const path = require('path');
const pathTools = require('./pathTools.js');

function createTopicIndex(buildMode, topicsPath, appPath) {
  const topics = pathTools.getAllTopics(topicsPath);
  const outObj = {};
  const appObj = {};
  topics.forEach((topicPath) => {
    const splitLessonPath = topicPath.split('/');
    // const parentPath = splitLessonPath.slice(1, -1).join('/');
    const uid = splitLessonPath.slice(-(splitLessonPath.length - 2)).join('/');
    // const topicUid = splitLessonPath.slice(-1)[0];

    const absoluteDetailsPath = `${process.cwd()}/${topicPath}/details.js`;
    const detailsPathRelativeToCWD = path.relative(process.cwd(), absoluteDetailsPath);
    const detailsPathRelativeToThisFile = `./${path.relative(__dirname, absoluteDetailsPath)}`;

    let title = '';
    let dependencies = [];
    let enabled = true;
    if (fs.existsSync(detailsPathRelativeToCWD)) {
      /* eslint-disable global-require, import/no-dynamic-require */
      // $FlowFixMe
      const details = require(detailsPathRelativeToThisFile);
      /* eslint-enable */
      ({ title } = details);
      ({ dependencies } = details);
      ({ enabled } = details);
      if (enabled != null && enabled === false) {
        enabled = false;
      } else {
        enabled = true;
      }
    }
    if (title !== '') {
      outObj[uid] = {
        title: `${title.replace(/'/, '\\\'')}`,
        approaches: {},
      };
      appObj[uid] = {
        title: `${title.replace(/'/, '\\\'')}`,
        approaches: {},
      };
      const versions = pathTools.getAllVersions(topicPath);
      const contentTypes = {};
      versions.forEach((versionPath) => {
        const splitPath = versionPath.split('/');
        const contentTypeName = splitPath.slice(-2, -1)[0];
        const versionUid = splitPath.slice(-1)[0];
        if (contentTypes[contentTypeName] == null) {
          contentTypes[contentTypeName] = [];
        }
        contentTypes[contentTypeName].push([versionUid, versionPath]);
      });

      Object.keys(contentTypes).forEach((contentTypeName) => {
        const topicVersions = contentTypes[contentTypeName];
        if (outObj[uid].approaches[contentTypeName] == null) {
          outObj[uid].approaches[contentTypeName] = {};
        }
        if (appObj[uid].approaches[contentTypeName] == null) {
          appObj[uid].approaches[contentTypeName] = {};
        }
        if (contentTypeName !== 'quickReference') {
          topicVersions.forEach((v) => {
            const [versionUid, versionPath] = v;
            let versionTitle = '';
            let versionDescription = '';
            let versionHtmlTitle = '';
            let versionHtmlDescription = '';
            let fullTopic = false;
            let type = 'generic';
            let links = '';
            // let references = [];
            const versionPathAbsolute
              = `${process.cwd()}/${versionPath}/version.js`;
            const versionPathRelativeToCWD
              = path.relative(process.cwd(), versionPathAbsolute);
            const versionPathRelativeToThisFile
              = `./${path.relative(__dirname, versionPathAbsolute)}`;

            if (fs.existsSync(versionPathRelativeToCWD)) {
              /* eslint-disable global-require, import/no-dynamic-require */
              // $FlowFixMe
              const version = require(versionPathRelativeToThisFile);
              /* eslint-enable */
              if (version.title != null) {
                versionTitle = version.title;
              }
              if (version.description != null) {
                versionDescription = version.description;
              }
              if (version.htmlTitle != null) {
                versionHtmlTitle = version.htmlTitle;
              }
              if (version.htmlDescription != null) {
                versionHtmlDescription = version.htmlDescription;
              }
              if (version.fullTopic != null) {
                ({ fullTopic } = version);
              }
              if (version.type != null) {
                ({ type } = version);
              }
              if (version.links != null) {
                ({ links } = version);
              }
            }
            outObj[uid].approaches[contentTypeName][versionUid] = {
              type: `${type}`,
              title: `${versionTitle}`,
              description: `${versionDescription.replace(/'/, '\\\'')}`,
              fullTopic,
            };
            appObj[uid].approaches[contentTypeName][versionUid] = {
              type: `${type}`,
              title: `${versionTitle}`,
              description: `${versionDescription.replace(/'/, '\\\'')}`,
              htmlTitle: `${versionHtmlTitle.replace(/'/, '\\\'')}`,
              htmlDescription: `${versionHtmlDescription.replace(/'/, '\\\'')}`,
              fullTopic,
              links,
            };
          });
        }
        if (contentTypeName === 'quickReference' && buildMode === 'development') {
          topicVersions.forEach((v) => {
            const [versionUid] = v;
            outObj[uid].approaches[contentTypeName][versionUid] = {
              type: appObj[uid].approaches[contentTypeName].type,
              title: `${versionUid}`,
              description: '',
              fullTopic: false,
            };
            appObj[uid].approaches[contentTypeName][versionUid] = {
              type: appObj[uid].approaches[contentTypeName].type,
              title: `${versionUid}`,
              description: '',
              fullTopic: false,
            };
          });
        }
      });

      outObj[uid].dependencies = [];
      appObj[uid].dependencies = [];
      if (dependencies.length > 0) {
        dependencies.forEach((dependency) => {
          outObj[uid].dependencies.push(dependency);
          appObj[uid].dependencies.push(dependency);
        });
      }
      outObj[uid].enabled = enabled;
      appObj[uid].enabled = enabled;
    }
  });

  const outFileName = `${topicsPath}/topicIndex.json`;
  const appFileName = `${appPath}/topicIndex.json`;
  fs.writeFile(outFileName, JSON.stringify(outObj, null, 2), (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
  fs.writeFile(appFileName, JSON.stringify(appObj, null, 2), (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
}

module.exports = createTopicIndex;
