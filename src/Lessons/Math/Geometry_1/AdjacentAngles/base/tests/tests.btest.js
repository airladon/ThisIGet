/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import {
  tester, contentSectionCount,
} from '../../../../../testers/presentationLessonTester';

tester({
  path: __dirname.split('/').slice(-3, -1).join('/'),
  explanation: 3,
  summary: 1,
  // extraTests: [
  //   ['explanation', 3, [1, 5]],
  // ],
});
