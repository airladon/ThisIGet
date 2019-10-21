import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
// import { getEmail } from './email';
import {
  login, gotoAccountSettings, snapshot, logout, getToken,
  getLatestMessage, setFormInput, submit,
} from './common';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
// const testMode = process.env.TIG_MODE || 'test';
const username = process.env.TIG_USERNAME || 'test_user_002';
const username2 = process.env.TIG_USERNAME2 || 'test_user_002aofkspeD3fif';
const password = process.env.TIG_PASSWORD || '12345678';


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

  test('Change Email', async () => {
    jest.setTimeout(60000);
    expect(process.env.MAIL_RECEIVE_SERVER).not.toHaveLength(0);
    expect(process.env.MAIL_RECEIVE_PASSWORD).not.toHaveLength(0);
    expect(process.env.MAIL_RECEIVE_SERVER).not.toHaveLength(0);
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-email-flow-1');

    let latestEmailNumber = await getLatestMessage();
    await setFormInput('email_form-email', 'test_user_002a@thisiget.com');
    await submit('email_form-submit_email');
    await snapshot('account-settings-email-flow-2');

    let token = await getToken('confirmEmailChange', latestEmailNumber);
    latestEmailNumber = await getLatestMessage();
    await page.goto(`${sitePath}/${token}`);
    await snapshot('account-settings-email-flow-3');

    await logout();
    await login('test_user_002a@thisiget.com', password);
    await gotoAccountSettings();
    await snapshot('account-settings-email-flow-4');

    await setFormInput('email_form-email', 'test_user_002@thisiget.com');
    await submit('email_form-submit_email');
    await snapshot('account-settings-email-flow-5');

    token = await getToken('confirmEmailChange', latestEmailNumber);
    await page.goto(`${sitePath}/${token}`);
    await snapshot('account-settings-email-flow-6');
  });

  test('Change Username', async () => {
    jest.setTimeout(60000);
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-username-flow-1');

    await setFormInput('username_form-username', username2);
    await submit('username_form-submit_username');
    await snapshot('account-settings-username-flow-2');

    await logout();
    await login(username2, password);
    await gotoAccountSettings();
    await snapshot('account-settings-username-flow-3');

    await setFormInput('username_form-username', username);
    await submit('username_form-submit_username');
    await snapshot('account-settings-username-flow-4');
  });

  test.only('Change Password', async () => {
    jest.setTimeout(60000);
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-password-flow-1');

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf');
    await submit('password_form-submit_password');
    await snapshot('account-settings-password-flow-2');

    await logout();
    await login(username, 'asdfasdf');
    await gotoAccountSettings();
    await snapshot('account-settings-password-flow-3');

    await setFormInput('password_form-password', password);
    await setFormInput('password_form-repeat_password', password);
    await submit('password_form-submit_password');
    await snapshot('account-settings-password-flow-4');
  });
});
