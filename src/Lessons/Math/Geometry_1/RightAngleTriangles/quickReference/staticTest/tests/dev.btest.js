/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  {
    prePath: '/dev',
  },
  { width: 300, height: 700, scrollTo: 290, includeQRs: true  },
  { width: 700, height: 700, scrollTo: 200, includeQRs: true  },
);
