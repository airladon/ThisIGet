/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/singlePageTester';

tester(
  { width: 700, height: 810, threshold: 0.05 },
  { width: 300, height: 950, threshold: 0.05 },
);