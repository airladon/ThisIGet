/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  { width: 700, threshold: 2000, height: 1190 },
  { width: 300, threshold: 2000, height: 1330 },
);
