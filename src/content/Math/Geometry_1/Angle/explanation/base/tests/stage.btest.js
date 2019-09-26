/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationFormatTester';

tester(
  {
    pages: {
      4: { threshold: { next: 10, prev: 10, goto: 10 } },
      5: { threshold: { next: 10, prev: 10, goto: 10 } },
    },
  },
  'goto',
  // 'nextPrev',
);
