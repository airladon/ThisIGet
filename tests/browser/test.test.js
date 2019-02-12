import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.WEBSITE_ADDRESS || 'http://host.docker.internal:5003';
const testMode = process.env.TEST_MODE || 'test';


describe('Home Page', () => {
  beforeAll(async () => {
    await page.goto(sitePath);
  });
  it('Should be titled "This I Get"', async () => {
    // if (testMode === 'prod') { return; }
    // await console.log(page.title())
    // const text = await page.evaluate(() => document.body.textContent);
    await expect(page.title()).resolves.toMatch('This I Get');
  });
  it('Should have no visutal regression', async () => {
    const image = await page.screenshot({ path: 'main.png' });
    expect(image).toMatchImageSnapshot();
  });
});


// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
//   const page = await browser.newPage();
//   await page.goto('https://www.google.com');
//   await page.screenshot({ path: 'google1.png' });

//   await browser.close();
// })()
