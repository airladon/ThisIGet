/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  { width: 700, includeQRs: true, threshold: 500 },
  { width: 300, includeQRs: true, threshold: 300 },
);
