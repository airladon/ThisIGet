const fs = require('fs');
const lessonTools = require('../containers/dev/getLessons');

const lessons = lessonTools.getAllLessons('./src/Lessons');

lessons.forEach((lessonPath) => {
  const shortPath = lessonPath.replace(/src/, '');
  const detailsPath = `./${lessonPath}/details.js`;
  if (fs.existsSync(detailsPath)) {
    const details = require(`../${lessonPath}/details.js`);
    const { title } = details.details;
    const { dependencies } = details.details;
    const { uid } = details.detail;
    console.log(title);
    }
});

