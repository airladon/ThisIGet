/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationFormatTester';

tester(
  {
    pages: {
      4: { threshold: { next: 0.0001, prev: 0.0001, goto: 0.0001 } },
      5: { threshold: { next: 0.0001, prev: 0.0001, goto: 0.0001 } },
    },
  },
  'goto',
  'nextPrev',
);
