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
    login: './src/js/views/login/login',
    createAccount: './src/js/views/createAccount/createAccount',
    resetPasswordRequest: './src/js/views/resetPasswordRequest/resetPasswordRequest',
    reset: './src/js/views/login/reset',
  };

  const lessons = getAllPaths(
    './src/Lessons',
    ['lesson.js', 'quickReference.js'],
    ['lesson-dev.js'],
    buildMode,
  );
  lessons.forEach((lesson) => {
    const p = lesson.path.replace(/src\/Lessons\//, '');
    points[`Lessons/${p}/lesson`] = `./${lesson.path}/${lesson.name}`;
  });
  // console.log(points)
  return points;
}

function makeLessonIndex(buildMode) {
  const lessons = getAllLessons('./src/Lessons');
  // const lessonDescriptions = [];
  let outStr =
`import LessonDescription from '../js/Lesson/lessonDescription';

export default function getLessonIndex() {
  const lessonIndex = {`;
  lessons.forEach((lessonPath) => {
    const shortPath = lessonPath.replace(/src/, '');
    const detailsPath = `./${lessonPath}/details.js`;
    let title = '';
    let dependencies = [];
    let uid = '';
    let enabled = true;
    // let qr = {};

    if (fs.existsSync(detailsPath)) {
      // const detailsPath = `./${lessonPath}/details.js`;
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const details = require(detailsPath);
      ({ title } = details.details);
      ({ dependencies } = details.details);
      ({ uid } = details.details);
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
      outStr = `${outStr}\n      name: '${title}',`;
      outStr = `${outStr}\n      path: '${shortPath}',`;
      outStr = `${outStr}\n      uid: '${uid}',`;
      outStr = `${outStr}\n      versions: {`;
      const versionPaths = getAllVersions(lessonPath);
      versionPaths.forEach((versionPath) => {
        let versionUid = '';
        let versionTitle = '';
        let versionDescription = '';
        const versionSubPath = versionPath.replace(/.*\//, '');
        let versionOnPath = true;
        let versionQR = {};
        const versionFileName = `./${versionPath}/version.js`;
        if (fs.existsSync(versionFileName)) {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const version = require(versionFileName);

          if (version.details.title != null) {
            versionTitle = version.details.title;
          }
          if (version.details.uid != null) {
            versionUid = version.details.uid;
          }
          if (version.details.description != null) {
            versionDescription = version.details.description;
          }
          if (version.details.onPath != null) {
            versionOnPath = version.details.onPath;
          }
          if (version.details.qr != null) {
            versionQR = version.details.qr;
          }
        }
        const lessonPaths = getAllPaths(
          versionPath,
          ['lesson.js'],
          ['lesson-dev.js'],
          buildMode,
        );
        outStr = `${outStr}\n        ${versionUid}: {`;
        outStr = `${outStr}\n          title: '${versionTitle}',`;
        outStr = `${outStr}\n          description: '${versionDescription}',`;
        // outStr = `${outStr}\n          uid: '${explanationUid}',`;
        outStr = `${outStr}\n          path: '${versionSubPath}',`;
        outStr = `${outStr}\n          onPath: ${versionOnPath},`;
        outStr = `${outStr}\n          topics: [`;
        lessonPaths.forEach((lesson) => {
          const shortP = lesson.path.replace(`${lessonPath}/${versionSubPath}/`, '');
          outStr = `${outStr}\n            '${shortP}',`;
        });
        outStr = `${outStr}\n          ],`;
        outStr = `${outStr}\n          qr: [`;
        if (versionQR != null && Array.isArray(versionQR)) {
          versionQR.forEach((page) => {
            outStr = `${outStr}\n            '${page}',`;
          });
        }
        outStr = `${outStr}\n          ],`;
        outStr = `${outStr}\n        },`;
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
      outStr = `${outStr}\n    }),`;
    }
    // outStr = `${outStr}\n  };`;
  });
  outStr = `${outStr}\n  };`;
  outStr = `${outStr}\n  return lessonIndex;\n}\n`;
  if (outStr !== '') {
    fs.writeFile('./src/Lessons/index.js', outStr, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  }
}

module.exports = {
  entryPoints, makeLessonIndex,
};
