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
      if (lessonPath.includes('test1') || lessonPath.includes('test2')  || lessonPath.includes('test3') ) {
        lessons.push(lessonPath);
      }
    }
  });
  return lessons;
}

function getAllExplanations(explanationsPath) {
  const explanations = [];
  walkSync(explanationsPath, 'explanation.js', (explanationPath) => {
    explanations.push(explanationPath);
  });
  return explanations;
}


function entryPoints(buildMode) {
  const points = {
    main: ['whatwg-fetch', '@babel/polyfill', './src/js/main.js'],
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
      outStr = `${outStr}\n      title: '${title}',`;
      outStr = `${outStr}\n      path: '${shortPath}',`;
      // outStr = `${outStr}\n      uid: '${uid}',`;
      outStr = `${outStr}\n      explanations: {`;
      const explanationPaths = getAllExplanations(lessonPath);
      explanationPaths.forEach((explanationPath) => {
        let explanationUid = '';
        let explanationTitle = '';
        let explanationDescription = '';
        let explanationSubPath = explanationPath.replace(/.*\//, '');
        let explanationOnPath = false;
        let explanationQR = {};
        const explanationFileName = `./${explanationPath}/explanation.js`;
        if (fs.existsSync(explanationFileName)) {
          // eslint-disable-next-line global-require, import/no-dynamic-require
          const explanation = require(explanationFileName);

          if (explanation.details.title != null) {
            explanationTitle = explanation.details.title;
          }
          if (explanation.details.uid != null) {
            explanationUid = explanation.details.uid;
          }
          if (explanation.details.description != null) {
            explanationDescription = explanation.details.description;
          }
          if (explanation.details.onPath != null) {
            explanationOnPath = explanation.details.onPath;
          }
          if (explanation.details.qr != null) {
            explanationQR = explanation.details.qr;
          }
        }
        const lessonPaths = getAllPaths(
          explanationPath,
          ['lesson.js'],
          ['lesson-dev.js'],
          buildMode,
        );
        outStr = `${outStr}\n        ${explanationUid}: {`;
        outStr = `${outStr}\n          title: '${explanationTitle}',`;
        outStr = `${outStr}\n          description: '${explanationDescription}',`;
        // outStr = `${outStr}\n          uid: '${explanationUid}',`;
        outStr = `${outStr}\n          path: '${explanationSubPath}',`;
        outStr = `${outStr}\n          onPath: ${explanationOnPath},`;
        outStr = `${outStr}\n          topics: [`;
        lessonPaths.forEach((lesson) => {
          const shortP = lesson.path.replace(`${lessonPath}/${explanationSubPath}/`, '');
          outStr = `${outStr}\n            '${shortP}',`;
        });
        outStr = `${outStr}\n          ],`;
        outStr = `${outStr}\n          qr: [`;
        if (explanationQR != null && Array.isArray(explanationQR)) {
          explanationQR.forEach((page) => {
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
