/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../testers/presentationLessonTester';

tester(
  {
    pages: {
      1: { threshold: 0.005 },
    },
  },
  'explanation',
  // 'summary',
  // [
  //   ['explanation', 3, [1, 5]],
  // ],
);
