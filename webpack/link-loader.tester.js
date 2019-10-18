// Run 'node containers/dev/math-loader.tester.js' to run tester
// This simply tests the mock math loader - its rough and needs to be updated
// to jest in the future.
const linkLoader = require('./link-loader.js');

// const callback = (a, b, c, d) => {
//   console.log(a, b, c, d);
// }

const c = async () => {
  const a = 'hello [[label1]]((showqr,RightAngleTriangles/base/main,#444)) there [[label2]]((fun2,path2,#333432))';
  await linkLoader(a);
};

c();
