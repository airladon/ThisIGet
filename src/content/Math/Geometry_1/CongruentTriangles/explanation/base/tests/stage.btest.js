/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationFormatTester';

tester(
  {
    pages: {
      28: { threshold: { next: 10, prev: 10 } },
      32: { threshold: { next: 10, prev: 10 } },
      33: { threshold: { next: 10, prev: 10 } },
      34: { threshold: { next: 10, prev: 0.005 } },
      35: { threshold: { next: 10, prev: 0.005 } },
      36: { threshold: { next: 10, prev: 10 } },
      37: { threshold: { next: 0.0002, prev: 0.0002 } },
      38: { threshold: { goto: 0.0005, next: 0.0005, prev: 0.0005 } },
      39: { threshold: { next: 10, prev: 10 } },
      47: { threshold: { next: 10, prev: 10 } },
      52: { threshold: { next: 10, prev: 10 } },
      54: { threshold: { goto: 0.0005, next: 0.0005, prev: 0.0005 } },
      55: { threshold: { goto: 10, next: 10, prev: 10 } },
    },
  },
  'goto',
  // 'nextPrev',
);
