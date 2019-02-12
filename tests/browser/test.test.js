
// describe('Google', () => {
//   beforeAll(async () => {
//     await page.goto('https://google.com');
//   });

//   it('should be titled "Google"', async () => {
//     await expect(page.title()).resolves.toMatch('Google');
//   });
// });

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  await page.screenshot({ path: 'google1.png' });

  await browser.close();
})();