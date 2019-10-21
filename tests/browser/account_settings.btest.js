import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { getEmail } from './email';
import {
  login, gotoAccountSettings, snapshot, logout,
} from './common';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
// const testMode = process.env.TIG_MODE || 'test';
const username = process.env.TIG_USERNAME || 'test_user_002';
const password = process.env.TIG_PASSWORD || '12345678';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* eslint-disable no-await-in-loop */

// async function login() {
//   await page.goto(sitePath);
//   await page.setViewport({ width: 500, height: 2000 });

//   // Click on login
//   await Promise.all([
//     page.waitForNavigation(),
//     page.click('#id_navbar_loginout'),
//   ]);

//   // Fill in login form and submit
//   await page.type('#username_or_email', username);
//   await page.type('#password', password);

//   await Promise.all([
//     page.waitForNavigation(),
//     page.click('#submit'),
//   ]);
// }

describe('Account Settings Flow', () => {
  test('Login Page', async () => {
    jest.setTimeout(10000);
    // Home page, not logged in
    await page.goto(sitePath);
    await page.setViewport({ width: 500, height: 2000 });

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
      customSnapshotIdentifier: 'account-settings-flow-0-filled',
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
      customSnapshotIdentifier: 'account-settings-flow-1-logged-in',
    });

    // Click on Logout
    await Promise.all([
      page.waitForSelector('#id_navbar_loginout_list'),
      page.click('#id_navbar_loginout'),
    ]);
    // expect(response.status()).toBe(200);
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-settings-flow-2-click-signedin',
    });

    const hints = await page.$$('.dropdown_button_list_item_link');
    [response] = await Promise.all([
      page.waitForNavigation(),
      hints[0].click(),
    ]);
    expect(response.status()).toBe(200);
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-settings-flow-3-click-account-settings',
    });

    // Click on Delete
    [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('#delete_form-submit'),
    ]);

    expect(response.status()).toBe(200);
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-settings-flow-4-delete-confirmation',
    });
  });

  test.only('Change Email', async () => {
    jest.setTimeout(60000);
    expect(process.env.MAIL_RECEIVE_SERVER).not.toHaveLength(0);
    expect(process.env.MAIL_RECEIVE_PASSWORD).not.toHaveLength(0);
    expect(process.env.MAIL_RECEIVE_SERVER).not.toHaveLength(0);
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-email-flow-1');

    // Get latest message
    const email = await getEmail();
    const oldMsgNumber = email[0];

    await page.evaluate(() => {
      document.getElementById('email_form-email').value = '';
    });
    await page.type('#email_form-email', 'test_user_002a@thisiget.com');

    // Click on Change and Verify
    await Promise.all([
      page.waitForNavigation(),
      page.click('#email_form-submit_email'),
    ]);

    await snapshot('account-settings-email-flow-2');

    await sleep(2000);
    let [msgNumber, body] = await getEmail();
    let count = 0;
    while (msgNumber === oldMsgNumber && count < 5) {
      await sleep(2000);
      [msgNumber, body] = await getEmail();
      count += 1;
    }

    expect(msgNumber).not.toEqual(oldMsgNumber);
    let [token] = body.match(/confirmEmailChange\/[^\r]*/);
    await page.goto(`${sitePath}/${token}`);
    await snapshot('account-settings-email-flow-3');

    await logout();
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-email-flow-4');

    await page.evaluate(() => {
      document.getElementById('email_form-email').value = '';
    });
    await page.type('#email_form-email', 'test_user_002@thisiget.com');

    // Click on Change and Verify
    await Promise.all([
      page.waitForNavigation(),
      page.click('#email_form-submit_email'),
    ]);

    await snapshot('account-settings-email-flow-5');

    await sleep(2000);
    [msgNumber, body] = await getEmail();
    count = 0;
    while (msgNumber === oldMsgNumber && count < 5) {
      await sleep(2000);
      [msgNumber, body] = await getEmail();
      count += 1;
    }
    expect(msgNumber).not.toEqual(oldMsgNumber);
    [token] = body.match(/confirmEmailChange\/[^\r]*/);
    await page.goto(`${sitePath}/${token}`);
    await snapshot('account-settings-email-flow-6');
  });
});
