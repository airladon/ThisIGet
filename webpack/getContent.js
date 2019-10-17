const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const pathTools = require(path.join(__dirname, 'pathTools.js'));

function entryPoints(buildMode) {
  const points = {
    // main: ['whatwg-fetch', '@babel/polyfill', './src/js/main.js'],
    home: ['whatwg-fetch', path.join(__dirname, '../src/js/views/home/home.js')],
    input: path.join(__dirname, '../src/js/views/input/input.js'),
    learningPaths: path.join(__dirname, '../src/js/views/learningPaths/learningPaths.js'),
    about: path.join(__dirname, '../src/js/views/information/about.js'),
    contact: path.join(__dirname, '../src/js/views/information/contact.js'),
    privacy: path.join(__dirname, '../src/js/views/information/privacy.js'),
    terms: path.join(__dirname, '../src/js/views/information/terms.js'),
    copyright: path.join(__dirname, '../src/js/views/information/copyright.js'),
    introduction: path.join(__dirname, '../src/js/views/information/introduction.js'),
    disclaimer: path.join(__dirname, '../src/js/views/information/disclaimer.js'),
    contribute: path.join(__dirname, '../src/js/views/information/contribute.js'),
    polyfill: path.join(__dirname, '../src/js/polyfills.js'),
    topicIndex: path.join(__dirname, '../src/content/topicIndex.js'),
  };

  const topics = pathTools.getAllPaths(
    path.join(__dirname, '../src/content'),
    ['entry.js', 'quickReference.js'],
    ['entry-dev.js'],
    buildMode,
  );
  topics.forEach((topic) => {
    const p = topic.path.replace(/src\/content\//, '');
    const name = topic.name.slice(0, -3);
    if (name.slice(0, 5) === 'entry') {
      points[`content/${p}/content${name.slice(5)}`] = `./${topic.path}/${topic.name}`;
    } else {
      points[`content/${p}/${name}`] = `./${topic.path}/${topic.name}`;
    }
  });
  return points;
}

function escape(text) {
  return text.replace(/'/, '\\\'');
}

// This method goes through all the details and versions files and updates
// them with current topic, approach, version
function updateDetailsAndVersions() {
  // eslint-disable-next-line no-console
  console.log('Updating details and versions...');
  const topics = pathTools.getAllTopics(path.join(__dirname, '../src/content'));
  topics.forEach((topicPath) => {
    const absoluteDetailsPath = `${topicPath}/details.js`;
    const detailsPathRelativeToCWD = path.relative(process.cwd(), absoluteDetailsPath);
    const detailsPathRelativeToThisFile = `./${path.relative(__dirname, absoluteDetailsPath)}`;

    if (fs.existsSync(detailsPathRelativeToCWD)) {
      /* eslint-disable global-require, import/no-dynamic-require */
      // $FlowFixMe
      const details = require(detailsPathRelativeToThisFile);
      let outStr = '// @flow';
      outStr = `${outStr}\n`;
      outStr = `${outStr}\n// eslint-disable-next-line no-var`;
      outStr = `${outStr}\nvar topicDetails = {`;
      outStr = `${outStr}\n  title: '${details.title.replace(/'/, '\\\'')}',`;
      outStr = `${outStr}\n  dependencies: [`;
      if (details.dependencies.length > 0) {
        details.dependencies.forEach((dependency) => {
          outStr = `${outStr}\n    '${dependency}',`;
        });
      }
      outStr = `${outStr}\n  ],`;
      outStr = `${outStr}\n  enabled: ${details.enabled || 'false'},`;
      const shortTopicPath = path.relative(path.join(__dirname, '../src/content'), topicPath);
      outStr = `${outStr}\n  path: '${shortTopicPath.split('/').slice(0, -1).join('/')}',`;
      outStr = `${outStr}\n  uid: '${topicPath.split('/').slice(-1)[0]}',`;
      outStr = `${outStr}\n};`;
      outStr = `${outStr}\n`;
      outStr = `${outStr}\nmodule.exports = topicDetails;`;
      outStr = `${outStr}\n`;
      fs.writeFileSync(detailsPathRelativeToCWD, outStr, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      });
    }
  });

  const versions = pathTools.getAllVersions(path.join(__dirname, '../src/content'));
  versions.forEach((versionPath) => {
    const versionPathAbsolute
              = `${versionPath}/version.js`;
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
        const quickReferenceFile = `${versionPath}/quickReference.js`;
        console.log(quickReferenceFile)
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
        outStr = `${outStr}\n  title: '${version.title.replace(/'/, '\\\'') || ''}',`;
        outStr = `${outStr}\n  description: '${version.description.replace(/'/, '\\\'') || ''}',`;
        outStr = `${outStr}\n  htmlTitle: '${version.htmlTitle.replace(/'/, '\\\'') || ''}',`;
        outStr = `${outStr}\n  htmlDescription: '${version.htmlDescription.replace(/'/, '\\\'') || ''}',`;
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
        outStr = `${outStr}\n  title: '${version.title.replace(/'/, '\\\'') || ''}',`;
        outStr = `${outStr}\n  description: '${version.description.replace(/'/, '\\\'') || ''}',`;
        outStr = `${outStr}\n  htmlTitle: '${version.htmlTitle.replace(/'/, '\\\'') || ''}',`;
        outStr = `${outStr}\n  htmlDescription: '${version.htmlDescription.replace(/'/, '\\\'') || ''}',`;
        outStr = `${outStr}\n  fullTopic: ${version.fullTopic || 'false'},`;
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
  entryPoints, updateDetailsAndVersions,
};
