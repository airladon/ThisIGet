
const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';

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


module.exports = {
  login, gotoAccountSettings, snapshot,
};
