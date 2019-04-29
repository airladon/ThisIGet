/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const lessonPath = 'areaTriangle/base';
const topics = {
  explanation: 61,
  summary: 1,
};

const sitePath = process.env.TIG__ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });


const gotoTests = [];
const navigationTests = [];
Object.keys(topics).forEach((topicName) => {
  const numPages = topics[topicName];
  navigationTests.push([topicName, numPages]);
  for (let i = 1; i <= numPages; i += 1) {
    gotoTests.push([topicName, i]);
  }
});

describe(`${lessonPath}`, () => {
  test.each(gotoTests)(
    'Goto - %s Page %i',
    async (t, p) => {
      const anglesPath =
        `${sitePath}/Lessons/Math/Geometry_1/${lessonPath}/${t}?page=${p}`;
      await page.goto(anglesPath);
      await page.setViewport({ width: 600, height: 400 });
      await page.evaluate(() => {
        window.scrollTo(0, 180);
      });

      await page.waitForFunction('window.presentationLessonTransitionStatus === "steady"');

      const image = await page.screenshot({ path: `page${p}.png` });
      expect(image).toMatchImageSnapshot({
        failureThreshold: '0.005',             // 480 pixels
        failureThresholdType: 'percent',
        customSnapshotIdentifier: `${t} page ${p}`,
      });
    },
  );
  test.each(navigationTests)(
    'Navigation - %s',
    async (t, numP) => {
      jest.setTimeout(120000);
      const anglesPath =
        `${sitePath}/Lessons/Math/Geometry_1/${lessonPath}/${t}?page=1`;
      await page.goto(anglesPath);
      await page.setViewport({ width: 600, height: 400 });
      await page.evaluate(() => {
        window.scrollTo(0, 180);
      });

      let p = 1;
      let navigation = 'lesson__button-next';
      for (let j = 1; j < numP * 2; j += 1) {
        if (j > numP) {
          p = numP - (j - numP);
        } else {
          p = j;
        }
        if (j < numP) {
          navigation = 'lesson__button-next';
        } else {
          navigation = 'lesson__button-previous';
        }

        // Wait for steady state
        const steadyWatch = page.waitForFunction('window.presentationLessonTransitionStatus === "steady"');
        // eslint-disable-next-line no-await-in-loop
        await steadyWatch;

        // Take screenshot
        // eslint-disable-next-line no-await-in-loop
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
          failureThreshold: '0.005',             // 480 pixels
          failureThresholdType: 'percent',
          customSnapshotIdentifier: `${t} page ${p}`,
        });

        const watchDog = page.waitForFunction(() => {
          if (window.frameCounter == null) {
            window.frameCounter = 0;
          }
          window.frameCounter += 1;
          if (window.frameCounter === 30) {
            window.frameCounter = 0;
            return true;
          }
          return false;
        }, { polling: 'raf' });
        if (numP > 1) {
          // eslint-disable-next-line no-await-in-loop
          const hrefElement = await page.$(`#${navigation}`);
          // eslint-disable-next-line no-await-in-loop
          await hrefElement.click();
          // eslint-disable-next-line no-await-in-loop
          await page.mouse.click(0, 0);
          // eslint-disable-next-line no-await-in-loop
          await watchDog;
        }
      }
    },
  );
});
