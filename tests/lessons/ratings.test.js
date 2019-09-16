/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
// import getTopicIndez from '../../src/content/common/lessonindex';
import getTopicIndex from '../../src/content/topicIndex';

const fs = require('fs');
const fetch = require('node-fetch');

const retest = 3;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return { status: 'fetch error' };
  }
};

function getAddress() {
  const content = fs.readFileSync('/opt/app/tests/lessons/tig_address', 'utf8');
  return content.slice(0, -1);      // remove the carrige return
}

const sitePath = getAddress();

const allTests = [];
const topics = getTopicIndex();
Object.keys(topics).forEach((topicUID) => {
  const topic = topics[topicUID];
  // const { uid } = topic;
  Object.keys(topic.approaches).forEach((approachUID) => {
    Object.keys(topic.approaches[approachUID]).forEach((versionUID) => {
      if (approachUID !== 'quickReference') {
        allTests.push([topicUID, approachUID, versionUID]);
      }
    });
  });
  // Object.keys(lesson.versions).forEach((version) => {
  //   const { topics } = lesson.versions[version];
  //   topics.forEach((topic) => {
  //     if (topic !== 'dev') {
  //       allTests.push([uid, topic, version]);
  //     }
  //   });
  // });
});

describe('Lesson ratings', () => {
  test.each(allTests)(
    '%s/%s/%s', async (uid, topic, version) => {
      jest.setTimeout(120000);
      let testNumber = 0;
      let result = { status: '' };
      while (result.status !== 'ok' && testNumber < retest) {
        // eslint-disable-next-line no-await-in-loop
        result = await getData(`${sitePath}/getVersionRating/${uid}/${topic}/${version}`);
        testNumber += 1;
        if (result.status !== 'ok') {
          // eslint-disable-next-line no-await-in-loop
          await sleep(1000);
        }
      }
      expect(result.status).toBe('ok');
    },
  );
});

