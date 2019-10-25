/* eslint-disable no-await-in-loop */

import { getEmail } from './email';

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function goHome(width = 0, height = 0) {
  await page.goto(sitePath);

  if (width !== 0 && height !== 0) {
    await page.setViewport({ width, height });
  }
}

async function snapshot(fileName) {
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot({
    customSnapshotIdentifier: fileName,
  });
}

async function debugSnapshot(name, number) {
  if (name) {
    await snapshot(`${name}-${number}`);
  }
}

async function getToken(prefix, oldMsgNumber) {
  await sleep(2000);
  let [msgNumber, body] = await getEmail();
  let count = 0;
  while (msgNumber === oldMsgNumber && count < 5) {
    await sleep(2000);
    [msgNumber, body] = await getEmail();
    count += 1;
  }

  expect(msgNumber).not.toEqual(oldMsgNumber);
  const [token] = body.match(new RegExp(`${prefix}/[^\r]*`));

  return token;
}

async function setFormInput(id, text) {
  await page.evaluate((idStr) => {
    document.getElementById(idStr).value = '';
  }, id);
  await page.type(`#${id}`, text);
}

async function click(id) {
  await Promise.all([
    page.waitForNavigation(),
    // page.click(`#${id}`),
    page.$eval(`#${id}`, elem => elem.click()),
  ]);
}

async function getLatestMessage() {
  const email = await getEmail();
  return email[0];
}


async function login(username, password, debug = '') {
  await debugSnapshot(debug, 0);
  await click('id_navbar_loginout');
  await debugSnapshot(debug, 1);

  await setFormInput('username_or_email', username);
  await setFormInput('password', password);
  await debugSnapshot(debug, 2);

  await click('submit');
  await debugSnapshot(debug, 3);
}

async function logout(debug = '') {
  if (debug) {
    await snapshot(`${debug}-0`);
  }
  // First check it we can log out
  const button = await page.$('#id_navbar_loginout');
  const className = await ((await button.getProperty('className')).jsonValue());
  if (className !== 'dropdown_button_container') {
    return;
  }
  await Promise.all([
    page.waitForSelector('#id_navbar_loginout_list'),
    page.click('#id_navbar_loginout'),
  ]);
  if (debug) {
    await snapshot(`${debug}-1`);
  }
  const hints = await page.$$('.dropdown_button_list_item_link');
  if (debug) {
    await snapshot(`${debug}-2`);
  }
  await Promise.all([
    page.waitForNavigation(),
    hints[1].click(),
  ]);
  if (debug) {
    await snapshot(`${debug}-3`);
  }
}


async function gotoAccountSettings(debug = '', index = 1) {
  await debugSnapshot(debug, index + 0);
  await Promise.all([
    page.waitForSelector('#id_navbar_loginout_list'),
    page.click('#id_navbar_loginout'),
  ]);
  await debugSnapshot(debug, index + 1);

  const hints = await page.$$('.dropdown_button_list_item_link');
  await Promise.all([
    page.waitForNavigation(),
    hints[0].click(),
  ]);
  await debugSnapshot(debug, index + 2);
}


async function createAccount(username, email, password, debug) {
  await debugSnapshot(debug, 0);
  await logout();
  await debugSnapshot(debug, 1);

  await click('id_navbar_loginout');
  await debugSnapshot(debug, 2);

  await click('login_form__create_account');
  await debugSnapshot(debug, 3);

  await setFormInput('username', username);
  await setFormInput('email', email);
  await setFormInput('password', password);
  await setFormInput('repeat_password', password);
  await page.$eval('#terms', elem => elem.click());
  await debugSnapshot(debug, 4);

  const currentMsgNumber = await getLatestMessage();
  await click('submit');
  await debugSnapshot(debug, 5);

  const token = await getToken('confirmAccount', currentMsgNumber);
  await page.goto(`${sitePath}/${token}`);
  await debugSnapshot(debug, 6);
}

async function deleteAccount(username, password, debug) {
  await debugSnapshot(debug, 0);
  await logout();
  await debugSnapshot(debug, 1);

  await login(username, password);
  await debugSnapshot(debug, 2);

  await gotoAccountSettings();
  await debugSnapshot(debug, 3);

  await click('delete_form-submit');
  await debugSnapshot(debug, 4);

  await click('form-submit_delete');
  await debugSnapshot(debug, 5);
}

async function snap(snapshots, fileNamePrefix = '', startIndex = null) {
  let index = 0;
  if (startIndex == null) {
    if (snapshots.length > 0) {
      const lastPrefix =
        snapshots.slice(-1)[0][0].replace(/-[0-9]*$/, '');
      const lastIndex =
        snapshots.slice(-1)[0][0].replace(/.*-([0-9]*)$/, '$1');
      if (lastPrefix === fileNamePrefix) {
        index = parseInt(lastIndex, 10) + 1;
      }
    }
  } else {
    index = startIndex;
  }
  const screenshot = await page.screenshot();
  const fileName = `${fileNamePrefix}-${index.toString(10).padStart(2, '0')}`;
  snapshots.push([fileName, screenshot]);
}

module.exports = {
  login,
  gotoAccountSettings,
  snapshot,
  logout,
  sleep,
  getToken,
  getLatestMessage,
  setFormInput,
  click,
  goHome,
  createAccount,
  deleteAccount,
  snap,
};
