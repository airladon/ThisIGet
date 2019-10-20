import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
// const testMode = process.env.TIG_MODE || 'test';
const username = process.env.TIG_USERNAME || 'test_user_001';
const password = process.env.TIG_PASSWORD || '12345678';

describe('Account Settings Flow', () => {
  test('Login Page', async () => {
    jest.setTimeout(10000);
    // Home page, not logged in
    await page.goto(sitePath);
    await page.setViewport({ width: 500, height: 2000 });

    // Click on login
    let [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('#id_navbar_loginout'),
    ]);
    expect(response.status()).toBe(200);

    // Fill in login form and submit
    await page.type('#username_or_email', username);
    await page.type('#password', password);
    let image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-settings-flow-0-filled',
    });
    [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('#submit'),
    ]);
    expect(response.status()).toBe(200);

    // Should go back to home page logged in
    // Cookies should show username that is logged in
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-settings-flow-1-logged-in',
    });

    // Click on Logout
    await Promise.all([
      page.waitForSelector('#id_navbar_loginout_list'),
      page.click('#id_navbar_loginout'),
    ]);
    // expect(response.status()).toBe(200);
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-settings-flow-2-click-signedin',
    });

    const hints = await page.$$('.dropdown_button_list_item_link');
    [response] = await Promise.all([
      page.waitForNavigation(),
      hints[0].click(),
    ]);
    expect(response.status()).toBe(200);
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-settings-flow-3-click-account-settings',
    });

    // Click on Delete
    [response] = await Promise.all([
      page.waitForNavigation(),
      page.click('#delete_form-submit'),
    ]);

    expect(response.status()).toBe(200);
    image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: 'account-settings-flow-4-delete-confirmation',
    });
  });
});
