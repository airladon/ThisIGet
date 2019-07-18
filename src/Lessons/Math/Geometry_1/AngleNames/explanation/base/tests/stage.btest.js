/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationLessonTester';

tester(
  {
    pages: {
      1: { threshold: 0.006 },
    },
  },
  'goto',
  // 'nextPrev',
);
