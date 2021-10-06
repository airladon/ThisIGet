/* eslint-disable no-await-in-loop */
import 'babel-polyfill';
/* eslint-disable import/named */
import {
  logout, getLatestMessage, getToken, sleep,
  setFormInput, click, goHome, gotoAccountSettings, snap,
  writeReplacements, checkSnap,
} from './common';

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
// const username = process.env.TIG_USERNAME || 'test_user_002';
const password = process.env.TIG_PASSWORD || '12345678';
const emailAddress = process.env.TIG_EMAIL || 'test_user_002@thisiget.com';

const snapshots = [];
const indexes = Array.from(Array(13).keys());
const replacements = [];

describe('Reset Password', () => {
  test('Get all snapshots', async () => {
    // jest.setTimeout(180000);
    await goHome(500, 1200);
    await sleep(500);
    await logout();
    await snap('reset-password', snapshots, 1);

    await click('id_navbar_loginout');
    await snap('reset-password', snapshots);

    await click('login_form__forgot_password');
    await snap('reset-password', snapshots);

    await setFormInput('email', emailAddress);
    await snap('reset-password', snapshots);

    const currentMsgNumber = await getLatestMessage();
    await click('submit');
    await snap('reset-password', snapshots);

    const token = await getToken('resetPassword', currentMsgNumber);
    await page.goto(`${sitePath}/${token}`);
    await snap('reset-password', snapshots);

    await setFormInput('password', 'asdfasdf');
    await setFormInput('repeat_password', 'asdfasdf');
    await snap('reset-password', snapshots);

    await click('submit');
    await snap('reset-password', snapshots);

    await setFormInput('password', 'asdfasdf');
    await snap('reset-password', snapshots);

    await click('submit');
    await snap('reset-password', snapshots);

    await gotoAccountSettings();
    await snap('reset-password', snapshots);

    await setFormInput('password_form-password', password);
    await setFormInput('password_form-repeat_password', password);
    await snap('reset-password', snapshots);

    await click('password_form-submit_password');
    await snap('reset-password', snapshots);

    await logout();
    expect(indexes).toHaveLength(snapshots.length);
  }, 180000);
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
