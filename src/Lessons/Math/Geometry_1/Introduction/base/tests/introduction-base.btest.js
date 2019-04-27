/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const sitePath = process.env.TIG__ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const numPages = 16;
const pagesWithAnimations = [6, 8];
const pages = [];
for (let i = 1; i <= numPages; i += 1) {
  let time = 100;
  if (pagesWithAnimations.indexOf(i) > -1) {
    time = 3500;
  }
  pages.push([i, time]);
}

describe('Introduction Base Lesson', () => {
  test.each(pages)(
    'Page %i, time: %i',
    async (p, t) => {
      const anglesPath =
        `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=${p}`;
      await page.goto(anglesPath);
      await page.setViewport({ width: 600, height: 400 });
      await page.evaluate(() => {
        window.scrollTo(0, 180);
      });
      await sleep(t);

      const image = await page.screenshot({ path: `page${p}.png` });
      expect(image).toMatchImageSnapshot();
    },
  );
  test.only('Navigation', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=1`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 400 });
    await page.evaluate(() => {
      window.scrollTo(0, 180);
    });


    // let cookies;
    // await page.cookies()
    //   .then((c) => { cookies = c; });

    // const p = cookies.filter(c => c.name === 'page');
    // console.log(p[0].value)

    let p = -1;
    await page.cookies()
      .then(cookies => cookies.filter(c => c.name === 'page'))
      .then((pageCookie) => { p = pageCookie[0].value; });

    console.log(p);

    let classList;
    // while (classList.indexOf('lesson__button-next-disabled') === -1) {
    await page.$('#lesson__button-next')
      .then(el => el.getProperty('className'))
      .then(cn => cn.jsonValue())
      .then(classNameString => classNameString.split(' '))
      .then((x) => { classList = x; });
    console.log(classList)

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
    const hrefElement = await page.$('#lesson__button-next');
    await hrefElement.click();
    await watchDog;


    // }
    const image = await page.screenshot({ path: `nextPage${1}.png` });
    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.002',             // 480 pixels
      failureThresholdType: 'percent',
      customSnapshotIdentifier: `test`,
    });
  });
});
