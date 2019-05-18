/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import tester from '../../../../../../testers/presentationLessonTester';

tester(
  {
    pages: {
      1: { threshold: { next: 0.003, prev: 0.003 } },
    },
  },
  'goto',
  'nextPrev',
);
