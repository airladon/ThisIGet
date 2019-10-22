/* eslint-disable no-await-in-loop */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import {
  login, gotoAccountSettings, snapshot, logout, getToken,
  getLatestMessage, setFormInput, click, goHome, createAccount, sleep,
} from './common';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
// const testMode = process.env.TIG_MODE || 'test';
const username = process.env.TIG_USERNAME || 'test_user_002';
const username2 = process.env.TIG_USERNAME2 || 'test_user_002aofkspeD3fif';
const password = process.env.TIG_PASSWORD || '12345678';


describe('Account Settings Flow', () => {
  test('Delete Cancel', async () => {
    jest.setTimeout(10000);
    await goHome(500, 2000);
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-delete-cancel-flow-1');
    await click('delete_form-submit');
    await snapshot('account-settings-delete-cancel-flow-2');
    await click('form-submit_save');
    await snapshot('account-settings-delete-cancel-flow-3');
    await logout();
  });

  test('Delete', async () => {
    jest.setTimeout(20000);
    await goHome(500, 2000);
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-delete-flow-1');

    await click('delete_form-submit');
    await snapshot('account-settings-delete-flow-2');

    await click('form-submit_delete');
    await snapshot('account-settings-delete-flow-3');

    // Create a log in to make sure creation worked
    await createAccount(username, `${username}@thisiget.com`, password);
    await snapshot('account-settings-delete-flow-4');
    await setFormInput('password', password)
    await snapshot('account-settings-delete-flow-5');
  });

  test('Change Email', async () => {
    jest.setTimeout(60000);
    expect(process.env.MAIL_RECEIVE_SERVER).not.toHaveLength(0);
    expect(process.env.MAIL_RECEIVE_PASSWORD).not.toHaveLength(0);
    expect(process.env.MAIL_RECEIVE_SERVER).not.toHaveLength(0);
    await goHome(500, 2000);
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-email-flow-1');

    let latestEmailNumber = await getLatestMessage();
    await setFormInput('email_form-email', 'test_user_002a@thisiget.com');
    await click('email_form-submit_email');
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
    await click('email_form-submit_email');
    await snapshot('account-settings-email-flow-5');

    token = await getToken('confirmEmailChange', latestEmailNumber);
    await page.goto(`${sitePath}/${token}`);
    await snapshot('account-settings-email-flow-6');
    await logout();
  });

  test.only('Change Username', async () => {
    jest.setTimeout(10000);
    await goHome(500, 2000);
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-username-flow-1');

    await setFormInput('username_form-username', username2);
    await snapshot('account-settings-username-flow-1a');

    console.log(1)
    // await Promise.all([
    //   page.waitForNavigation(),
    //   // page.click('#username_form-submit_username'),
    //   page.$eval('#username_form-submit_username', elem => elem.click())
    // ]);
    await click('username_form-submit_username');
    console.log(2)
    await snapshot('account-settings-username-flow-2');

  console.log(3)
    await logout();
    console.log(4)
    await login(username2, password);
    console.log(5)
    await gotoAccountSettings();
    console.log(6)
    await snapshot('account-settings-username-flow-3');

  console.log(7)
    await setFormInput('username_form-username', username);
    // await click('username_form-submit_username');
    console.log(8)
    // await Promise.all([
    //   page.waitForNavigation(),
    //   // page.click('#username_form-submit_username'),
    //   page.$eval('#username_form-submit_username', elem => elem.click())
    // ]);
    await click('username_form-submit_username');
    console.log(9)
    await snapshot('account-settings-username-flow-4');
    await logout();
  });

  test('Change Password', async () => {
    jest.setTimeout(60000);
    await goHome(500, 2000);
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-password-flow-1');

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf');
    await click('password_form-submit_password');
    await snapshot('account-settings-password-flow-2');

    await logout();
    await login(username, 'asdfasdf');
    await gotoAccountSettings();
    await snapshot('account-settings-password-flow-3');

    await setFormInput('password_form-password', password);
    await setFormInput('password_form-repeat_password', password);
    await click('password_form-submit_password');
    await snapshot('account-settings-password-flow-4');
    await logout();
  });

  test('Error Messages', async () => {
    jest.setTimeout(20000);
    await goHome(500, 2000);
    await login(username, password);
    await gotoAccountSettings();
    await snapshot('account-settings-errors-flow-1');

    await setFormInput('username_form-username', 'test_user_001');
    await click('username_form-submit_username');
    await snapshot('account-settings-errors-flow-2');

    await setFormInput('email_form-email', 'test_user_001@thisiget.com');
    await click('email_form-submit_email');
    await snapshot('account-settings-errors-flow-3');

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf1');
    await click('password_form-submit_password');
    await snapshot('account-settings-password-flow-4');
  })
});
