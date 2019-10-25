/* eslint-disable no-await-in-loop */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import {
  login, snap, logout,
  setFormInput, click, goHome, sleep, checkSnap, writeReplacements,
} from './common';

expect.extend({ toMatchImageSnapshot });

const username = process.env.TIG_USERNAME || 'test_user_002';
const password = process.env.TIG_PASSWORD || '12345678';

const snapshots = [];
const indexes = Array.from(Array(7).keys());
const replacements = [];


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
    await login(username, password, 'login', snapshots, 0);
  });

  test('Log In - Errors', async () => {
    jest.setTimeout(10000);
    await click('id_navbar_loginout');
    await snap('login-errors', snapshots, 1);
    await setFormInput('username_or_email', username);
    await setFormInput('password', '3');
    await snap('login-errors', snapshots);
    await click('submit');
    await snap('login-errors', snapshots);
  });

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
