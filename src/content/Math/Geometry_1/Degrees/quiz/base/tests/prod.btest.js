/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  { width: 700, height: 790, threshold: 0.05 },
);