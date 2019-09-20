/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  { width: 700, threshold: 0.0005 },
  {
    width: 700, height: 450, includeQRs: true, threshold: 0.0005,
  },
  { width: 300, threshold: 0.0005 },
  {
    width: 300, height: 450, includeQRs: true, threshold: 0.0005,
  },
);
