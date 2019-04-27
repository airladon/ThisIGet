/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const sitePath = process.env.TIG__ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const numPages = 16;
// const pagesWithAnimations = [6, 8];
const pages = [];
for (let i = 1; i <= numPages; i += 1) {
  pages.push([i]);
}

describe('Introduction Base Lesson', () => {
  test.each(pages)(
    'Page %i, time: %i',
    async (p) => {
      const anglesPath =
        `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=${p}`;
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
        customSnapshotIdentifier: `page ${p}`,
      });
    },
  );
  test('Navigation', async () => {
    jest.setTimeout(30000);
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=1`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 400 });
    await page.evaluate(() => {
      window.scrollTo(0, 180);
    });

    for (let j = 1; j <= numPages; j += 1) {
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
        customSnapshotIdentifier: `page ${j}`,
      });

      if (j < numPages) {
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
        // eslint-disable-next-line no-await-in-loop
        const hrefElement = await page.$('#lesson__button-next');
        // eslint-disable-next-line no-await-in-loop
        await hrefElement.click();
        // eslint-disable-next-line no-await-in-loop
        await page.mouse.click(0, 0);
        // eslint-disable-next-line no-await-in-loop
        await watchDog;
      }
    }
    // let disabled = false;
    // // let lastPage = -1;
    // // let state = 'next';
    // while (!disabled) {
    //   let pageNumber = -1;
    //   // eslint-disable-next-line no-await-in-loop
    //   await page.cookies()
    //     .then(cookies => cookies.filter(c => c.name === 'page'))
    //     .then((pageCookie) => { pageNumber = pageCookie[0].value; });


    //   let classList = [];
    //   // eslint-disable-next-line no-await-in-loop
    //   await page.$('#lesson__button-next')
    //     .then(el => el.getProperty('className'))
    //     .then(cn => cn.jsonValue())
    //     .then(classNameString => classNameString.split(' '))
    //     // eslint-disable-next-line no-loop-func
    //     .then((x) => { classList = x; });

    //   disabled = classList.indexOf('lesson__button-next-disabled') > -1;
  });
});
