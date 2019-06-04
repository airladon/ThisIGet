/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  {
    width: 300, height: 680, scrollTo: 280,
  },
  {
    width: 700, height: 550, scrollTo: 200,
  },
);
