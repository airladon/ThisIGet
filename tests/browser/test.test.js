import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.WEBSITE_ADDRESS || 'http://host.docker.internal:5003';
const testMode = process.env.TEST_MODE || 'test';


describe('Home Page', () => {
  // beforeAll(async () => {
  //   await page.goto(sitePath);
  //   await page.setViewport({ width: 500, height: 1500 });
  // });
  it('Should be titled "This I Get"', async () => {
    // if (testMode === 'prod') { return; }
    // await console.log(page.title())
    // const text = await page.evaluate(() => document.body.textContent);
    await page.goto(sitePath);
    await page.setViewport({ width: 500, height: 1500 });
    await expect(page.title()).resolves.toMatch('This I Get');
  });
  it('Should have no visutal regression', async () => {
    await page.goto(sitePath);
    await page.setViewport({ width: 500, height: 1500 });
    const image = await page.screenshot({ path: 'main.png' });
    expect(image).toMatchImageSnapshot();
  });

  it('Should be able to log in', async () => {

  });
});


const anglesPath = `${sitePath}/Lessons/Math/Geometry_1/Angle/base/explanation`;

describe('Angles Lesson', () => {
  beforeAll(async () => {
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });
  });
  // it('Should be titled "This I Get"', async () => {
  //   // if (testMode === 'prod') { return; }
  //   // await console.log(page.title())
  //   // const text = await page.evaluate(() => document.body.textContent);
  //   await expect(page.title()).resolves.toMatch('This I Get');
  // });
  it('Page 1 should have no visutal regression', async () => {
    // await jestPuppeteer.debug();
    // const text = await page.evaluate(() => document.body.textContent);
    // console.log(anglesPath)
    // console.log(text)
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });
    const image = await page.screenshot({ path: 'anglesPage1.png' });
    expect(image).toMatchImageSnapshot();
  });
  it('Page 6 should have no visutal regression', async () => {
    await page.goto(`${anglesPath}?page=6`);
    await page.setViewport({ width: 600, height: 800 });
    const image = await page.screenshot({ path: 'anglesPage6.png' });
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
