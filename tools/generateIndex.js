// console.log(__dirname)
// console.log(__dirname.replace(/thisiget\/.*/, 'thisiget'));
const getLessons = require('../containers/dev/createIndex.js');
getLessons.createLessonIndex('stage', './src/Lessons');
