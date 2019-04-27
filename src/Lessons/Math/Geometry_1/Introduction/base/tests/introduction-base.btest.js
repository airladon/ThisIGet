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
      await page.setViewport({ width: 600, height: 800 });
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      await sleep(t);

      const image = await page.screenshot({ path: `page${p}.png` });
      expect(image).toMatchImageSnapshot();
    },
  );
});
