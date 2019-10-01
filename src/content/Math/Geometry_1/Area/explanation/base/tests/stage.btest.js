/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationFormatTester';
import thresholds from './thresholds';

tester(
  { thresholds },
  'goto',
);

tester({ element: 'body', prefix: 'full ', thresholds }, 1);
