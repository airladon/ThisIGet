const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const pathTools = require(path.join(__dirname, 'pathTools.js'));

function entryPoints(buildMode) {
  const points = {
    main: ['whatwg-fetch', '@babel/polyfill', './src/js/main.js'],
    input: './src/js/views/input/input',
  };

  const lessons = pathTools.getAllPaths(
    './src/Lessons',
    ['lesson.js', 'quickReference.js'],
    ['lesson-dev.js'],
    buildMode,
  );
  lessons.forEach((lesson) => {
    const p = lesson.path.replace(/src\/Lessons\//, '');
    const name = lesson.name.slice(0, -3);
    points[`Lessons/${p}/${name}`] = `./${lesson.path}/${lesson.name}`;
  });
  return points;
}

function escape(text) {
  return text.replace(/'/, '\\\'');
}

// This method goes through all the details and versions files and updates
// them with current lesson, topic, version
function updateDetailsAndVersions() {
  // eslint-disable-next-line no-console
  console.log('Updating details and versions...');
  const lessons = pathTools.getAllLessons('./src/Lessons');
  lessons.forEach((lessonPath) => {
    const absoluteDetailsPath = `${process.cwd()}/${lessonPath}/details.js`;
    const detailsPathRelativeToCWD = path.relative(process.cwd(), absoluteDetailsPath);
    const detailsPathRelativeToThisFile = `./${path.relative(__dirname, absoluteDetailsPath)}`;

    // const detailsPath = `./${lessonPath}/details.js`;
    if (fs.existsSync(detailsPathRelativeToCWD)) {
      /* eslint-disable global-require, import/no-dynamic-require */
      // $FlowFixMe
      const details = require(detailsPathRelativeToThisFile);
      let outStr = '// @flow';
      outStr = `${outStr}\n`;
      outStr = `${outStr}\n// eslint-disable-next-line no-var`;
      outStr = `${outStr}\nvar lessonDetails = {`;
      outStr = `${outStr}\n  title: '${details.title}',`;
      outStr = `${outStr}\n  dependencies: [`;
      if (details.dependencies.length > 0) {
        details.dependencies.forEach((dependency) => {
          outStr = `${outStr}\n    '${dependency}',`;
        });
      }
      outStr = `${outStr}\n  ],`;
      outStr = `${outStr}\n  enabled: ${details.enabled || 'false'},`;
      outStr = `${outStr}\n  path: '${lessonPath.split('/').slice(2, -1).join('/')}',`;
      outStr = `${outStr}\n  uid: '${lessonPath.split('/').slice(-1)[0]}',`;
      outStr = `${outStr}\n};`;
      outStr = `${outStr}\n`;
      outStr = `${outStr}\nmodule.exports = lessonDetails;`;
      outStr = `${outStr}\n`;
      fs.writeFileSync(detailsPathRelativeToCWD, outStr, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      });
    }
  });

  const versions = pathTools.getAllVersions('./src/Lessons');
  versions.forEach((versionPath) => {
    const versionPathAbsolute
              = `${process.cwd()}/${versionPath}/version.js`;
    const versionPathRelativeToCWD
      = path.relative(process.cwd(), versionPathAbsolute);
    const versionPathRelativeToThisFile
      = `./${path.relative(__dirname, versionPathAbsolute)}`;

    // const versionFile = `./${versionPath}/version.js`;
    const topic = versionPath.split('/').slice(-2, -1)[0];
    const versionUID = versionPath.split('/').slice(-1)[0];
    if (fs.existsSync(versionPathRelativeToCWD)) {
      /* eslint-disable global-require, import/no-dynamic-require */
      // $FlowFixMe
      const version = require(versionPathRelativeToThisFile);
      let outStr = '// @flow';
      outStr = `${outStr}\n`;
      outStr = `${outStr}\n// eslint-disable-next-line no-var`;
      outStr = `${outStr}\nvar version = {`;
      outStr = `${outStr}\n  uid: '${versionUID}',`;
      outStr = `${outStr}\n  topic: '${topic}',`;
      if (topic === 'quickReference') {
        outStr = `${outStr}\n  type: '${version.type || 'generic'}',`;
        const quickReferenceFile = `./${versionPath}/quickReference.js`;
        if (fs.existsSync(quickReferenceFile)) {
          const content = fs.readFileSync(quickReferenceFile, 'utf8');
          const split = content.split('\nattachQuickReference(').slice(-1)[0];
          const lines = split.split('\n');
          const qrs = lines.filter(l => l.match(':'))
            .map(l => l.replace(/:.*/, ''))
            .map(l => l.replace(/^ */, ''));
          outStr = `${outStr}\n  references: [`;
          if (qrs.length > 0) {
            qrs.forEach((qr) => {
              outStr = `${outStr}\n    '${qr}',`;
            });
          }
          outStr = `${outStr}\n  ],`;
        } else {
          outStr = `${outStr}\n  references: [],`;
        }
      } else if (topic === 'links') {
        outStr = `${outStr}\n  type: '${version.type || 'generic'}',`;
        outStr = `${outStr}\n  title: '${version.title || ''}',`;
        outStr = `${outStr}\n  description: '${version.description || ''}',`;
        outStr = `${outStr}\n  links: [`;
        if (version.links.length > 0) {
          version.links.forEach((link) => {
            outStr = `${outStr}\n    {`;
            if (link.url != null) {
              outStr = `${outStr}\n      url: '${link.url}',`;
              outStr = `${outStr}\n      hash: '${crypto.createHash('md5').update(link.url).digest('hex')}',`;
            }
            if (link.publisher != null) {
              outStr = `${outStr}\n      publisher: '${escape(link.publisher)}',`;
            }
            if (link.author != null) {
              outStr = `${outStr}\n      author: '${escape(link.author)}',`;
            }
            if (link.type != null) {
              outStr = `${outStr}\n      type: '${link.type}',`;
            }
            if (link.description != null) {
              outStr = `${outStr}\n      description: '${escape(link.description)}',`;
            }
            outStr = `${outStr}\n    },`;
          });
        }
        outStr = `${outStr}\n  ],`;
      } else {
        outStr = `${outStr}\n  title: '${version.title || ''}',`;
        outStr = `${outStr}\n  description: '${version.description || ''}',`;
        outStr = `${outStr}\n  fullLesson: ${version.fullLesson || 'false'},`;
        outStr = `${outStr}\n  type: '${version.type || 'generic'}',`;
      }
      outStr = `${outStr}\n};`;
      outStr = `${outStr}\n`;
      outStr = `${outStr}\nmodule.exports = version;`;
      outStr = `${outStr}\n`;
      fs.writeFileSync(versionPathRelativeToCWD, outStr, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      });
    }
  });
}

module.exports = {
  entryPoints, updateDetailsAndVersions, // makeLessonIndex, getAllLessons, updateDetailsAndVersions,
};
