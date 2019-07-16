// Run 'node containers/dev/math-loader.tester.js' to run tester
// This simply tests the mock math loader - its rough and needs to be updated
// to jest in the future.
const linkLoader = require('./quiz-loader.js');

// const callback = (a, b, c, d) => {
//   console.log(a, b, c, d);
// }

const c = async () => {
  const a = `
  This is a test
  <quiz multichoice id="asdf">
  - Hello
  + World
   - there
  </quiz>
  so here it is
  $|asdf|$
  <quiz entryInteger id="fasdf">4</quiz>
  <quiz entryInteger>3</quiz>
  `;
  await linkLoader(a);
};

c();
