/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationFormatTester';

tester(
  {
    pages: {
      5: { threshold: { next: 0.002, prev: 0.002 } },
    },
  },
  'goto',
  // 'nextPrev',
);
