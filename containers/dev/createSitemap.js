const fs = require('fs');
const path = require('path');
const pathTools = require('./pathTools.js');

function createSiteMap(lessonsPath, staticPath) {
  const lessons = pathTools.getAllLessons(lessonsPath);
  let outStr = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.thisiget.com/</loc>
    <lastmod>2019-06-07</lastmod>
  </url>`;

  lessons.forEach((lessonPath) => {
    const versions = pathTools.getAllVersions(lessonPath);
    versions.forEach((versionPath) => {
      const topic = versionPath.split('/').slice(-2, -1)[0];
      if (topic !== 'quickReference') {
        const vPath = versionPath.replace(/^.*\/Lessons\//, '')
        const url = `https://www.thisiget.com/Lessons/${vPath}/`
        // console.log(url)
        outStr = `${outStr}\n  <url>`;
        outStr = `${outStr}\n    <loc>${url}</loc>`;
        outStr = `${outStr}\n    <lastmod>2019-06-07</lastmod>`;
        outStr = `${outStr}\n  </url>`;
      }
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

// createSiteMap('./src/Lessons', './app/app/static/');
module.exports = createSiteMap;
