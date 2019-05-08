/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../testers/presentationLessonTester';

tester(
  {
    pages: {
      27: { threshold: 0.00005 },
    },
  },
  'explanation',
  'summary',
  // [
  //   ['explanation', 26, [28, 26]],
  // ],
);
