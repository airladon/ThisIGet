const fs = require('fs');
const path = require('path');
const pathTools = require('./pathTools.js');


function getFiles(pathDir) {
  const times = [];
  fs.readdirSync(pathDir).forEach((name) => {
    const filePath = path.join(pathDir, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      const ext = name.split('.').slice(-1)[0];
      if (ext === 'scss'
        || ext === 'css'
        || name === 'version.js'
        || name === 'lesson.js'
        || name === '.DS_Store'
      ) {
        return;
      }
      times.push(stat.mtime)
      // console.log(name, stat.mtime)
    }
  });
  return times.sort((a,b) => {
    return new Date(b) - new Date(a);
    })[0];
}

function createSiteMap(lessonsPath, staticPath) {
  const lessons = pathTools.getAllLessons(lessonsPath);
  let outStr = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.thisiget.com/</loc>
    <lastmod>2019-06-07</lastmod>
  </url>`;

  lessons.forEach((lessonPath) => {
    const absoluteDetailsPath = `${process.cwd()}/${lessonPath}/details.js`;
    const detailsPathRelativeToCWD = path.relative(process.cwd(), absoluteDetailsPath);
    const detailsPathRelativeToThisFile = `./${path.relative(__dirname, absoluteDetailsPath)}`;
    if (fs.existsSync(detailsPathRelativeToCWD)) {
      /* eslint-disable global-require, import/no-dynamic-require */
      // $FlowFixMe
      const details = require(detailsPathRelativeToThisFile);
      if (details.enabled === false) {
        return
      }
    }
    const versions = pathTools.getAllVersions(lessonPath);
    versions.forEach((versionPath) => {
      const topic = versionPath.split('/').slice(-2, -1)[0];
      if (topic === 'quickReference') {
        return
      }
      // console.log(versionPath)
      const d = getFiles(versionPath)
      // console.log(d)
      // console.log('')
      const vPath = versionPath.replace(/^.*\/Lessons\//, '')
      const url = `https://www.thisiget.com/Lessons/${vPath}/`
      // console.log(url)
      outStr = `${outStr}\n  <url>`;
      outStr = `${outStr}\n    <loc>${url}</loc>`;
      outStr = `${outStr}\n    <lastmod>${(new Date(d)).toISOString()}</lastmod>`;
      outStr = `${outStr}\n  </url>`;
    })
  });
  outStr = `${outStr}\n</urlset>`
  fs.writeFile(`${staticPath}/sitemap.xml`, outStr, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
  // console.log(outStr)
}

createSiteMap('./src/Lessons', './app/app/static/');
// module.exports = createSiteMap;
