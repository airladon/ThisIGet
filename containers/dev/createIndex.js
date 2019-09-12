const fs = require('fs');
const path = require('path');
const pathTools = require('./pathTools.js');

function createTopicIndex(buildMode, topicsPath) {
  const topics = pathTools.getAllTopics(topicsPath);
  const outObj = {};
  topics.forEach((topicPath) => {
    const splitLessonPath = topicPath.split('/');
    const parentPath = splitLessonPath.slice(1, -1).join('/');
    const uid = splitLessonPath.slice(-1)[0];

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
      outObj[uid] = {};
      outObj[uid].title = `${title.replace(/'/, '\\\'')}`;
      outObj[uid].path = `/${parentPath}`;
      outObj[uid].uid = `${uid}`;
      outObj[uid].approaches = {};
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
        if (contentTypeName !== 'quickReference') {
          outObj[uid].approaches[contentTypeName] = {};
          topicVersions.forEach((v) => {
            const [versionUid, versionPath] = v;
            let versionTitle = '';
            let versionDescription = '';
            let versionHtmlTitle = '';
            let versionHtmlDescription = '';
            let fullTopic = false;
            let type = 'generic';
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
            }
            outObj[uid].approaches[contentTypeName][versionUid] = {};
            const versionObj = outObj[uid].approaches[contentTypeName][versionUid];
            versionObj.type = `${type}`;
            versionObj.title = `${versionTitle}`;
            versionObj.description = `${versionDescription.replace(/'/, '\\\'')}`;
            versionObj.htmlTitle = `${versionHtmlTitle.replace(/'/, '\\\'')}`;
            versionObj.htmlDescription = `${versionHtmlDescription.replace(/'/, '\\\'')}`;
            versionObj.fullTopic = fullTopic;
          });
        }
        if (contentTypeName === 'quickReference' && buildMode === 'development') {
          topicVersions.forEach((v) => {
            const [versionUid] = v;
            outObj[uid].approaches[contentTypeName][versionUid] = {};
            const versionObj = outObj[uid].approaches[contentTypeName][versionUid];
            versionObj.type = 'presentation';
            versionObj.title = `${versionUid}`;
            versionObj.description = '';
            versionObj.fullTopic = false;
          });
        }
      });

      outObj[uid].dependencies = [];
      if (dependencies.length > 0) {
        dependencies.forEach((dependency) => {
          outObj[uid].dependencies.push(dependency);
        });
      }
      outObj[uid].enabled = enabled;
    }
  });
  fs.writeFile(`${topicsPath}/topicIndex.json`, JSON.stringify(outObj, null, 2), (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
}

module.exports = createTopicIndex;
