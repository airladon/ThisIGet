import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Introduction Base Lesson', () => {
  test('Page 1', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=1`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });
    const image = await page.screenshot({ path: 'introduction.png' });
    expect(image).toMatchImageSnapshot();
  });
  test('Page 8', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=8`;
    // await page._client.send('Animation.setPlaybackRate', { playbackRate: 4.0 });
    await page.goto(anglesPath);

    await page.setViewport({ width: 600, height: 800 });
    sleep(1000)
    const image = await page.screenshot({ path: 'page8.png' });
    expect(image).toMatchImageSnapshot();
  });
  // test('Angles Lesson Page 6', async () => {
  //   const anglesPath =
  //     `${sitePath}/Lessons/Math/Geometry_1/Angle/base/explanation`;
  //   await page.goto(`${anglesPath}?page=6`);
  //   await page.setViewport({ width: 600, height: 800 });
  //   const image = await page.screenshot({ path: 'anglesPage6.png' });
  //   expect(image).toMatchImageSnapshot();
  // });
});
