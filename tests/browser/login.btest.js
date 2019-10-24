/* eslint-disable no-await-in-loop */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import {
  login, snapshot, logout,
  setFormInput, click, goHome, sleep,
} from './common';

expect.extend({ toMatchImageSnapshot });

// const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
// const testMode = process.env.TIG_MODE || 'test';
const username = process.env.TIG_USERNAME || 'test_user_002';
const password = process.env.TIG_PASSWORD || '12345678';


describe('Account Settings Flow', () => {
  beforeEach(async () => {
    await goHome(500, 800);
    await logout();
  });
  afterEach(async () => {
    await goHome();
    await logout();
  });

  test('Log In', async () => {
    jest.setTimeout(10000);
    await sleep(500);
    await login(username, password, 'login');
  });

  test('Log In - Errors', async () => {
    jest.setTimeout(10000);
    await click('id_navbar_loginout');
    await snapshot('login-errors-1');
    await setFormInput('username_or_email', username);
    await setFormInput('password', '3');
    await snapshot('login-errors-2');
    await click('submit');
    await snapshot('login-errors-3');
  });
});
