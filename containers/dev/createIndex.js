const fs = require('fs');
const path = require('path');
const pathTools = require('./pathTools.js');

function createTopicIndex(buildMode, topicsPath) {
  const topics = pathTools.getAllTopics(topicsPath);
  // let outStr = `import TopicDescription from '../../js/Lesson/topicDescription';
  let outStr = '{';
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
      // ({ uid } = details);
      ({ enabled } = details);
      // ({ qr } = details);
      if (enabled != null && enabled === false) {
        enabled = false;
      } else {
        enabled = true;
      }
    }
    if (title !== '') {
      // outStr = `${outStr}\n    ${uid}: new TopicDescription({`;
      outStr = `${outStr}\n  "${uid}": {`;
      outObj[uid] = {};
      outStr = `${outStr}\n    "title": "${title.replace(/'/, '\\\'')}",`;
      outObj[uid].title = `${title.replace(/'/, '\\\'')}`;
      outStr = `${outStr}\n    "path": "/${parentPath}",`;
      outObj[uid].path = `/${parentPath}`;
      outStr = `${outStr}\n    "uid": "${uid}",`;
      outObj[uid].uid = `${uid}`;
      outStr = `${outStr}\n    "approaches": {`;
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
          outStr = `${outStr}\n      "${contentTypeName}": {`;
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
              // if (version.references != null) {
              //   ({ references } = version);
              // }
            }
            outStr = `${outStr}\n        "${versionUid}": {`;
            outObj[uid].approaches[contentTypeName][versionUid] = {};
            const versionObj = outObj[uid].approaches[contentTypeName][versionUid];
            outStr = `${outStr}\n          "type": "${type}",`;
            versionObj.type = `${type}`;
            if (contentTypeName === 'quickReference') {
              // outStr = `${outStr}\n            references: [`;
              // references.forEach((reference) => {
              //   outStr = `${outStr}\n              '${reference}',`;
              // });
              // outStr = `${outStr}\n            ],`;
            } else {
              outStr = `${outStr}\n          "title": "${versionTitle}",`;
              versionObj.title = `${versionTitle}`;
              outStr = `${outStr}\n          "description": "${versionDescription.replace(/'/, '\\\'')}",`;
              versionObj.description = `${versionDescription.replace(/'/, '\\\'')}`;
              outStr = `${outStr}\n          "htmlTitle": "${versionHtmlTitle.replace(/'/, '\\\'')}",`;
              versionObj.htmlTitle = `${versionHtmlTitle.replace(/'/, '\\\'')}`;
              outStr = `${outStr}\n          "htmlDescription": "${versionHtmlDescription.replace(/'/, '\\\'')}",`;
              versionObj.htmlDescription = `${versionHtmlDescription.replace(/'/, '\\\'')}`;
              outStr = `${outStr}\n          "fullTopic": ${fullTopic.toString()},`;
              versionObj.fullTopic = fullTopic;
            }
            outStr = `${outStr}\n        },`;
          });
          outStr = `${outStr}\n      },`;
        }
        if (contentTypeName === 'quickReference' && buildMode === 'development') {
          outStr = `${outStr}\n        "dev": {`;
          topicVersions.forEach((v) => {
            const [versionUid] = v;
            outStr = `${outStr}\n        "${versionUid}": {`;
            outObj[uid].approaches[contentTypeName][versionUid] = {};
            const versionObj = outObj[uid].approaches[contentTypeName][versionUid];
            outStr = `${outStr}\n          "type": "presentation",`;
            versionObj.type = 'presentation';
            outStr = `${outStr}\n          "title": "${versionUid}",`;
            versionObj.title = `${versionUid}`;
            outStr = `${outStr}\n          "description": '',`;
            versionObj.description = '';
            outStr = `${outStr}\n          "fullTopic": false,`;
            versionObj.fullTopic = false;
            outStr = `${outStr}\n        },`;
          });
          outStr = `${outStr}\n      },`;
        }
      });

      outStr = `${outStr}\n    },`;
      outStr = `${outStr}\n    "dependencies": [`;
      outObj[uid].dependencies = [];
      if (dependencies.length > 0) {
        dependencies.forEach((dependency) => {
          outStr = `${outStr}\n      "${dependency}",`;
          outObj[uid].dependencies.push(dependency);
        });
      }
      outStr = `${outStr}\n    ],`;
      outStr = `${outStr}\n    "enabled": ${enabled},`;
      outObj[uid].enabled = enabled;
      // outStr = `${outStr}\n    }),`;
      outStr = `${outStr}\n  },`;
    }
  });
  outStr = `${outStr}\n};`;
  // outStr = `${outStr}\n}\n`;
  // outStr = `${outStr}\n\nmodule.exports = topicIndex;\n`;
  if (outStr !== '') {
    // fs.writeFile(`${topicsPath}/topicIndex.json`, outStr, (err) => {
    //   if (err) {
    //     // eslint-disable-next-line no-console
    //     console.log(err);
    //   }
    // });
    fs.writeFile(`${topicsPath}/topicIndex.json`, JSON.stringify(outObj, null, 2), (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
    // const absoluteIndexPath = `${process.cwd()}/${topicsPath}/topicIndexObj.js`;
    // const relativeIndexPath = `./${path.relative(__dirname, absoluteIndexPath)}`;
    //  eslint-disable global-require, import/no-dynamic-require 
    // // $FlowFixMe
    // console.log(relativeIndexPath)
    // const topicIndex = require(relativeIndexPath);
    // console.log(topicIndex);
  }
}

module.exports = createTopicIndex;
