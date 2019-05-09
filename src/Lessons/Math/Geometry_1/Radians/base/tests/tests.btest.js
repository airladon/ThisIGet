/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../testers/presentationLessonTester';

tester(
  {
    pages: {
      5: { threshold: { next: 0.001, prev: 0.001 } },
    },
  },
  'explanation',
  'summary',
  // [
  //   ['explanation', 3, [6, 3]],
  // ],
);
