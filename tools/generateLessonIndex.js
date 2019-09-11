// console.log(__dirname)
// console.log(__dirname.replace(/thisiget\/.*/, 'thisiget'));
const createContentIndex = require('../containers/dev/createIndex.js');

createContentIndex('stage', './src/content');
