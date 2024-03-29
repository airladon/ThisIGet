/* eslint-disable import/no-extraneous-dependencies, no-await-in-loop */
/* eslint-disable no-restricted-syntax, jest/no-export, jest/no-conditional-expect */
// import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { joinObjects, writeImage, getReplacementsFolder } from './tools';
import getThreshold from './threshold';
// import { getReplacementsFolder } from '../../../tests/browser/common';

const fs = require('fs');

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function contentSectionCount(contentPath) {
  const content = fs.readFileSync(contentPath, 'utf8');
  return (content.match(/\n *this\.addSection/g) || []).length;
}

page.on('console', async (msg) => {
  const msgType = msg.type();
  const args = await Promise.all(msg.args().map(jsHandle => jsHandle.jsonValue()));
  if (msgType === 'error') {
  // eslint-disable-next-line no-console
    console.log(...args);
  }
});

// Open all hints on a page
async function openHints() {
  const hints = await page.$$('.presentation__hint_label');
  for (const hint of hints) {
    const id = await (await hint.getProperty('id')).jsonValue();
    const hintText = await page.$(`#${id}`);
    await hintText.click();
  }
  return hints;
}

async function closeHints(hints) {
  for (const hint of hints) {
    const id = await (await hint.getProperty('id')).jsonValue();
    const hintText = await page.$(`#${id}`);
    await hintText.click();
  }
}

async function stopHintButton() {
  await page.evaluate(() => {
    const button = document.querySelector('#id_topic__interactive_element_button');
    button.style.animation = 'none';
  });
}

// async function redraw() {
//   await page.evaluate(() => {
//     const d = document.querySelector('#id_topic__diagram_text');
//     d.style.display = 'none';
//     // d.style.display = 'block';
//   });
//   await sleep(100);
//   await page.evaluate(() => {
//     const d = document.querySelector('#id_topic__diagram_text');
//     // d.style.display = 'none';
//     d.style.display = 'block';
//   });
//   await sleep(500);
// }

// async function getPos() {
//   const result = await page.evaluate(() => {
//     let r = [];
//     if (window.location.href.split('/').slice(-1)[0].replace('base?page=', '') === '14') {
//       // document.body.style.fontFamily = 'Times New Roman';
//       // const els = window.location.href.split('/').slice(-1)[0].replace('base?page=','');
//       // const els = document.querySelectorAll('.figureone__eqn_nav__table');
//       // // for (e in els) {
//       //   const e = els[1];
//         // console.log(e)
//         // r.push(e.childNodes[0].childNodes[1].getBoundingClientRect());
//         const e = (document.querySelectorAll('.figureone__eqn_nav__table'))[1]
//           .childNodes[0].childNodes[0];
//         const r1 = e.getBoundingClientRect();
//         function css( element, property ) {
//             return window.getComputedStyle( e, null ).getPropertyValue( property );
//         }
//         const s = css('font-size');
//         r.push(r1.left, r1.width, s, 'huh');
//       // }

//     }
//     // console.log(r.x, r.y, r.width, r.height);
//     return Promise.resolve(r);
//   });
//   if (result.length > 0) {
//     console.log(result);
//   }
// }

