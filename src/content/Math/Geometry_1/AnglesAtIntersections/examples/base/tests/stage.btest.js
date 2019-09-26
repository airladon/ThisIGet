/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  { width: 700, threshold: 10 },
  {
    width: 700, threshold: 10, height: 450, includeQRs: true,
  },
  { width: 300, threshold: 10 },
  {
    width: 300, threshold: 10, height: 450, includeQRs: true,
  },
);
