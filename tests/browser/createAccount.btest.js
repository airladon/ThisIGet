/* eslint-disable no-await-in-loop */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import {
  snapshot, logout,
  setFormInput, click, goHome, deleteAccount, createAccount,
} from './common';

expect.extend({ toMatchImageSnapshot });

const username = process.env.TIG_USERNAME || 'test_user_002';
const password = process.env.TIG_PASSWORD || '12345678';


describe('Create Account', () => {
  beforeEach(async () => {
    await goHome(500, 800);
    await logout();
  });
  afterEach(async () => {
    await goHome();
    await logout();
  });

  test.only('Create Account', async () => {
    jest.setTimeout(20000);
    console.log('a')
    await deleteAccount(username, password);
    console.log('b')
    await createAccount(username, `${username}@thisiget.com`, password, 'create-account');
    await setFormInput('password', password);
    await snapshot('create-account-7');
    await click('submit');
    await snapshot('create-account-8');
  });

  test('Create Account - Errors', async () => {
    jest.setTimeout(10000);
    await logout();
    await click('id_navbar_loginout');
    await click('login_form__create_account');

    await setFormInput('username', username);
    await click('submit');
    await snapshot('create-account-errors-1');

    await setFormInput('email', `${username}@thisiget.com`);
    await click('submit');
    await snapshot('create-account-errors-2');

    await setFormInput('password', 'asdfasdf');
    await setFormInput('repeat_password', 'asdfasdf1');
    await click('submit');
    await snapshot('create-account-errors-3');
  });
});
