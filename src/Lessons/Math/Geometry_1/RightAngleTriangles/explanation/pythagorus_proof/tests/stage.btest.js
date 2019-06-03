/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  {
    width: 300, height: 2500, scrollTo: 290, includeQRs: false,
  },
  {
    width: 300, height: 500, scrollTo: 290, includeQRs: true,
  },
  {
    width: 700, height: 3000, scrollTo: 200, includeQRs: false,
  },
);
