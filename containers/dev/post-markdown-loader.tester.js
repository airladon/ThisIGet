// Run 'node containers/dev/math-loader.tester.js' to run tester
// This simply tests the mock math loader - its rough and needs to be updated
// to jest in the future.
const linkLoader = require('./post-markdown-loader.js');

// const callback = (a, b, c, d) => {
//   console.log(a, b, c, d);
// }

const c = async () => {
  const a = `
  This is a test
  <hint>so is this</hint>
  <hintLow>
    so is this
  </hintLow>
  <hint>so is this</hint>
  So there
  `;
  await linkLoader(a);
};

c();
