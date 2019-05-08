/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../testers/presentationLessonTester';

tester(
  {
    pages: {
      27: { threshold: 0.000025 },
    },
  },
  'explanation',
  'summary',
  // [
  //   ['explanation', 14, [16]],
  // ],
);
