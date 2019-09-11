/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationFormatTester';

tester(
  {
    pages: {
      15: { threshold: { next: 0.01, prev: 0.01, goto: 0.006 } },
      16: { threshold: { next: 0.01, prev: 0.01, goto: 0.006 } },
    },
  },
  'goto',
  // 'nextPrev',
);
