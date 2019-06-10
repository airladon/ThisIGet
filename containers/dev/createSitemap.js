const fs = require('fs');
const path = require('path');
const pathTools = require('./pathTools.js');
// const simpleGit = require('simple-git')
// const { exec } = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


// async function getFileTime(file) {
//   let time = 1;
//   try {
//     const { stdout, stderr } = await exec(`git log -1 --pretty="format:%ci" ${file}`)
//     time = stdout;
//   } catch (err) {
//     console.log(err)
//   }
//   // let time1 = await simpleGit().raw([
//   //   'log',
//   //   '-1',
//   //   '--pretty="format:%ci"',
//   //   file,
//   // ], (err, result) => {
//   //   // console.log(file, new Date(result))
//   //   time = new Date(result)
//   // })
//   // let time1 = await simpleGit().log([
//   //   '-1',
//   //   '--pretty="format:%ci"',
//   //   file
//   // ], (err, result) => {
//   //   console.log(result)}
//   //   time = result
//   // )
//   // console.log()
//   // time = 1

//   // console.log(time1)
//   return time;
// }

async function getFiles(pathDir) {
  let times = [];
  const files = [];
  const dirs = fs.readdirSync(pathDir);
  for (let p = 0; p < dirs.length; p += 1) {
    const name = dirs[p]
  // }
  // fs.readdirSync(pathDir).forEach(async (name) => {
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
      // console.log()
      files.push(filePath)
      // console.log(stdout)

      // console.log(d)
      times.push(stat.mtime)
      // console.log(name, stat.mtime)
    }
  };

  // const promises = [];
  // for (let i = 0; i < files; i += 1) {
  //   // files.forEach(async (file) => {
  //   promises.push(exec(`git log -1 --pretty="format:%ci" ./${file}`));
  // // })  
  // }
  
  // let results = []
  // try {
  //   results = await Promise.all(promises);
  //   times = results.map((r) => r.stdout)
  // } catch (err) {
  //   console.log(err.message)
  // }
  // console.log('asdfasdf')
  // console.log(times)
  // // console.
  // // return (await Promise.all(promises)).sort((a, b) => {
  // //   return new Date(b) - new Date(a);
  // // })[0]
  return times.sort((a,b) => {
    return new Date(b) - new Date(a);
    })[0];
}

async function createSiteMap(lessonsPath, staticPath) {
  // console.log(simpleGit().log(['-1', '--pretty="format:%ci"', 'src/Lessons/Math/Geometry_1/AreaCircle/explanation/base/content.js']))
  let d;
  // d = await getFileTime('./src/Lessons/Math/Geometry_1/AreaCircle/explanation/base/content.js')
  // console.log(d)
  // const { stdout, stderr } = await exec('git log -1 --pretty="format:%ci" ./src/Lessons/Math/Geometry_1/AreaCircle/explanation/base/content.js')
  // console.log(new Date(stdout))

  const lessons = pathTools.getAllLessons(lessonsPath);
  let outStr = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.thisiget.com/</loc>
    <lastmod>2019-06-07</lastmod>
  </url>`;

  for (let l = 0; l < lessons.length; l += 1) {
    const lessonPath = lessons[l];
  // lessons.forEach(async (lessonPath) => {
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
    for (let v = 0; v < versions.length; v += 1) {
      versionPath = versions[v];
    // versions.forEach((versionPath) => {
      const topic = versionPath.split('/').slice(-2, -1)[0];
      if (topic === 'quickReference') {
        return
      }
      try {
        d = await getFiles(versionPath);
      } catch (err) {
        console.log(err)
      }
      // console.log(d)

      const vPath = versionPath.replace(/^.*\/Lessons\//, '')
      const url = `https://www.thisiget.com/Lessons/${vPath}/`
      outStr = `${outStr}\n  <url>`;
      outStr = `${outStr}\n    <loc>${url}</loc>`;
      try {
        outStr = `${outStr}\n    <lastmod>${(new Date(d)).toISOString()}</lastmod>`;
      } catch (err) {
        console.log(err, d)
        console.log(d)
      }
      outStr = `${outStr}\n  </url>`;
    }
  };
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
