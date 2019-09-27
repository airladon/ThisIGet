/* eslint-disable import/no-extraneous-dependencies, no-await-in-loop, no-restricted-syntax */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import joinObjects from './tools';

const fs = require('fs');

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function contentSectionCount(contentPath) {
  // let fileName = testPath.split('/').slice(0, -1).join('/');
  // fileName = `${fileName}/${topicName}/content.js`;
  const content = fs.readFileSync(contentPath, 'utf8');
  return (content.match(/\n *this\.addSection/g) || []).length;
}

function writeImage(image, path) {
  fs.writeFile(path, image, function(err) {
    if(err) {
      return console.log(err);
    }
}); 
}

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
// const sleep = (milliseconds) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

// tester(
//   {
//     prePath: '/dev'
//     thresholds: {
//       goto: 10,
//       next: 10,
//       prev: 10,
//     },
//     viewPort: {
//       width: 600,
//       height: 400,
//       scrollTo: 180,
//     },
//     element: '#topic__content_diagram'
//     pages: {
//       1: { threshold: { goto: 0.001, next: 0.01, prev: 0.01 } },
//       2: { threshold: 0.003 },
//       3: { otherOptions: 'a' },
//     },
//   },
//   'goto',
//   'nextPrev',
//   3,                           // Test page 3 only
//   [3, 3],                      // Test page 3 only
//   [1, 10, 5, 3]                // Go from page 1 to 10, to 5, to 3
// );

// eslint-disable no-await-in-loop no-loop-func no-restricted-syntax
function getThreshold(page, options, comingFrom) {
  const defaultThreshold = options.thresholds[comingFrom];
  if (options.pages[page] == null) {
    return defaultThreshold.toString();
  }
  const pageOptions = options.pages[page];
  if (pageOptions.threshold != null
    && (typeof pageOptions.threshold === 'string' || typeof pageOptions.threshold === 'number')
  ) {
    return pageOptions.threshold.toString();
  }
  if (pageOptions.threshold != null && pageOptions.threshold[comingFrom] != null) {
    return pageOptions.threshold[comingFrom].toString();
  }
  return defaultThreshold.toString();
}

export default function tester(optionsOrScenario, ...scenarios) {
  const allTests = [];
  const fullPath = module.parent.filename.split('/').slice(0, -1).join('/');
  const versionPath = fullPath.split('/').slice(4, -1).join('/');
  const contentPath = `${fullPath.split('/').slice(0, -1).join('/')}/content.js`;
  let scenariosToUse = scenarios;
  const defaultOptions = {
    thresholds: {
      goto: 10,
      next: 10,
      prev: 10,
    },
    viewPort: {
      width: 600,
    },
    element: '#topic__content_diagram',
    pages: {},
    prePath: '',
    fileNamePrefix: '',
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
      } else if (scenario === 'nextPrev') {
        allTests.push([1, [numPages, 1], optionsToUse]);
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

  describe(`${versionPath}`, () => {
    test.each(allTests)(
      'From: %i, to: %s',
      async (fromPage, toPages, options) => {
        jest.setTimeout(180000);
        const fullpath =
          `${sitePath}${prePath}/${versionPath}?page=${fromPage}`;
        try {
          await page.goto(fullpath);
        } catch {
          await page.goto(fullpath);
        }
        // await sleep(200);
        await page.setViewport({
          width: options.viewPort.width,
          height: options.viewPort.width,
        });

        const pageHeight = await page.evaluate(() => document.body.getBoundingClientRect().height);

        await page.setViewport({
          width: options.viewPort.width,
          height: Math.floor(pageHeight),
        });

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

          // Take screenshot
          let image = await page.screenshot({ clip: clippingBox });
          // writeImage(image, `${fullPath}/test_image2.png`);
          const gotoThreshold = getThreshold(currentPage, options, 'goto');
          expect(image).toMatchImageSnapshot({
            failureThreshold: gotoThreshold,
            customSnapshotIdentifier: `page ${currentPage}`,
          });

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

            image = await page.screenshot({ clip: clippingBox });
            expect(image).toMatchImageSnapshot({
              failureThreshold: gotoThreshold,
              customSnapshotIdentifier: `page ${currentPage} - QR ${index}`,
            });
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
              }, { polling: 'raf' });

              const hrefElement = await page.$(`#${navigation}`);
              await hrefElement.click();
              await page.mouse.click(0, 0);
              await watchDog;
            }

            await page.waitForFunction('window.presentationFormatTransitionStatus === "steady"');

            // Get current page
            await page.cookies()
              .then(cookies => cookies.filter(c => c.name === 'page'))
              .then(cookies => cookies.filter(c => c.path.length > 1))
              // eslint-disable-next-line no-loop-func
              .then((pageCookie) => {
                currentPage = pageCookie[0].value;
              });

            const comingFrom = navigation === next ? 'next' : 'prev';
            const threshold = getThreshold(currentPage, options, comingFrom);

            // Open all hints on a page
            hints = await openHints();

            // Take screenshot
            image = await page.screenshot({ clip: clippingBox });
            expect(image).toMatchImageSnapshot({
              failureThreshold: threshold,
              customSnapshotIdentifier: `${options.fileNamePrefix}page ${currentPage}`,
            });

            // Close all hints on a page
            await closeHints(hints);
          }
        }
      },
    );
  });
}
