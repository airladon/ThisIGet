/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import version from '../version';
import details from '../../details';

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// const pageTest = async (path, fileName, delay = 0, scrollTo = 0) => {
//   const url = `${sitePath}/${path}`;
//   await page.goto(url);
//   await page.setViewport({ width: 600, height: 800 });
//   await page.evaluate(() => {
//     window.scrollTo(0, scrollTo);
//   });
//   sleep(delay);
//   const image = await page.screenshot({ path: `${fileName}.png` });
//   expect(image).toMatchImageSnapshot();
// };

describe(`${details.details.uid} - ${version.details.uid}`, () => {
  // let pageTest;
  // beforeEach(() => {
  //   pageTest = async (path, fileName, delay = 0, scrollTo = 0) => {
  //     const url = `${sitePath}/${path}`;
  //     await page.goto(url);
  //     await page.setViewport({ width: 600, height: 800 });
  //     await page.evaluate(() => {
  //       window.scrollTo(0, scrollTo);
  //     });
  //     const image = await page.screenshot({ path: `${fileName}.png` });
  //     expect(image).toMatchImageSnapshot();
  //   };
  // });
  test('Top of page', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/singlePage/explanation`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });
    await page.evaluate(() => {
      window.scrollTo(0, 180);
    });
    const image = await page.screenshot({ path: 'top.png' });
    expect(image).toMatchImageSnapshot();
    // pageTest(
    //   '/Lessons/Math/Geometry_1/Introduction/singlePage/explanation',
    //   'top',
    // );
  });

  test('Middle of page', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/singlePage/explanation`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    const image = await page.screenshot({ path: 'middle.png' });
    expect(image).toMatchImageSnapshot();
    // pageTest(
    //   '/Lessons/Math/Geometry_1/Introduction/singlePage/explanation',
    //   'middle', 0, 500);
  });
});
