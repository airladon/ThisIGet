/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../testers/presentationLessonTester';

tester(
  {
    pages: {
      // 28: { threshold: 0.002 },
      32: { threshold: { next: 0.0001, prev: 0.0001 } },
      33: { threshold: { next: 0.0001, prev: 0.0001 } },
      34: { threshold: { next: 0.0001, prev: 0.005 } },
      35: { threshold: { next: 0.0001, prev: 0.005 } },
      36: { threshold: { next: 0.0001, prev: 0.0001 } },
      37: { threshold: { next: 0.0001, prev: 0.0001 } },
      // 39: { threshold: { next: 0.00002, prev: 0.00002 } },
    },
  },
  'explanation',
  'summary',
  // [
  //   ['explanation', 32, [37, 32]],
  // ],
);
