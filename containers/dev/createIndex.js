const fs = require('fs');
const path = require('path');
const pathTools = require('./pathTools.js');

function createContentIndex(buildMode, lessonsPath) {
  const lessons = pathTools.getAllContent(lessonsPath);
  // let outStr = `import ContentDescription from '../../js/Lesson/contentDescription';
  let outStr = `export default function contentIndex() {
  return {`;
  lessons.forEach((lessonPath) => {
    const splitLessonPath = lessonPath.split('/');
    const parentPath = splitLessonPath.slice(1, -1).join('/');
    const uid = splitLessonPath.slice(-1)[0];

    const absoluteDetailsPath = `${process.cwd()}/${lessonPath}/details.js`;
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
      // outStr = `${outStr}\n    ${uid}: new ContentDescription({`;
      outStr = `${outStr}\n    ${uid}: {`;
      outStr = `${outStr}\n      title: '${title.replace(/'/, '\\\'')}',`;
      outStr = `${outStr}\n      path: '/${parentPath}',`;
      outStr = `${outStr}\n      uid: '${uid}',`;
      outStr = `${outStr}\n      topics: {`;
      const versions = pathTools.getAllVersions(lessonPath);
      const topics = {};
      versions.forEach((versionPath) => {
        const splitPath = versionPath.split('/');
        const topicName = splitPath.slice(-2, -1)[0];
        const versionUid = splitPath.slice(-1)[0];
        if (topics[topicName] == null) {
          topics[topicName] = [];
        }
        topics[topicName].push([versionUid, versionPath]);
      });

      Object.keys(topics).forEach((topicName) => {
        const topicVersions = topics[topicName];
        if (topicName !== 'quickReference') {
          outStr = `${outStr}\n        ${topicName}: {`;
          topicVersions.forEach((v) => {
            const [versionUid, versionPath] = v;
            let versionTitle = '';
            let versionDescription = '';
            let versionHtmlTitle = '';
            let versionHtmlDescription = '';
            let fullContent = false;
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
              if (version.fullContent != null) {
                ({ fullContent } = version);
              }
              if (version.type != null) {
                ({ type } = version);
              }
              // if (version.references != null) {
              //   ({ references } = version);
              // }
            }

            outStr = `${outStr}\n          ${versionUid}: {`;
            outStr = `${outStr}\n            type: '${type}',`;
            if (topicName === 'quickReference') {
              // outStr = `${outStr}\n            references: [`;
              // references.forEach((reference) => {
              //   outStr = `${outStr}\n              '${reference}',`;
              // });
              // outStr = `${outStr}\n            ],`;
            } else {
              outStr = `${outStr}\n            title: '${versionTitle}',`;
              outStr = `${outStr}\n            description: '${versionDescription.replace(/'/, '\\\'')}',`;
              outStr = `${outStr}\n            htmlTitle: '${versionHtmlTitle.replace(/'/, '\\\'')}',`;
              outStr = `${outStr}\n            htmlDescription: '${versionHtmlDescription.replace(/'/, '\\\'')}',`;
              outStr = `${outStr}\n            fullContent: ${fullContent.toString()},`;
            }
            outStr = `${outStr}\n          },`;
          });
          outStr = `${outStr}\n        },`;
        }
        if (topicName === 'quickReference' && buildMode === 'development') {
          outStr = `${outStr}\n        dev: {`;
          topicVersions.forEach((v) => {
            const [versionUid] = v;
            outStr = `${outStr}\n          ${versionUid}: {`;
            outStr = `${outStr}\n            type: 'presentation',`;
            outStr = `${outStr}\n            title: '${versionUid}',`;
            outStr = `${outStr}\n            description: '',`;
            outStr = `${outStr}\n            fullContent: false,`;
            outStr = `${outStr}\n          },`;
          });
          outStr = `${outStr}\n        },`;
        }
      });

      outStr = `${outStr}\n      },`;
      outStr = `${outStr}\n      dependencies: [`;
      if (dependencies.length > 0) {
        dependencies.forEach((dependency) => {
          outStr = `${outStr}\n        '${dependency}',`;
        });
      }
      outStr = `${outStr}\n      ],`;
      outStr = `${outStr}\n      enabled: ${enabled},`;
      // outStr = `${outStr}\n    }),`;
      outStr = `${outStr}\n    },`;
    }
  });
  outStr = `${outStr}\n  };`;
  // outStr = `${outStr}\n  return lessonIndex;\n}\n`;
  outStr = `${outStr}\n}\n`;
  if (outStr !== '') {
    fs.writeFile(`${lessonsPath}/contentIndexObj.js`, outStr, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  }
}

module.exports = createContentIndex;
