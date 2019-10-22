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
    page.click(`#${id}`),
  ]);
}

async function getLatestMessage() {
  const email = await getEmail();
  return email[0];
}


async function login(username, password, debug = '') {
  if (debug) {
    await snapshot(`${debug}-0`);
  }
  await click('id_navbar_loginout');
  if (debug) {
    await snapshot(`${debug}-1`);
  }
  await setFormInput('username_or_email', username);
  await setFormInput('password', password);
  if (debug) {
    await snapshot(`${debug}-2`);
  }
  await click('submit');
  if (debug) {
    await snapshot(`${debug}-3`);
  }
}

async function logout(debug = '') {
  if (debug) {
    await snapshot(`${debug}-0`);
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


async function gotoAccountSettings(debug = '') {
  if (debug) {
    await snapshot(`${debug}-0`);
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
    hints[0].click(),
  ]);
  if (debug) {
    await snapshot(`${debug}-3`);
  }
}


async function createAccount(username, email, password) {
  // await logout();
  await click('id_navbar_loginout');
  await click('login_form__create_account');
  await setFormInput('username', username);
  await setFormInput('email', email);
  await setFormInput('password', password);
  await setFormInput('repeat_password', password);
  const currentMsgNumber = await getLatestMessage();
  await click('submit');
  const token = await getToken('confirmAccount', currentMsgNumber);
  await page.goto(`${sitePath}/${token}`);
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
};
