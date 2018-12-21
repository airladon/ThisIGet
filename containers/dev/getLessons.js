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
      lessons.push(lessonPath);
    }
  });
  return lessons;
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
`import LessonDescription from './lessonDescription';

export default function getLessonIndex() {
  const lessonIndex = [];
`;
  lessons.forEach((lessonPath) => {
    const shortPath = lessonPath.replace(/src/, '');
    const detailsPath = `./${lessonPath}/details.js`;
    let title = '';
    let dependencies = [];
    let uid = '';
    let enabled = true;
    let qr = {};
    const lessonPaths = getAllPaths(
      lessonPath,
      ['lesson.js'],
      ['lesson-dev.js'],
      buildMode,
    );
    if (fs.existsSync(detailsPath)) {
      // const detailsPath = `./${lessonPath}/details.js`;
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const details = require(detailsPath);
      ({ title } = details.details);
      ({ dependencies } = details.details);
      ({ uid } = details.details);
      ({ enabled } = details.details);
      ({ qr } = details.details);
      if (enabled != null && enabled === false) {
        enabled = false;
      } else {
        enabled = true;
      }
    }
    if (title !== '') {
      outStr = `${outStr}\n  lessonIndex.push(new LessonDescription(`;
      outStr = `${outStr}\n    '${title}',`;
      outStr = `${outStr}\n    '${shortPath}',`;
      outStr = `${outStr}\n    '${uid}',`;
      outStr = `${outStr}\n    [`;
      lessonPaths.forEach((lesson) => {
        const shortP = lesson.path.replace(`${lessonPath}/`, '');
        outStr = `${outStr}\n      '${shortP}',`;
      });
      outStr = `${outStr}\n    ],`;
      outStr = `${outStr}\n    [`;
      if (dependencies.length > 0) {
        dependencies.forEach((dependency) => {
          outStr = `${outStr}\n      '${dependency}',`;
        });
      }
      outStr = `${outStr}\n    ],`;
      outStr = `${outStr}\n    ${enabled},`;
      outStr = `${outStr}\n    {`;
      if (qr != null) {
        Object.keys(qr).forEach((key) => {
          outStr = `${outStr}\n      ${key}: '${qr[key]}',`;
        });
      }
      outStr = `${outStr}\n    },`;
      outStr = `${outStr}\n  ));`;
    }
  });
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
