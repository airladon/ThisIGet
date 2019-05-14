/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationLessonTester';

tester(
  'goto',
  'nextPrev',
  3,
  [1, 5, 3, 6],
);
