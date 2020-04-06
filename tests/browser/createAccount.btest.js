/* eslint-disable no-await-in-loop */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import {
  logout, snap, checkSnap, writeReplacements, createAccountWithoutConfirm,
  setFormInput, click, goHome, deleteAccount, createAccount, sleep,
  confirmCreateAccount,
} from './common';

expect.extend({ toMatchImageSnapshot });

const username = process.env.TIG_USERNAME || 'test_user_002';
const password = process.env.TIG_PASSWORD || '12345678';

const snapshots = [];
const indexes = Array.from(Array(26).keys());
const replacements = [];


describe('Create Account', () => {
  beforeEach(async () => {
    await goHome(500, 800);
    await logout();
  });
  afterEach(async () => {
    await goHome();
    await logout();
  });

  test('Create Account', async () => {
    jest.setTimeout(20000);
    await sleep(500);
    await deleteAccount(username, password);
    await createAccount(
      username, `${username}@thisiget.com`, password,
      'create-account', snapshots, 0,
    );
    await setFormInput('password', password);
    await snap('create-account', snapshots);

    await click('submit');
    await snap('create-account', snapshots);
  });

  test('Create Account - Errors', async () => {
    jest.setTimeout(10000);
    await logout();
    await click('id_navbar_loginout');
    await click('login_form__create_account');

    await setFormInput('username', username);
    await click('submit');
    await snap('create-account-errors', snapshots, 1);

    await setFormInput('email', `${username}@thisiget.com`);
    await click('submit');
    await snap('create-account-errors', snapshots);

    await setFormInput('password', 'asdfasdf');
    await setFormInput('repeat_password', 'asdfasdf1');
    await click('submit');
    await snap('create-account-errors', snapshots);
  });

  test('Create Account Twice', async () => {
    jest.setTimeout(60000);
    await sleep(500);
    await deleteAccount(username, password);

    const token1 = await createAccountWithoutConfirm(
      username, `${username}@thisiget.com`, password,
      'create-account-twice', snapshots, 0,
    );
    await goHome();
    const token2 = await createAccountWithoutConfirm(
      username, `${username}@thisiget.com`, password,
      'create-account-twice', snapshots,
    );

    await confirmCreateAccount(token2, 'create-account-twice', snapshots);
    await confirmCreateAccount(token1, 'create-account-twice', snapshots);
  });
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
