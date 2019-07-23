/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  { width: 700 },
  { width: 700, height: 400, includeQRs: true },
  { width: 300 },
  { width: 300, height: 400, includeQRs: true },
);
