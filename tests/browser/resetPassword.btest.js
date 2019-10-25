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

const indexedScreenshots = [];
const indexes = Array.from(Array(13).keys());

async function snap(fileNamePrefix = '', startIndex = null) {
  let index = 0;
  if (startIndex == null) {
    if (indexedScreenshots.length > 0) {
      const lastPrefix =
        indexedScreenshots.slice(-1)[0][0].replace(/-[0-9]*$/, '');
      const lastIndex =
        indexedScreenshots.slice(-1)[0][0].replace(/.*-([0-9]*)$/, '$1');
      if (lastPrefix === fileNamePrefix) {
        index = parseInt(lastIndex, 10) + 1;
      }
    }
  } else {
    index = startIndex;
  }
  const screenshot = await page.screenshot();
  const fileName = `${fileNamePrefix}-${index.toString(10).padStart(2, '0')}`;
  indexedScreenshots.push([fileName, screenshot]);
}

// beforeAll(async () => {
//   jest.setTimeout(180000);
//   // const screenshots = [];
//   await goHome(500, 1200);
//   await sleep(500);
//   await logout();
//   await snap('reset-password', 1);

//   await click('id_navbar_loginout');
//   await snap('reset-password');

//   await click('login_form__forgot_password');
//   await snap('reset-password');

//   await setFormInput('email', `${username}@thisiget.com`);
//   await snap('reset-password');

//   const currentMsgNumber = await getLatestMessage();
//   await click('submit');
//   await snap('reset-password');

//   const token = await getToken('resetPassword', currentMsgNumber);
//   await page.goto(`${sitePath}/${token}`);
//   await snap('reset-password');

//   await setFormInput('password', 'asdfasdf');
//   await setFormInput('repeat_password', 'asdfasdf');
//   await snap('reset-password');

//   await click('submit');
//   await snap('reset-password');

//   await setFormInput('password', 'asdfasdf');
//   await snap('reset-password');

//   await click('submit');
//   await snap('reset-password');

//   await gotoAccountSettings();
//   await snap('reset-password');

//   await setFormInput('password_form-password', password);
//   await setFormInput('password_form-repeat_password', password);
//   await snap('reset-password');

//   await click('password_form-submit_password');
//   await snap('reset-password');

//   await logout();
//   expect(indexes).toHaveLength(indexedScreenshots.length);
// });


describe('Reset Password', () => {
  test('Get all snapshots', async () => {
    jest.setTimeout(180000);
    await goHome(500, 1200);
    await sleep(500);
    await logout();
    await snap('reset-password', 1);

    await click('id_navbar_loginout');
    await snap('reset-password');

    await click('login_form__forgot_password');
    await snap('reset-password');

    await setFormInput('email', `${username}@thisiget.com`);
    await snap('reset-password');

    const currentMsgNumber = await getLatestMessage();
    await click('submit');
    await snap('reset-password');

    const token = await getToken('resetPassword', currentMsgNumber);
    await page.goto(`${sitePath}/${token}`);
    await snap('reset-password');

    await setFormInput('password', 'asdfasdf');
    await setFormInput('repeat_password', 'asdfasdf');
    await snap('reset-password');

    await click('submit');
    await snap('reset-password');

    await setFormInput('password', 'asdfasdf');
    await snap('reset-password');

    await click('submit');
    await snap('reset-password');

    await gotoAccountSettings();
    await snap('reset-password');

    await setFormInput('password_form-password', password);
    await setFormInput('password_form-repeat_password', password);
    await snap('reset-password');

    await click('password_form-submit_password');
    await snap('reset-password');

    await logout();
    expect(indexes).toHaveLength(indexedScreenshots.length);
  });
  test.each(indexes)(
    'Screenshot %i',
    async (index) => {
      const [fileName, screenshot] = indexedScreenshots[index];
      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: fileName,
      });
    },
  );
});

// describe('All', () => {
//   for(let i = 0; i < indexedScreenshots.length; i += 1) {
//     test(`Screenshot ${i}`, async () => {
//       console.log(i, indexedScreenshots.length)
//       const index = i + 1;
//       const screenshot = indexedScreenshots[i];
//       console.log(screenshot);
//       const indexPadded = index.toString().padStart(2, '0');
//       const fileName = `reset-password-${indexPadded}`;
//       console.log(fileName)
//       expect(screenshot).toMatchImageSnapshot({
//         customSnapshotIdentifier: fileName,
//       });
//     });
//   }
// });

// getAllScreenShots();
