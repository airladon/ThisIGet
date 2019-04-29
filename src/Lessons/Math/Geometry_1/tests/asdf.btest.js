/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
// import { toMatchImageSnapshot } from 'jest-image-snapshot';
import tester from './parent.btest';

const lessons = [
  {
    path: 'areaTriangle/base',
    explanation: 3,
    summary: 1,
  },
  // {
  //   path: 'angle/base',
  //   explanation: 10,
  //   summary: 1,
  // },
];

const allTests = [];
lessons.forEach((lesson) => {
  const { path } = lesson;
  Object.keys(lesson).forEach((topicOrPath) => {
    if (topicOrPath !== 'path') {
      const topicName = topicOrPath;
      const numPages = lesson[topicName];
      for (let i = 1; i < numPages; i += 1) {
        allTests.push([path, topicName, i, [i]]);
      }
      allTests.push([path, topicName, 1, [numPages, 1]]);
    }
  });
});

tester(allTests[0][0], allTests[0][1], allTests[0][2], allTests[0][3]);
