/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const lessonUID = require.resolve('../../../details').split('/').slice(-2, -1)[0];
const versionUID = require.resolve('../version').split('/').slice(-2, -1)[0];
const topic = require.resolve('./version').split('/').slice(-3, -2)[0];

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

describe(`${lessonUID} - ${versionUID}`, () => {
  test('All', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/${lessonUID}/${topic}/${versionUID}`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 2900 });
    await page.evaluate(() => {
      window.scrollTo(0, 200);
    });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'All',
    });
  });
});
