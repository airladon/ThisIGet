/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../testers/presentationLessonTester';

tester(
  // __dirname
  'explanation',
  // 'summary',
  [
    ['explanation', 3, [1, 5]],
  ],
);
