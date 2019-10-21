/* eslint-disable no-await-in-loop */

import { getEmail } from './email';

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function login(username, password) {
  await page.goto(sitePath);
  await page.setViewport({ width: 500, height: 2000 });

  // Click on login
  await Promise.all([
    page.waitForNavigation(),
    page.click('#id_navbar_loginout'),
  ]);

  // Fill in login form and submit
  await page.type('#username_or_email', username);
  await page.type('#password', password);

  await Promise.all([
    page.waitForNavigation(),
    page.click('#submit'),
  ]);
}


async function gotoAccountSettings() {
  await Promise.all([
    page.waitForSelector('#id_navbar_loginout_list'),
    page.click('#id_navbar_loginout'),
  ]);

  const hints = await page.$$('.dropdown_button_list_item_link');
  await Promise.all([
    page.waitForNavigation(),
    hints[0].click(),
  ]);
}

async function snapshot(fileName) {
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot({
    customSnapshotIdentifier: fileName,
  });
}

async function logout() {
  await Promise.all([
    page.waitForSelector('#id_navbar_loginout_list'),
    page.click('#id_navbar_loginout'),
  ]);

  const hints = await page.$$('.dropdown_button_list_item_link');
  await Promise.all([
    page.waitForNavigation(),
    hints[1].click(),
  ]);
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

async function submit(id) {
  await Promise.all([
    page.waitForNavigation(),
    page.click(`#${id}`),
  ]);
}

async function getLatestMessage() {
  const email = await getEmail();
  return email[0];
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
  submit,
};
