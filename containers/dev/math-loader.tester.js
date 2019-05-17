// Run 'node containers/dev/math-loader.tester.js' to run tester
// This simply tests the mock math loader - its rough and needs to be updated
// to jest in the future.
const mathloader = require('./math-loader.mock.tester.js');

const callback = (a, b, c, d) => {
  console.log(b);
}

const c = async () => {
  const a = 'hello $$e = mc^2$$ there';
  await mathloader(callback, a)
};

c();
