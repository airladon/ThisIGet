/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../testers/presentationLessonTester';

tester(
  [
    ['summary', 1, [1]],
    ['explanation', 1, [1]],
  ],
);
