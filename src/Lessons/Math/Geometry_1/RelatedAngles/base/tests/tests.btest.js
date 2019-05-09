/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../testers/presentationLessonTester';

tester(
  {
    pages: {
      15: { threshold: { next: 0.005, prev: 0.005 } },
      16: { threshold: { next: 0.005, prev: 0.005 } },
    },
  },
  'explanation',
  'summary',
  // [
  //   ['explanation', 20, [20]],
  //   ['explanation', 19, [21, 20]],
  // ],
);
