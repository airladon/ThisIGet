/* eslint-disable no-await-in-loop */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import {
  snapshot, logout, getLatestMessage, getToken, sleep,
  setFormInput, click, goHome, gotoAccountSettings,
} from './common';

expect.extend({ toMatchImageSnapshot });
const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
const username = process.env.TIG_USERNAME || 'test_user_002';
const password = process.env.TIG_PASSWORD || '12345678';


// describe('Reset Password', () => {
//   test('Reset Password', async () => {
//     jest.setTimeout(30000);
//     await goHome(500, 1200);
//     await sleep(500);
//     await logout();
//     await snapshot('reset-password-01');

//     await click('id_navbar_loginout');
//     await snapshot('reset-password-02');

//     await click('login_form__forgot_password');
//     await snapshot('reset-password-03');

//     await setFormInput('email', `${username}@thisiget.com`);
//     await snapshot('reset-password-04');

//     const currentMsgNumber = await getLatestMessage();
//     await click('submit');
//     await snapshot('reset-password-05');

//     const token = await getToken('resetPassword', currentMsgNumber);
//     await page.goto(`${sitePath}/${token}`);
//     await snapshot('reset-password-06');

//     await setFormInput('password', 'asdfasdf');
//     await setFormInput('repeat_password', 'asdfasdf');
//     await snapshot('reset-password-07');

//     await click('submit');
//     await snapshot('reset-password-08');

//     await setFormInput('password', 'asdfasdf');
//     await snapshot('reset-password-09');

//     await click('submit');
//     await snapshot('reset-password-10');

//     await gotoAccountSettings();
//     await snapshot('reset-password-11');

//     await setFormInput('password_form-password', password);
//     await setFormInput('password_form-repeat_password', password);
//     await snapshot('reset-password-12');

//     await click('password_form-submit_password');
//     await snapshot('reset-password-13');

//     await logout();
//   });
// });

async function getAllScreenShots() {
  const screenshots = [];  
  await goHome(500, 1200);
  await sleep(500);
  await logout();
  screenshots.push(await page.screenshot());

  await click('id_navbar_loginout');
  screenshots.push(await page.screenshot());

  await click('login_form__forgot_password');
  screenshots.push(await page.screenshot());

  await setFormInput('email', `${username}@thisiget.com`);
  screenshots.push(await page.screenshot());

  const currentMsgNumber = await getLatestMessage();
  await click('submit');
  screenshots.push(await page.screenshot());

  const token = await getToken('resetPassword', currentMsgNumber);
  await page.goto(`${sitePath}/${token}`);
  screenshots.push(await page.screenshot());

  await setFormInput('password', 'asdfasdf');
  await setFormInput('repeat_password', 'asdfasdf');
  screenshots.push(await page.screenshot());

  await click('submit');
  screenshots.push(await page.screenshot());

  await setFormInput('password', 'asdfasdf');
  screenshots.push(await page.screenshot());

  await click('submit');
  screenshots.push(await page.screenshot());

  await gotoAccountSettings();
  screenshots.push(await page.screenshot());

  await setFormInput('password_form-password', password);
  await setFormInput('password_form-repeat_password', password);
  screenshots.push(await page.screenshot());

  await click('password_form-submit_password');
  screenshots.push(await page.screenshot());

  await logout();

  const indexedScreenshots = screenshots.map((s, index) => [index, s]);

  describe('Reset Password All', () => {
    test.each(indexedScreenshots)(
      'Screenshot %#',
      async (index, screenshot) => {
        const indexPadded = index.toString().paddStart(2, '0');
        const fileName = `reset-password-${indexPadded}`;
        expect(screenshot).toMatchImageSnapshot({
          customSnapshotIdentifier: fileName,
        });
      },
    );
  });
}


getAllScreenShots();