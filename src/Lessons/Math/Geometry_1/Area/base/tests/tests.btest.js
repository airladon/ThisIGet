/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../testers/presentationLessonTester';

tester(
  {
    pages: {
      39: { threshold: { goto: 0.0002, next: 0.0002, prev: 0.0002 } },
      40: { threshold: { goto: 0.0002, next: 0.0002, prev: 0.0002 } },
      41: { threshold: 0.0001 },
    },
  },
  'explanation',
  'summary',
  // [
  //   ['explanation', 38, [40, 38]],
  // ],
);
