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
  lessonsPath,
  prodPaths,
  devPaths,
  buildMode,
) {
  const lessons = [];
  let fileId = prodPaths;
  if (buildMode === 'development') {
    fileId = [...prodPaths, ...devPaths];
  }
  walkSync(lessonsPath, fileId, (lessonPath, fileName) => {
    if (!lessonPath.includes('boilerplate')) {
      lessons.push({ path: lessonPath, name: fileName });
    }
  });
  return lessons;
}

function getAllLessons(lessonsPath) {
  const lessons = [];
  walkSync(lessonsPath, 'details.js', (lessonPath) => {
    if (!lessonPath.includes('boilerplate')) {
      // if (lessonPath.includes('test1')
      //   || lessonPath.includes('test2')
      //   || lessonPath.includes('Introduction')
      //   || lessonPath.includes('MeasuringAngles')
      //   || lessonPath.includes('ImportantAngles')
      //   || lessonPath.includes('Angle')
      //   || lessonPath.includes('Circle')
      //   || lessonPath.includes('test3')) {
      lessons.push(lessonPath);
      // }
    }
  });
  return lessons;
}

function getAllVersions(versionsPath) {
  const versions = [];
  walkSync(versionsPath, 'version.js', (versionPath) => {
    versions.push(versionPath);
  });
  return versions;
}


function entryPoints(buildMode) {
  const points = {
    main: ['whatwg-fetch', '@babel/polyfill', './src/js/main.js'],
    input: './src/js/views/input/input',
    // login: './src/js/views/login/login',
    // createAccount: './src/js/views/createAccount/createAccount',
    // resetPasswordRequest: './src/js/views/resetPasswordRequest/resetPasswordRequest',
    // resetPassword: './src/js/views/resetPassword/resetPassword',
    // confirmAccountMessage: './src/js/views/confirmAccountMessage/confirmAccountMessage',
  };

  const lessons = getAllPaths(
    './src/Lessons',
    ['lesson.js', 'quickReference.js'],
    ['lesson-dev.js'],
    buildMode,
  );
  // console.log(lessons)
  lessons.forEach((lesson) => {
    const p = lesson.path.replace(/src\/Lessons\//, '');
    const name = lesson.name.slice(0, -3);
    points[`Lessons/${p}/${name}`] = `./${lesson.path}/${lesson.name}`;
  });
  // console.log(buildMode)
  // console.log(points)
  // console.log(points)
  return points;
}

function updateDetailsAndVersions() {
  console.log('Updating details and versions...');
  const lessons = getAllLessons('./src/Lessons');
  lessons.forEach((lessonPath) => {
    const detailsPath = `./${lessonPath}/details.js`;
    if (fs.existsSync(detailsPath)) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const details = require(detailsPath);
      let outStr = '// @flow';
      outStr = `${outStr}\n`;
      outStr = `${outStr}\n// eslint-disable-next-line no-var`;
      outStr = `${outStr}\nvar details = {`;
      outStr = `${outStr}\n  title: '${details.details.title}',`;
      outStr = `${outStr}\n  dependencies: [`;
      if (details.details.dependencies.length > 0) {
        details.details.dependencies.forEach((dependency) => {
          outStr = `${outStr}\n    '${dependency}',`;
        });
      }
      outStr = `${outStr}\n  ],`;
      outStr = `${outStr}\n  enabled: ${details.details.enabled || 'false'},`;
      // outStr = `${outStr}\n  uid: '${lessonPath.split('/').slice(-1)[0]}',`;
      outStr = `${outStr}\n};`;
      outStr = `${outStr}\n`;
      outStr = `${outStr}\nmodule.exports = {`;
      outStr = `${outStr}\n  details,`;
      outStr = `${outStr}\n};`;
      outStr = `${outStr}\n`;
      fs.writeFileSync(detailsPath, outStr, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      });
    }
  });

  const versions = getAllVersions('./src/Lessons');
  versions.forEach((versionPath) => {
    const versionFile = `./${versionPath}/version.js`;
    const topic = versionPath.split('/').slice(-2, -1)[0];
    const versionUID = versionPath.split('/').slice(-1)[0];
    if (fs.existsSync(versionFile)) {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const version = require(versionFile);
      let outStr = '// @flow';
      outStr = `${outStr}\n`;
      outStr = `${outStr}\n// eslint-disable-next-line no-var`;
      outStr = `${outStr}\nvar details = {`;
      if (topic !== 'quickReference') {
        outStr = `${outStr}\n  uid: '${versionUID}',`;
        outStr = `${outStr}\n  topic: '${topic}',`;
        outStr = `${outStr}\n  title: '${version.details.title || ''}',`;
        outStr = `${outStr}\n  description: '${version.details.description || ''}',`;
        outStr = `${outStr}\n  fullLesson: ${version.details.fullLesson || 'false'},`;
        outStr = `${outStr}\n  type: '${version.details.type || 'generic'}',`;
      } else {
        // outStr = `${outStr}\n  uid: '${versionUID}',`;
        // outStr = `${outStr}\n  topic: '${topic}',`;
        outStr = `${outStr}\n  type: '${version.details.type || 'generic'}',`;
        outStr = `${outStr}\n  references: [`;
        if (version.details.references.length > 0) {
          version.details.references.forEach((reference) => {
            outStr = `${outStr}\n    '${reference}',`;
          });
        }
        outStr = `${outStr}\n  ],`;
      }
      outStr = `${outStr}\n};`;
      outStr = `${outStr}\n`;
      outStr = `${outStr}\nmodule.exports = {`;
      outStr = `${outStr}\n  details,`;
      outStr = `${outStr}\n};`;
      outStr = `${outStr}\n`;
      fs.writeFileSync(versionFile, outStr, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      });
    }
  });
}

