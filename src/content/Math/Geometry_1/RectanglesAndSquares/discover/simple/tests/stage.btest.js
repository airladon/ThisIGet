/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  { width: 700, threshold: 0.0001 },
  {
    width: 700, height: 400, includeQRs: true, threshold: 0.0001,
  },
  { width: 300, threshold: 0.0001 },
  {
    width: 300, height: 400, includeQRs: true, threshold: 0.0001,
  },
);
