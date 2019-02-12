import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.WEBSITE_ADDRESS || 'http://host.docker.internal:5003';
const testMode = process.env.TEST_MODE || 'test';


describe('Visual Regressions', () => {
  // beforeAll(async () => {
  //   await page.goto(sitePath);
  //   await page.setViewport({ width: 500, height: 1500 });
  // });
  // test('Title is "This I Get"', async () => {
  //   // if (testMode === 'prod') { return; }
  //   // await console.log(page.title())
  //   // const text = await page.evaluate(() => document.body.textContent);
  //   await page.goto(sitePath);
  //   await page.setViewport({ width: 500, height: 1500 });
  //   await expect(page.title()).resolves.toMatch('This I Get');
  // });
  test('Home Page', async () => {
    await page.goto(sitePath);
    await page.setViewport({ width: 500, height: 1500 });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  test('Create Account Page', async () => {
    await page.goto(`${sitePath}/createAccount`);
    await page.setViewport({ width: 500, height: 800 });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  test('Reset Password Page', async () => {
    await page.goto(`${sitePath}/resetPasswordRequest`);
    await page.setViewport({ width: 500, height: 800 });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  test('Login Page', async () => {
    await page.goto(`${sitePath}/login`);
    await page.setViewport({ width: 500, height: 800 });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });

  test('Angles Lesson Page 1', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Angle/base/explanation`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });
    const image = await page.screenshot({ path: 'anglesPage1.png' });
    expect(image).toMatchImageSnapshot();
  });
  test('Angles Lesson Page 6', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Angle/base/explanation`;
    await page.goto(`${anglesPath}?page=6`);
    await page.setViewport({ width: 600, height: 800 });
    const image = await page.screenshot({ path: 'anglesPage6.png' });
    expect(image).toMatchImageSnapshot();
  });
});

describe('Login Flows', () => {
  test('Login Page', async () => {
    await page.goto(sitePath);
    await page.setViewport({ width: 500, height: 800 });
    const [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('#id_navbar_loginout'),
    ]);
    expect(response.status()).toBe(200);
    // const image = await page.screenshot();
    // expect(image).toMatchImageSnapshot();
  });
});

// const anglesPath = `${sitePath}/Lessons/Math/Geometry_1/Angle/base/explanation`;

// describe('Angles Lesson', () => {
//   beforeAll(async () => {
//     await page.goto(anglesPath);
//     await page.setViewport({ width: 600, height: 800 });
//   });
//   // it('Should be titled "This I Get"', async () => {
//   //   // if (testMode === 'prod') { return; }
//   //   // await console.log(page.title())
//   //   // const text = await page.evaluate(() => document.body.textContent);
//   //   await expect(page.title()).resolves.toMatch('This I Get');
//   // });
//   it('Page 1 should have no visutal regression', async () => {
//     // await jestPuppeteer.debug();
//     // const text = await page.evaluate(() => document.body.textContent);
//     // console.log(anglesPath)
//     // console.log(text)
//     await page.goto(anglesPath);
//     await page.setViewport({ width: 600, height: 800 });
//     const image = await page.screenshot({ path: 'anglesPage1.png' });
//     expect(image).toMatchImageSnapshot();
//   });
//   it('Page 6 should have no visutal regression', async () => {
//     await page.goto(`${anglesPath}?page=6`);
//     await page.setViewport({ width: 600, height: 800 });
//     const image = await page.screenshot({ path: 'anglesPage6.png' });
//     expect(image).toMatchImageSnapshot();
//   });
// });


// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
//   const page = await browser.newPage();
//   await page.goto('https://www.google.com');
//   await page.screenshot({ path: 'google1.png' });

//   await browser.close();
// })()
