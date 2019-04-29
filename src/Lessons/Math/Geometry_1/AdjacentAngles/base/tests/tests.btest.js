/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../testers/presentationLessonTester';

// tester({
//   path: __dirname.split('/').slice(-3, -1).join('/'),
//   explanation: contentSectionCount(__dirname, 'explanation'),
//   summary: contentSectionCount(__dirname, 'summary'),
//   // extraTests: [
//   //   ['explanation', 3, [1, 5]],
//   // ],
// });


tester(
  __dirname,
  'explanation',
  'summary',
  [
    ['explanation', 3, [1, 5]],
  ],
);
