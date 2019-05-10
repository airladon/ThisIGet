import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
// const testMode = process.env.TIG_MODE || 'test';

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

const path = `${sitePath}/Lessons/Math/Geometry_1/RelatedAngles/base/explanation?page=3`;

describe('test Lesson', () => {
  it('Page 1 should have no visutal regression', async () => {
    await page.goto(path);
    await page.setViewport({ width: 600, height: 800 });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
    let texts = await page.evaluate(() => {
      let data = [];
      let elements = document.getElementsByClassName('action_word_enabled');
      for (var element of elements) {
        data.push(element.textContent);
      }
      return data;
    });
    console.log(texts)
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
