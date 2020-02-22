/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  { width: 300, includeQRs: true },
  { width: 700, includeQRs: true },
);