function makeLessonIndex(buildMode) {
  console.log('Making lesson index...');
  const lessons = getAllLessons('./src/Lessons');

  let outStr =
`import LessonDescription from '../../js/Lesson/lessonDescription';

export default function getLessonIndex() {
  const lessonIndex = {`;
  lessons.forEach((lessonPath) => {
    const splitLessonPath = lessonPath.split('/');
    const parentPath = splitLessonPath.slice(1, -1).join('/');
    const uid = splitLessonPath.slice(-1)[0];
    const detailsPath = `./${lessonPath}/details.js`;
    let title = '';
    let dependencies = [];
    let enabled = true;
    if (fs.existsSync(detailsPath)) {
      /* eslint-disable global-require, import/no-dynamic-require */
      // $FlowFixMe
      const details = require(detailsPath);
      /* eslint-enable */
      ({ title } = details.details);
      ({ dependencies } = details.details);
      // ({ uid } = details.details);
      ({ enabled } = details.details);
      // ({ qr } = details.details);
      if (enabled != null && enabled === false) {
        enabled = false;
      } else {
        enabled = true;
      }
    }
    if (title !== '') {
      outStr = `${outStr}\n    ${uid}: new LessonDescription({`;
      outStr = `${outStr}\n      title: '${title}',`;
      outStr = `${outStr}\n      path: '/${parentPath}',`;
      outStr = `${outStr}\n      uid: '${uid}',`;
      outStr = `${outStr}\n      topics: {`;
      const versions = getAllVersions(lessonPath);
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
        if (
          buildMode !== 'development'
          && (topicName === 'quickReference' || topicName === 'dev')
        ) {
          return;
        }
        const topicVersions = topics[topicName];
        outStr = `${outStr}\n        ${topicName}: {`;
        topicVersions.forEach((v) => {
          const [versionUid, versionPath] = v;
          let versionTitle = '';
          let versionDescription = '';
          let fullLesson = false;
          let type = 'generic';
          let references = [];
          const versionFileName = `./${versionPath}/version.js`;
          if (fs.existsSync(versionFileName)) {
            /* eslint-disable global-require, import/no-dynamic-require */
            // $FlowFixMe
            const version = require(versionFileName);
            /* eslint-enable */
            if (version.details.title != null) {
              versionTitle = version.details.title;
            }
            if (version.details.description != null) {
              versionDescription = version.details.description;
            }
            if (version.details.fullLesson != null) {
              ({ fullLesson } = version.details);
            }
            if (version.details.type != null) {
              ({ type } = version.details);
            }
            if (version.details.references != null) {
              ({ references } = version.details);
            }
          }

          outStr = `${outStr}\n          ${versionUid}: {`;
          outStr = `${outStr}\n            type: '${type}',`;
          if (topicName === 'quickReference') {
            outStr = `${outStr}\n            references: [`;
            references.forEach((reference) => {
              outStr = `${outStr}\n              '${reference}',`;
            });
            outStr = `${outStr}\n            ],`;
          } else {
            outStr = `${outStr}\n            title: '${versionTitle}',`;
            outStr = `${outStr}\n            description: '${versionDescription}',`;
            outStr = `${outStr}\n            fullLesson: ${fullLesson.toString()},`;
          }
          outStr = `${outStr}\n          },`;
        });
        outStr = `${outStr}\n        },`;

        if (topicName === 'quickReference') {
          outStr = `${outStr}\n        dev: {`;
          topicVersions.forEach((v) => {
            const [versionUid] = v;
            outStr = `${outStr}\n          ${versionUid}: {`;
            outStr = `${outStr}\n            type: 'presentation',`;
            outStr = `${outStr}\n            title: '${versionUid}',`;
            outStr = `${outStr}\n            description: '',`;
            outStr = `${outStr}\n            fullLesson: false,`;
            outStr = `${outStr}\n          },`;
          });
          outStr = `${outStr}\n        },`;
        }
      });

      // versionPaths.forEach((versionPath) => {
      //   let versionUid = '';
      //   let versionTitle = '';
      //   let versionDescription = '';
      //   const versionSubPath = versionPath.replace(/.*\//, '');
      //   let versionOnPath = true;
      //   let versionQR = {};
      //   const versionFileName = `./${versionPath}/version.js`;
      //   if (fs.existsSync(versionFileName)) {
      //     // eslint-disable-next-line global-require, import/no-dynamic-require
      //     const version = require(versionFileName);

      //     if (version.details.title != null) {
      //       versionTitle = version.details.title;
      //     }
      //     if (version.details.uid != null) {
      //       versionUid = version.details.uid;
      //     }
      //     if (version.details.description != null) {
      //       versionDescription = version.details.description;
      //     }
      //     if (version.details.onPath != null) {
      //       versionOnPath = version.details.onPath;
      //     }
      //     if (version.details.qr != null) {
      //       versionQR = version.details.qr;
      //     }
      //   }
      //   const lessonPaths = getAllPaths(
      //     versionPath,
      //     ['lesson.js'],
      //     ['lesson-dev.js'],
      //     buildMode,
      //   );
      //   outStr = `${outStr}\n        ${versionUid}: {`;
      //   outStr = `${outStr}\n          title: '${versionTitle}',`;
      //   outStr = `${outStr}\n          description: '${versionDescription}',`;
      //   // outStr = `${outStr}\n          uid: '${explanationUid}',`;
      //   outStr = `${outStr}\n          path: '${versionSubPath}',`;
      //   outStr = `${outStr}\n          onPath: ${versionOnPath},`;
      //   outStr = `${outStr}\n          topics: [`;
      //   lessonPaths.forEach((lesson) => {
      //     const shortP = lesson.path.replace(`${lessonPath}/${versionSubPath}/`, '');
      //     outStr = `${outStr}\n            '${shortP}',`;
      //   });
      //   outStr = `${outStr}\n          ],`;
      //   outStr = `${outStr}\n          qr: [`;
      //   if (versionQR != null && Array.isArray(versionQR)) {
      //     versionQR.forEach((page) => {
      //       outStr = `${outStr}\n            '${page}',`;
      //     });
      //   }
      //   outStr = `${outStr}\n          ],`;
      //   outStr = `${outStr}\n        },`;
      // });
      outStr = `${outStr}\n      },`;
      outStr = `${outStr}\n      dependencies: [`;
      if (dependencies.length > 0) {
        dependencies.forEach((dependency) => {
          outStr = `${outStr}\n        '${dependency}',`;
        });
      }
      outStr = `${outStr}\n      ],`;
      outStr = `${outStr}\n      enabled: ${enabled},`;
      outStr = `${outStr}\n    }),`;
    }
    // outStr = `${outStr}\n  };`;
  });
  outStr = `${outStr}\n  };`;
  outStr = `${outStr}\n  return lessonIndex;\n}\n`;
  if (outStr !== '') {
    fs.writeFile('./src/Lessons/LessonsCommon/lessonindex.js', outStr, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  }
}

module.exports = {
  entryPoints, makeLessonIndex, getAllLessons, updateDetailsAndVersions,
};
