/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../tests/parent.btest';

tester({
  path: 'adjacentAngles/base',
  explanation: 6,
  summary: 1,
  extraTests: [
    ['explanation', 3, [1, 5]],
  ],
});
