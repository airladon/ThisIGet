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

describe('Account Settings Open', () => {
  test ('Open', async () => {
    jest.setTimeout(20000);
    await goHome(500, 1400);
    await sleep(500);
    await snapshot('account-settings-open-1');

    await login(username, password);
    await gotoAccountSettings('account-settings-open', 2);
  });
});

describe('Account Settings', () => {
  beforeEach(async () => {
    await goHome(500, 1400);
    await logout();
    await login(username, password);
    await gotoAccountSettings();
  });
  afterEach(async () => {
    await logout();
  });

  test('Delete Cancel', async () => {
    jest.setTimeout(20000);
    await snapshot('account-settings-cancel-delete-1');
    await click('delete_form-submit');
    await snapshot('account-settings-cancel-delete-2');
    await click('form-submit_save');
    await snapshot('account-settings-cancel-delete-3');
  });

  test('Delete', async () => {
    jest.setTimeout(20000);
    await snapshot('account-settings-delete-1');

    await click('delete_form-submit');
    await snapshot('account-settings-delete-2');

    await click('form-submit_delete');
    await snapshot('account-settings-delete-3');

    // Create a log in to make sure creation worked
    await createAccount(username, `${username}@thisiget.com`, password);
    await snapshot('account-settings-delete-4');
    await setFormInput('password', password);
    await click('submit');
    await snapshot('account-settings-delete-5');
  });

  test('Change Email', async () => {
    jest.setTimeout(60000);
    expect(process.env.MAIL_RECEIVE_SERVER).not.toHaveLength(0);
    expect(process.env.MAIL_RECEIVE_PASSWORD).not.toHaveLength(0);
    expect(process.env.MAIL_RECEIVE_SERVER).not.toHaveLength(0);
    await snapshot('account-settings-email-1');

    let latestEmailNumber = await getLatestMessage();
    await setFormInput('email_form-email', 'test_user_002a@thisiget.com');
    await click('email_form-submit_email');
    await snapshot('account-settings-email-2');

    let token = await getToken('confirmEmailChange', latestEmailNumber);
    latestEmailNumber = await getLatestMessage();
    await page.goto(`${sitePath}/${token}`);
    await snapshot('account-settings-email-3');

    await logout();
    await login('test_user_002a@thisiget.com', password);
    await gotoAccountSettings();
    await snapshot('account-settings-email-4');

    await setFormInput('email_form-email', 'test_user_002@thisiget.com');
    await click('email_form-submit_email');
    await snapshot('account-settings-email-5');

    token = await getToken('confirmEmailChange', latestEmailNumber);
    await page.goto(`${sitePath}/${token}`);
    await snapshot('account-settings-email-6');
  });

  test('Change Username', async () => {
    jest.setTimeout(20000);
    await snapshot('account-settings-username-1');
    await setFormInput('username_form-username', username2);
    await click('username_form-submit_username');
    await snapshot('account-settings-username-2');

    await logout();
    await login(username2, password);
    await gotoAccountSettings();
    await snapshot('account-settings-username-3');

    await setFormInput('username_form-username', username);
    await click('username_form-submit_username');
    await snapshot('account-settings-username-4');
  });

  test('Change Password', async () => {
    jest.setTimeout(20000);
    await snapshot('account-settings-password-1');

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf');
    await click('password_form-submit_password');
    await snapshot('account-settings-password-2');

    await logout();
    await login(username, 'asdfasdf');
    await gotoAccountSettings();
    await snapshot('account-settings-password-3');

    await setFormInput('password_form-password', password);
    await setFormInput('password_form-repeat_password', password);
    await click('password_form-submit_password');
    await snapshot('account-settings-password-4');
  });

  test('Error Messages', async () => {
    jest.setTimeout(20000);
    await snapshot('account-settings-errors-1');

    await setFormInput('username_form-username', 'test_user_001');
    await click('username_form-submit_username');
    await snapshot('account-settings-errors-2');

    await setFormInput('email_form-email', 'test_user_001@thisiget.com');
    await click('email_form-submit_email');
    await snapshot('account-settings-errors-3');

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf1');
    await click('password_form-submit_password');
    await snapshot('account-settings-errors-4');
  });
});

describe('Account Settings Flow - Wide Screen', () => {
  beforeEach(async () => {
    await goHome(1000, 1400);
    await logout();
    await login(username, password);
    await gotoAccountSettings();
  });
  afterEach(async () => {
    await logout();
  });
  test('Change Password', async () => {
    jest.setTimeout(20000);
    await snapshot('account-settings-password-wide-1');

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf1');
    await click('password_form-submit_password');
    await snapshot('account-settings-password-wide-2');

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf');
    await click('password_form-submit_password');
    await snapshot('account-settings-password-wide-3');

    await setFormInput('password_form-password', password);
    await setFormInput('password_form-repeat_password', password);
    await click('password_form-submit_password');
    await snapshot('account-settings-password-wide-4');
  });
});