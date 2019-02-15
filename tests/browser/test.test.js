import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
// const testMode = process.env.TIG_MODE || 'test';
const username = process.env.TIG_USERNAME || 'test_user_001';
const password = process.env.TIG_PASSWORD || '12345678';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
  // test('Home Page', async () => {
  //   jest.setTimeout(10000);
  //   await page.goto(sitePath);
  //   await sleep(3000);
  //   await page.goto(sitePath);
  //   await page.setViewport({ width: 500, height: 1500 });
  //   const image = await page.screenshot();
  //   expect(image).toMatchImageSnapshot();
  // });

  test('Create Account Page', async () => {
    jest.setTimeout(20000);
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
    jest.setTimeout(10000);
    // Home page, not logged in
    await page.goto(sitePath);
    await page.setViewport({ width: 500, height: 800 });

    // Click on login
    let [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('#id_navbar_loginout'),
    ]);
    expect(response.status()).toBe(200);

    // Fill in login form and submit
    await page.type('#username_or_email', username);
    await page.type('#password', password);
    let image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
    [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('#submit'),
    ]);
    expect(response.status()).toBe(200);

    // Should go back to home page logged in
    // Cookies should show username that is logged in
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
    let cookies = await page.cookies();
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      if (cookie.name === 'username') {
        expect(cookie.value).toBe(username);
        break;
      }
    }

    // Click on Logout
    await Promise.all([
      page.waitForSelector('#id_navbar_loginout_list'),
      page.click('#id_navbar_loginout'),
    ]);
    // expect(response.status()).toBe(200);
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
    [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('#id_navbar_loginout_list'),
    ]);
    expect(response.status()).toBe(200);
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
    cookies = await page.cookies();
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      if (cookie.name === 'username') {
        expect(cookie.value).toBe('');
        break;
      }
    }
    // cookies.forEach(cookie) {
    //   if(cookie.name === 'username') {
    //     expect(cookie.value).toBe(username)
    //   }
    // }
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
