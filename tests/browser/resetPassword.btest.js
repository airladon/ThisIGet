/* eslint-disable no-await-in-loop */
import 'babel-polyfill';
import {
  logout, getLatestMessage, getToken, sleep,
  setFormInput, click, goHome, gotoAccountSettings, snap,
  writeReplacements, checkSnap,
} from './common';

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
const username = process.env.TIG_USERNAME || 'test_user_002';
const password = process.env.TIG_PASSWORD || '12345678';

const snapshots = [];
const indexes = Array.from(Array(13).keys());
const replacements = [];

describe('Reset Password', () => {
  test('Get all snapshots', async () => {
    jest.setTimeout(180000);
    await goHome(500, 1200);
    await sleep(500);
    await logout();
    await snap(snapshots, 'reset-password', 1);

    await click('id_navbar_loginout');
    await snap(snapshots, 'reset-password');

    await click('login_form__forgot_password');
    await snap(snapshots, 'reset-password');

    await setFormInput('email', `${username}@thisiget.com`);
    await snap(snapshots, 'reset-password');

    const currentMsgNumber = await getLatestMessage();
    await click('submit');
    await snap(snapshots, 'reset-password');

    const token = await getToken('resetPassword', currentMsgNumber);
    await page.goto(`${sitePath}/${token}`);
    await snap(snapshots, 'reset-password');

    await setFormInput('password', 'asdfasdf');
    await setFormInput('repeat_password', 'asdfasdf');
    await snap(snapshots, 'reset-password');

    await click('submit');
    await snap(snapshots, 'reset-password');

    await setFormInput('password', 'asdfasdf');
    await snap(snapshots, 'reset-password');

    await click('submit');
    await snap(snapshots, 'reset-password');

    await gotoAccountSettings();
    await snap(snapshots, 'reset-password');

    await setFormInput('password_form-password', password);
    await setFormInput('password_form-repeat_password', password);
    await snap(snapshots, 'reset-password');

    await click('password_form-submit_password');
    await snap(snapshots, 'reset-password');

    await logout();
    expect(indexes).toHaveLength(snapshots.length);
  });

  test.each(indexes)(
    'Screenshot %i',
    (index) => {
      checkSnap(index, snapshots, replacements);
    },
  );

  test('Write Replacements', () => {
    writeReplacements(__dirname, replacements);
  });
});
