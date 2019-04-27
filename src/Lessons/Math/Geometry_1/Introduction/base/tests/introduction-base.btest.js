/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const sitePath = process.env.TIG__ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const numPages = 16;
const pages = [];
for (let i = 1; i <= numPages; i += 1) {
  pages.push([i]);
}
// const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(p => [p]);
describe('Introduction Base Lesson', () => {
  // test('Page 1', async () => {
  //   const anglesPath =
  //     `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=1`;
  //   await page.goto(anglesPath);
  //   await page.setViewport({ width: 600, height: 800 });
  //   await page.evaluate(() => {
  //     window.scrollTo(0, 0);
  //   });
  //   const image = await page.screenshot({ path: 'introduction.png' });
  //   expect(image).toMatchImageSnapshot();
  // });
  // test('Page 9 - drawing', async () => {
  //   const anglesPath =
  //     `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=9`;
  //   await page.goto(anglesPath);
  //   await page.setViewport({ width: 600, height: 800 });
  //   await page.evaluate(() => {
  //     window.scrollTo(0, 0);
  //   });
  //   await sleep(1000);

  //   const image = await page.screenshot({ path: 'page8.png' });
  //   expect(image).toMatchImageSnapshot();
  // });

  // test('Page 12 - textures', async () => {
  //   const anglesPath =
  //     `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=12`;
  //   await page.goto(anglesPath);
  //   await page.setViewport({ width: 600, height: 800 });

  //   await page.evaluate(() => {
  //     window.scrollTo(0, 0);
  //   });
  //   await sleep(1000);
  //   const image = await page.screenshot({ path: 'page12.png' });
  //   expect(image).toMatchImageSnapshot();
  // });

  test.each(pages)(
    'Per page',
    async (p) => {
      const anglesPath =
        `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=${p}`;
      await page.goto(anglesPath);
      await page.setViewport({ width: 600, height: 800 });
      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });
      await sleep(2000);

      const image = await page.screenshot({ path: `page${p}.png` });
      expect(image).toMatchImageSnapshot();
    },
  );
});
