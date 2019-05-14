/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import version from '../version';
import details from '../../details';

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

describe(`${details.details.uid} - ${version.details.uid}`, () => {
  test('All', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/RightAngleTriangles/pythagorus_proof/explanation`;
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
