import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
// const testMode = process.env.TIG_MODE || 'test';
const username = process.env.TIG_USERNAME || 'test_user_001';
const password = process.env.TIG_PASSWORD || '12345678';

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

describe('Visual Regressions', () => {
  // beforeAll(async () => {
  //   await page.goto(sitePath);
  //   await page.setViewport({ width: 500, height: 1500 });
  // });
  test('Create Account Page', async () => {
    jest.setTimeout(20000);
    await page.goto(`${sitePath}/createAccount`);
    await page.setViewport({ width: 500, height: 800 });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-create-account',
    });
  });

  test('Reset Password Page', async () => {
    await page.goto(`${sitePath}/resetPasswordRequest`);
    await page.setViewport({ width: 500, height: 800 });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-reset-password',
    });
  });

  test('Login Page', async () => {
    await page.goto(`${sitePath}/login`);
    await page.setViewport({ width: 500, height: 800 });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-login-page',
    });
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
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-login-flow-0-filled',
    });
    [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('#submit'),
    ]);
    expect(response.status()).toBe(200);

    // Should go back to home page logged in
    // Cookies should show username that is logged in
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-login-flow-1-logged-in',
    });
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
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-login-flow-2-click-logout',
    });
    [response] = await Promise.all([
      page.waitForNavigation(),
      // page.click('#id_navbar_loginout_list'),
      page.click('.dropdown_button_list_item_link'),
    ]);
    expect(response.status()).toBe(200);
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-login-flow-3-click-logged-out',
    });
    cookies = await page.cookies();
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i];
      if (cookie.name === 'username') {
        expect(cookie.value).toBe('');
        break;
      }
    }
  });
});

