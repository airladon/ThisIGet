/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import version from '../version';
import details from '../../../details';

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

describe(`${details.uid} - ${version.uid}`, () => {
  test('Top of page', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/explanation/singlePage`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 200 });
    await page.evaluate(() => {
      window.scrollTo(0, 200);
    });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: '01_Scroll-top',
    });
  });

  test('Middle of page', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/explanation/singlePage`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: '02_Scroll-Middle',
    });
  });
});