// tester(
//   {
//     prePath: '/dev'
//     thresholds: {
//       default: 10,
//       goto: 10,
//       next: 10,
//       prev: 10,
//       pages: {
//         1: 10,
//         2: { next: 10 },
//         3: { next: 10, prev: 10 },
//         4: { next: 10, prev: 10, goto: 10 },
//       }
//     },
//     viewPort: {
//       width: 600,
//     },
//     element: '#topic__content_diagram'
//     prefix: ''                 // Output filename prefix
//     endpoint: '',
//   },
//   'goto',
//   'nextPrev',
//   3,                           // Test page 3 only
//   [3, 3],                      // Test page 3 only
//   [1, 10, 5, 3]                // Go from page 1 to 10, to 5, to 3
// );
export default function tester(optionsOrScenario, ...scenarios) {
  const allTests = [];
  const fullPath = module.parent.filename.split('/').slice(0, -1).join('/');
  const defEndpoint = fullPath.split('/').slice(3, -1).join('/');
  const contentPath = `${fullPath.split('/').slice(0, -1).join('/')}/content.js`;
  // const replacementsPath = cleanReplacementFolder(fullPath);
  const replacementsPath = getReplacementsFolder(fullPath);
  let scenariosToUse = scenarios;

  const defaultOptions = {
    thresholds: 20,
    viewPort: {
      width: 600,
    },
    element: '#topic__content_diagram',
    prePath: '',
    prefix: '',
    endpoint: defEndpoint,
  };
  let optionsToUse = defaultOptions;
  if (Array.isArray(optionsOrScenario) || typeof optionsOrScenario === 'string' || typeof optionsOrScenario === 'number') {
    scenariosToUse = [optionsOrScenario, ...scenarios];
  } else {
    optionsToUse = joinObjects({}, defaultOptions, optionsOrScenario);
  }
  const { prePath } = optionsToUse;
  scenariosToUse.forEach((scenario) => {
    if (typeof scenario === 'string') {
      const numPages = contentSectionCount(contentPath);
      if (scenario === 'goto') {
        for (let i = 1; i <= numPages; i += 1) {
          allTests.push([i, [i], optionsToUse]);
        }
        // for (let i = 14; i <= 14; i += 1) {
        //   allTests.push([i, [i], optionsToUse]);
        // }
      } else if (scenario === 'nextPrev') {
        allTests.push([1, [numPages, 1], optionsToUse]);
        // allTests.push([13, [14], optionsToUse]);
      } else if (scenario === 'next') {
        allTests.push([1, [numPages], optionsToUse]);
      } else if (scenario === 'prev') {
        allTests.push([numPages, [1], optionsToUse]);
      }
    } else {
      let fromPage = 1;
      let toPages = 1;
      if (Array.isArray(scenario)) {
        [fromPage] = scenario;
        toPages = scenario.slice(1);
      } else {
        fromPage = scenario;
        toPages = [scenario];
      }
      allTests.push([fromPage, toPages, optionsToUse]);
    }
  });
  // console.log(allTests)
  const { endpoint } = optionsToUse;

  // eslint-disable-next-line jest/valid-describe
  describe(`${endpoint}`, () => {
    test.each(allTests)(
      'From: %i, to: %s',
      async (fromPage, toPages, options) => {
        // jest.setTimeout(180000);
        let errorFlag = false;
        const fullpath =
          `${sitePath}${prePath}/${endpoint}?page=${fromPage}`;
        try {
          // console.log(fullpath)
          // await page.goto(`${sitePath}${prePath}/${endpoint}?page=1`, { waitUntil: 'load' });
          await page.goto(fullpath, { waitUntil: 'load' });
          sleep(1000);
          await page.goto(fullpath, { waitUntil: 'load' });
        } catch (e) {
          // await page.goto(fullpath, { waitUntil: 'networkidle' });
          // eslint-disable-next-line no-console
          console.log(e);
          throw new Error(e);
        }
        await sleep(1000);
        await page.setViewportSize({
          width: options.viewPort.width,
          height: options.viewPort.width,
        });

        const pageHeight = await page.evaluate(() => document.body.getBoundingClientRect().height);

        await page.setViewportSize({
          width: options.viewPort.width,
          height: Math.floor(pageHeight),
        });

        await stopHintButton();

        await page.evaluate(() => {
          window.scrollTo(0, 0);
        });

        const clippingBox = await (await page.$(options.element)).boundingBox();

        let currentPage = fromPage;
        const next = 'topic__button-next';
        const prev = 'topic__button-previous';
        let navigation = next;
        for (let k = 0; k < toPages.length; k += 1) {
          const targetPage = toPages[k];
          if (targetPage > currentPage) {
            navigation = next;
          } else if (targetPage < currentPage) {
            navigation = prev;
          } else {
            navigation = null;
          }

          // Wait for page to stop animating
          await page.waitForFunction('window.presentationFormatTransitionStatus === "steady"');

          // Open all hints on a page
          let hints = await openHints();
          // await sleep(500);

          // Take screenshot
          // await redraw();
          // await getPos();
          let image = await page.screenshot({ clip: clippingBox });
          // writeImage(image, `${fullPath}/test_image2.png`);
          const gotoThreshold = getThreshold(currentPage, options.thresholds, 'goto');
          let fileName = `${options.prefix}page ${currentPage}`;
          try {
            // console.log('try 1')
            expect(image).toMatchImageSnapshot({
              failureThreshold: gotoThreshold,
              customSnapshotIdentifier: fileName,
            });
          } catch (error) {
            // eslint-disable-next-line
            // console.log('error 1')
            // console.log(error);
            writeImage(image, `${replacementsPath}/${fileName}-snap.png`);
            errorFlag = true;
          }
          // console.log('try 1 done')

          // Find all links on page that go to QR popups
          const qrLinks = await page.$$('.topic__qr_action_word');
          let index = 0;

          for (const originalLink of qrLinks) {
            // Need to reget element incase a react redraw has happened
            const id = await (await originalLink.getProperty('id')).jsonValue();
            const link = await page.$(`#${id}`);
            await link.click();
            await page.mouse.move(0, 0);
            await sleep(500);

            fileName = `${options.prefix}page ${currentPage} - QR ${index}`;
            // await redraw();
            image = await page.screenshot({ clip: clippingBox });
            try {
              // console.log('try 2')
              expect(image).toMatchImageSnapshot({
                failureThreshold: gotoThreshold,
                customSnapshotIdentifier: fileName,
              });
            } catch (error) {
              // console.log('error 2')
              // eslint-disable-next-line
              console.log(error);
              writeImage(image, `${replacementsPath}/${fileName}-snap.png`);
              errorFlag = true;
            }
            // console.log('try 2 done')
            index += 1;

            // Close the QR window
            const closeButtons = await page.$$('.topic__qr__title_close');
            for (const closeButton of closeButtons) {
              const box = await closeButton.boundingBox();
              if (box != null && box.x > 0) {
                await closeButton.click();
                break;
              }
            }
          }

          while (currentPage.toString() !== targetPage.toString()) {
            if (navigation != null) {
              const watchDog = page.waitForFunction(() => {
                if (window.frameCounter == null) {
                  window.frameCounter = 0;
                }
                window.frameCounter += 1;
                if (window.frameCounter === 30) {
                  window.frameCounter = 0;
                  return true;
                }
                return false;
              }, null, { polling: 'raf' });

              const hrefElement = await page.$(`#${navigation}`);
              await hrefElement.click();
              await page.mouse.click(0, 0);
              await watchDog;
            }
            await sleep(100);

            await page.waitForFunction('window.presentationFormatTransitionStatus === "steady"');

            // Get current page
            await browser.contexts()[0].cookies()
              .then(cookies => cookies.filter(c => c.name === 'page'))
              .then(cookies => cookies.filter(c => c.path.length > 1))
              // eslint-disable-next-line no-loop-func
              .then((pageCookie) => {
                currentPage = pageCookie[0].value;
              });

            const comingFrom = navigation === next ? 'next' : 'prev';
            const threshold = getThreshold(currentPage, options.thresholds, comingFrom);

            // Open all hints on a page
            hints = await openHints();

            // Take screenshot
            // await sleep(500);
            // await redraw();
            image = await page.screenshot({ clip: clippingBox });
            fileName = `${options.prefix}page ${currentPage}`;
            // await getPos();
            try {
              // console.log('try 3')
              expect(image).toMatchImageSnapshot({
                failureThreshold: threshold,
                customSnapshotIdentifier: fileName,
              });
            } catch (error) {
              // console.log('error 3')
              // eslint-disable-next-line
              console.log(error);
              writeImage(image, `${replacementsPath}/${k}/${fileName}-snap.png`);
              errorFlag = true;
            }
            // console.log('try 3 done', currentPage)

            // Close all hints on a page
            await closeHints(hints);
          }
        }
        if (errorFlag) {
          expect(true).toBe(false);
        }
        // context1.close();
      },
      200000,
    );
  });
}
