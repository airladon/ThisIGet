/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationLessonTester';

tester(
  {
    pages: {
      28: { threshold: { next: 0.0001, prev: 0.0001 } },
      32: { threshold: { next: 0.0001, prev: 0.0001 } },
      33: { threshold: { next: 0.0001, prev: 0.0001 } },
      34: { threshold: { next: 0.0001, prev: 0.005 } },
      35: { threshold: { next: 0.0001, prev: 0.005 } },
      36: { threshold: { next: 0.0001, prev: 0.0001 } },
      37: { threshold: { next: 0.0002, prev: 0.0002 } },
      39: { threshold: { next: 0.0001, prev: 0.0001 } },
      47: { threshold: { next: 0.0001, prev: 0.0001 } },
      52: { threshold: { next: 0.0001, prev: 0.0001 } },
      55: { threshold: { next: 0.0001, prev: 0.0001 } },
    },
  },
  // 'goto',
  // 'nextPrev',
  // [50, [55, 54]],
  [53, [54, 53]],
);
