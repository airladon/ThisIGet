/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import version from '../version';
import details from '../../details';

const sitePath = process.env.TIG__ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

describe(`${details.details.uid} - ${version.details.uid}`, () => {
  test('Top of page', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/singlePage/explanation`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    const image = await page.screenshot({ path: 'top.png' });
    expect(image).toMatchImageSnapshot();
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
  });
});
