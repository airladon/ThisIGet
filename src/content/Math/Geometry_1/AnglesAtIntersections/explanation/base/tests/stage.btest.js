/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationFormatTester';

tester(
  {
    pages: {
      15: { threshold: { next: 1300, prev: 1300, goto: 10 } },
      16: { threshold: { next: 1300, prev: 1300, goto: 10 } },
    },
  },
  'goto',
  // 'nextPrev',
);
