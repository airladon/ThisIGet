/* eslint-disable no-await-in-loop, jest/expect-expect */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
/* eslint-disable import/named */
import {
  login, gotoAccountSettings, snap, logout, getToken,
  getLatestMessage, setFormInput, click, goHome, createAccount, sleep,
  writeReplacements, checkSnap,
} from './common';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
// const testMode = process.env.TIG_MODE || 'test';
const username = process.env.TIG_USERNAME || 'test_user_002';
const username2 = process.env.TIG_USERNAME2 || 'test_user_002aofkspeD3fif';
const password = process.env.TIG_PASSWORD || '12345678';
const emailAddress = process.env.TIG_EMAIL || 'test_user_002@thisiget.com';


const snapshots = [];
const indexes = Array.from(Array(34).keys());
const replacements = [];

describe('Account Settings Open', () => {
  test('Open', async () => {
    // jest.setTimeout(40000);
    await goHome(500, 1400);
    await sleep(500);
    await snap('account-settings-open', snapshots, 1);

    await login(username, password);
    await gotoAccountSettings('account-settings-open', snapshots, 2);
  });
}, 40000);

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
    // jest.setTimeout(40000);
    await snap('account-settings-cancel-delete', snapshots, 1);
    await click('delete_form-submit');
    await snap('account-settings-cancel-delete', snapshots);
    await click('form-submit_save');
    await snap('account-settings-cancel-delete', snapshots);
  }, 40000);

  test('Delete', async () => {
    // jest.setTimeout(40000);
    await snap('account-settings-delete', snapshots, 1);

    await click('delete_form-submit');
    await snap('account-settings-delete', snapshots);

    await click('form-submit_delete');
    await snap('account-settings-delete', snapshots);

    // Create a log in to make sure creation worked
    await createAccount(username, emailAddress, password);
    await snap('account-settings-delete', snapshots);
    await setFormInput('password', password);
    await click('submit');
    await snap('account-settings-delete', snapshots);
  }, 40000);

  test('Change Email', async () => {
    // jest.setTimeout(60000);
    expect(process.env.MAIL_RECEIVE_SERVER).not.toHaveLength(0);
    expect(process.env.MAIL_RECEIVE_PASSWORD).not.toHaveLength(0);
    expect(process.env.MAIL_RECEIVE_SERVER).not.toHaveLength(0);
    await snap('account-settings-email', snapshots, 1);

    let latestEmailNumber = await getLatestMessage();
    await setFormInput('email_form-email', 'test_user_002a@thisiget.com');
    await click('email_form-submit_email');
    await snap('account-settings-email', snapshots);

    let token = await getToken('confirmEmailChange', latestEmailNumber);
    latestEmailNumber = await getLatestMessage();
    await page.goto(`${sitePath}/${token}`);
    await snap('account-settings-email', snapshots);

    await logout();
    await login('test_user_002a@thisiget.com', password);
    await gotoAccountSettings();
    await snap('account-settings-email', snapshots);

    await setFormInput('email_form-email', emailAddress);
    await click('email_form-submit_email');
    await snap('account-settings-email', snapshots);

    token = await getToken('confirmEmailChange', latestEmailNumber);
    await page.goto(`${sitePath}/${token}`);
    await snap('account-settings-email', snapshots);
  }, 60000);

  test('Change Username', async () => {
    // jest.setTimeout(40000);
    await snap('account-settings-username', snapshots, 1);
    await setFormInput('username_form-username', username2);
    await click('username_form-submit_username');
    await snap('account-settings-username', snapshots);

    await logout();
    await login(username2, password);
    await gotoAccountSettings();
    await snap('account-settings-username', snapshots);

    await setFormInput('username_form-username', username);
    await click('username_form-submit_username');
    await snap('account-settings-username', snapshots);
  }, 40000);

  test('Change Password', async () => {
    // jest.setTimeout(40000);
    await snap('account-settings-password', snapshots, 1);

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf');
    await click('password_form-submit_password');
    await snap('account-settings-password', snapshots);

    await logout();
    await login(username, 'asdfasdf');
    await gotoAccountSettings();
    await snap('account-settings-password', snapshots);

    await setFormInput('password_form-password', password);
    await setFormInput('password_form-repeat_password', password);
    await click('password_form-submit_password');
    await snap('account-settings-password', snapshots);
  }, 40000);

  test('Error Messages', async () => {
    // jest.setTimeout(40000);
    await snap('account-settings-errors', snapshots, 1);

    await setFormInput('username_form-username', 'test_user_001');
    await click('username_form-submit_username');
    await snap('account-settings-errors', snapshots);

    await setFormInput('email_form-email', 'test_user_001@thisiget.com');
    await click('email_form-submit_email');
    await snap('account-settings-errors', snapshots);

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf1');
    await click('password_form-submit_password');
    await snap('account-settings-errors', snapshots);
  }, 40000);
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
    // jest.setTimeout(40000);
    await snap('account-settings-password-wide', snapshots, 1);

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf1');
    await click('password_form-submit_password');
    await snap('account-settings-password-wide', snapshots);

    await setFormInput('password_form-password', 'asdfasdf');
    await setFormInput('password_form-repeat_password', 'asdfasdf');
    await click('password_form-submit_password');
    await snap('account-settings-password-wide', snapshots);

    await setFormInput('password_form-password', password);
    await setFormInput('password_form-repeat_password', password);
    await click('password_form-submit_password');
    await snap('account-settings-password-wide', snapshots);
  }, 40000);
});
describe('Test snapshots', () => {
  test.each(indexes)(
    'Screenshot %i',
    (index) => {
      expect(snapshots).toHaveLength(indexes.length);
      checkSnap(index, snapshots, replacements);
    },
  );

  test('Write Replacements', () => {
    writeReplacements(__dirname, replacements);
  });
});
