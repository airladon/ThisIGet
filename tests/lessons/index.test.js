/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import getLessonIndex from '../../src/Lessons/LessonsCommon/lessonindex';

const fetch = require('node-fetch');

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return { status: 'fetch error' };
  }
};

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';

// export default function ratingTester(...topics) {
//   const fullPath = module.parent.filename.split('/').slice(0, -1).join('/');
//   const uid = fullPath.split('/').slice(-3, -2);
//   const version = fullPath.split('/').slice(-2, -1);
//   const allTests = [];
//   topics.forEach((topic) => {
//     allTests.push([topic]);
//   });
//   describe(`Ratings tester ${uid}/${version}`, () => {
//     test.each(allTests)('%s', async (topic) => {
//       const result = await getData(`${sitePath}/rating/${uid}/${topic}/${version}`);
//       console.log(result)
//       expect(result.status).toBe('ok');
//     });
//   });
// }

const allTests = [];
const index = getLessonIndex();
Object.keys(index).forEach((lessonName) => {
  const lesson = index[lessonName];
  const { uid } = lesson;
  Object.keys(lesson.versions).forEach((version) => {
    const { topics } = lesson.versions[version];
    topics.forEach((topic) => {
      if (topic !== 'dev') {
        allTests.push([uid, topic, version]);
      }
    });
  });
});

describe('Lesson ratings', () => {
  test.each(allTests)(
    '%s/%s/%s', async (uid, topic, version) => {
      const result = await getData(`${sitePath}/rating/${uid}/${topic}/${version}`);
      // console.log(result)
      expect(result.status).toBe('ok');
    },
  );
});

