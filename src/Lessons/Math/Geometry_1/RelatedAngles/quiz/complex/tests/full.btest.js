/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  { width: 700, threshold: 0.05, height: 1190 },
  { width: 300, threshold: 0.05, height: 1330 },
);
