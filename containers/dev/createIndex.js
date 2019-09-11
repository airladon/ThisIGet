const fs = require('fs');
const path = require('path');
const pathTools = require('./pathTools.js');

function createContentIndex(buildMode, lessonsPath) {
  const lessons = pathTools.getAllContent(lessonsPath);
  // let outStr = `import TopicDescription from '../../js/Lesson/topicDescription';
  let outStr = `export default function topicIndex() {
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
      // outStr = `${outStr}\n    ${uid}: new TopicDescription({`;
      outStr = `${outStr}\n    ${uid}: {`;
      outStr = `${outStr}\n      title: '${title.replace(/'/, '\\\'')}',`;
      outStr = `${outStr}\n      path: '/${parentPath}',`;
      outStr = `${outStr}\n      uid: '${uid}',`;
      outStr = `${outStr}\n      approaches: {`;
      const versions = pathTools.getAllVersions(lessonPath);
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
          outStr = `${outStr}\n        ${contentTypeName}: {`;
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

            outStr = `${outStr}\n          ${versionUid}: {`;
            outStr = `${outStr}\n            type: '${type}',`;
            if (contentTypeName === 'quickReference') {
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
              outStr = `${outStr}\n            fullTopic: ${fullTopic.toString()},`;
            }
            outStr = `${outStr}\n          },`;
          });
          outStr = `${outStr}\n        },`;
        }
        if (contentTypeName === 'quickReference' && buildMode === 'development') {
          outStr = `${outStr}\n        dev: {`;
          topicVersions.forEach((v) => {
            const [versionUid] = v;
            outStr = `${outStr}\n          ${versionUid}: {`;
            outStr = `${outStr}\n            type: 'presentation',`;
            outStr = `${outStr}\n            title: '${versionUid}',`;
            outStr = `${outStr}\n            description: '',`;
            outStr = `${outStr}\n            fullTopic: false,`;
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
    fs.writeFile(`${lessonsPath}/topicIndexObj.js`, outStr, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  }
}

module.exports = createContentIndex;
