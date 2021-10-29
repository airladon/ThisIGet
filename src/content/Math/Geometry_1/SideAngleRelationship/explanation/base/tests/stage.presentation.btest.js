/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationFormatTester';

tester(
  {
    viewPort: { width: 800 },
    thresholds: {
      pages: {
        14: { next: 300, prev: 300 },
        19: { next: 300, prev: 300 },
        20: { next: 300, prev: 300 },
        18: { next: 300, prev: 300 },
      },
    },
  },
  'goto',
  // 'nextPrev',
);
