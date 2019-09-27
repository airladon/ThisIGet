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

// const sleep = (milliseconds) => {
//   return new Promise(resolve => setTimeout(resolve, milliseconds))
// }

// tester(
//   {
//     prePath: 'dev'
//     thresholds: {
//       goto: 0.00001,
//       next: 10,
//       prev: 10,
//     },
//     viewPort: {
//       width: 600,
//       height: 400,
//       scrollTo: 180,
//     },
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
  // const path = fullPath.split('/').slice(-3, -1).join('/');
  const versionPath = fullPath.split('/').slice(4, -1).join('/');
  const contentPath = `${fullPath.split('/').slice(0, -1).join('/')}/content.js`;
  let scenariosToUse = scenarios;
  const defaultOptions = {
    thresholds: {
      goto: 10,  // 10 pixels
      next: 10,  // 10 pixels
      prev: 10,  // 10 pixels
    },
    viewPort: {
      width: 600,
      // height: 320,
      // scrollTo: 200,
    },
    pages: {},
    prePath: '',
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
        await sleep(200);
        await page.evaluate(() => {
          window.scrollTo(0, 0);
        });
        await page.setViewport({
          width: options.viewPort.width,
          height: options.viewPort.width / 2 * 10,
        });
        const topicContainer = await page.$('#topic__content');
        const topicBox = await topicContainer.boundingBox();
        const scrollTo = Math.floor(topicBox.y);
        await page.setViewport({
          width: options.viewPort.width,
          height: Math.floor(topicBox.height) * 10,
        });

        // await page.evaluate((y) => {
        //   window.scrollTo(0, y);
        // }, scrollTo);
        await sleep(200);


        const diagram = await page.$('#topic__content_diagram');
        const diagramBox = await diagram.boundingBox();
        const clippingBox = {
          x: diagramBox.x,
          y: diagramBox.y + scrollTo,
          // y: diagramBox.y,
          width: diagramBox.width,
          height: diagramBox.height,
        };

        // console.log(await page.evaluate(() =>
        //   window.getComputedStyle(document.querySelector('#id_diagram__gl__low')).zIndex
        // ));
        console.log(await page.evaluate(() => {
          const {top, left, bottom, right} = document.querySelector('#topic__content_diagram').getBoundingClientRect();
          return {x: left, y: top, width: right-left, height: bottom - top}
        }));

        console.log(await page.evaluate(() => {
          const {top, left, bottom, right} = document.querySelector('#id_diagram__gl__low').getBoundingClientRect();
          return {x: left, y: top, width: right-left, height: bottom - top}
        }));
        console.log(await page.evaluate(() => {
          const {top, left, bottom, right} = document.querySelector('#id_diagram__text__low').getBoundingClientRect();
          return {x: left, y: top, width: right-left, height: bottom - top}
        }));
        console.log(await page.evaluate(() => {
          const {top, left, bottom, right} = document.querySelector('#id_diagram__html').getBoundingClientRect();
          return {x: left, y: top, width: right-left, height: bottom - top}
        }
        ));
        // console.log(await page.evaluate(() =>
        //   document.querySelector('#id_diagram__html').getBoundingClientRect()
        // ));

        // console.log(zIndex)
        const main = await page.$('#topic__content_diagram');
        const mainBox = await main.boundingBox();
        console.log(mainBox)

        const gl = await page.$('#id_diagram__gl__low');
        const glBox = await gl.boundingBox();
        console.log(glBox)

        const text = await page.$('#id_diagram__text__low');
        const textBox = await text.boundingBox();
        console.log(textBox)

        const html = await page.$('#id_diagram__html');
        const htmlBox = await html.boundingBox();
        console.log(htmlBox)

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

          // eslint-disable-next-line no-await-in-loop
          await page.waitForFunction('window.presentationFormatTransitionStatus === "steady"');

          // Open all hints on a page
          let hints = await page.$$('.presentation__hint_label');
          for (const hint of hints) {
            const id = await (await hint.getProperty('id')).jsonValue();
            const hintText = await page.$(`#${id}`);
            await hintText.click();
          }

          // Take screenshot
          // await sleep(2000);
          console.log(scrollTo)
          console.log(clippingBox)
          const testPath = module.parent.filename.split('/').slice(0, -1).join('/');
          // eslint-disable-next-line no-await-in-loop
          let image = await page.screenshot({ clip: clippingBox });
          writeImage(image, `${testPath}/test_image.png`);
          image = await page.screenshot();
          writeImage(image, `${testPath}/test_image1.png`);
          console.log(image.toString().length)
          image = await page.screenshot({
            clip: await gl.boundingBox(),
          });
          writeImage(image, `${testPath}/test_image2.png`);
          const gotoThreshold = getThreshold(currentPage, options, 'goto');
          expect(image).toMatchImageSnapshot({
            failureThreshold: gotoThreshold,             // 480 pixels
            // failureThresholdType: 'percent',
            customSnapshotIdentifier: `page ${currentPage}`,
          });

          // Find all links on page that go to QR popups
          // eslint-disable-next-line no-await-in-loop, no-loop-func
          const qrLinks = await page.$$('.topic__qr_action_word');
          let index = 0;
          // eslint-disable-next-line no-restricted-syntax
          for (const originalLink of qrLinks) {
            // Need to reget element incase a react redraw has happened
            const id = await (await originalLink.getProperty('id')).jsonValue();
            const link = await page.$(`#${id}`);
            // eslint-disable-next-line no-await-in-loop
            await link.click();
            // eslint-disable-next-line no-await-in-loop
            await page.mouse.move(0, 0);
            // eslint-disable-next-line no-await-in-loop
            await sleep(500);
            // eslint-disable-next-line no-await-in-loop
            await page.evaluate((y) => {
              window.scrollTo(0, y);
            }, scrollTo);
            // eslint-disable-next-line no-await-in-loop
            image = await page.screenshot({ clip: clippingBox });
            expect(image).toMatchImageSnapshot({
              failureThreshold: gotoThreshold,             // 480 pixels
              // failureThresholdType: 'percent',
              customSnapshotIdentifier: `page ${currentPage} - QR ${index}`,
            });
            index += 1;
            // eslint-disable-next-line no-await-in-loop
            const closeButtons = await page.$$('.topic__qr__title_close');
            // eslint-disable-next-line no-restricted-syntax
            for (const closeButton of closeButtons) {
              // eslint-disable-next-line no-await-in-loop
              const box = await closeButton.boundingBox();
              if (box != null && box.x > 0) {
                // eslint-disable-next-line no-await-in-loop
                await closeButton.click();
                break;
              }
            }
            // eslint-disable-next-line no-await-in-loop
            await page.evaluate((y) => {
              window.scrollTo(0, y);
            }, scrollTo);
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
              // console.log(currentPage, targetPage)
              // eslint-disable-next-line no-await-in-loop
              const hrefElement = await page.$(`#${navigation}`);
              // eslint-disable-next-line no-await-in-loop
              await hrefElement.click();
              // eslint-disable-next-line no-await-in-loop
              await page.mouse.click(0, 0);
              // eslint-disable-next-line no-await-in-loop
              await watchDog;
            }

            // eslint-disable-next-line no-await-in-loop
            await page.waitForFunction('window.presentationFormatTransitionStatus === "steady"');

            // Get current page
            // eslint-disable-next-line no-await-in-loop
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
            hints = await page.$$('.presentation__hint_label');
            for (const hint of hints) {
              const id = await (await hint.getProperty('id')).jsonValue();
              const hintText = await page.$(`#${id}`);
              await hintText.click();
            }

            // Take screenshot
            // eslint-disable-next-line no-await-in-loop
            image = await page.screenshot({ clip: clippingBox });
            expect(image).toMatchImageSnapshot({
              failureThreshold: threshold,             // 480 pixels
              // failureThresholdType: 'percent',
              customSnapshotIdentifier: `page ${currentPage}`,
            });

            // Close all hints on a page
            for (const hint of hints) {
              const id = await (await hint.getProperty('id')).jsonValue();
              const hintText = await page.$(`#${id}`);
              await hintText.click();
            }
          }
        }
      },
    );
  });
}
