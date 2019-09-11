// console.log(__dirname)
// console.log(__dirname.replace(/thisiget\/.*/, 'thisiget'));
const createTopicIndex = require('../containers/dev/createIndex.js');

createTopicIndex('stage', './src/content');
