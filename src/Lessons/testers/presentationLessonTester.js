/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const fs = require('fs');

const sitePath = process.env.TIG__ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

function contentSectionCount(testPath, topicName) {
  let fileName = testPath.split('/').slice(0, -1).join('/');
  fileName = `${fileName}/${topicName}/content.js`;
  const content = fs.readFileSync(fileName, 'utf8');
  return (content.match(/\n *this\.addSection/g) || []).length;
}

function joinObjects(...objects) {
  // if (typeof objects === 'object') {
  //   return objects;
  // }
  const assignObjectFromTo = (fromObject, toObject) => {
    Object.keys(fromObject).forEach((key) => {
      const value = fromObject[key];
      if (typeof value === 'number'
        || typeof value === 'boolean'
        || typeof value === 'string'
        || value == null
        || typeof value === 'function'
        || typeof value._dup === 'function'
        || Array.isArray(value)
      ) {
        // console.log(value, toObject[key])
        if (value !== undefined || toObject[key] === undefined) {
          // eslint-disable-next-line no-param-reassign
          toObject[key] = value;
        }
      } else {
        const toValue = toObject[key];
        if (typeof toValue === 'number'
          || typeof toValue === 'boolean'
          || typeof toValue === 'string'
          || toValue == null
          || typeof toValue === 'function'
          || Array.isArray(toValue)
        ) {
          // eslint-disable-next-line no-param-reassign
          toObject[key] = {};
        }
        assignObjectFromTo(value, toObject[key]);
      }
    });
  };

  const num = objects.length;
  const out = objects[0];
  for (let i = 1; i < num; i += 1) {
    const o = objects[i];
    if (o != null) {
      assignObjectFromTo(o, out);
    }
  }
  return out;
}

// tester(
//   {
//     thresholds: {
//       goto: 0.00001,
//       next: 0.0001,
//       prev: 0.0001,
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
//   'explanation',
//   'summary',
//   [
//     ['explanation', 3, [1, 5]],
//   ],
// );
function getThreshold(page, options, comingFrom) {
  const defaultThreshold = options.thresholds[comingFrom];
  if (options.pages[page] == null) {
    return defaultThreshold.toString();
  }
  const pageOptions = options.pages[page];
  if (pageOptions.threshold != null && typeof pageOptions.threshold === 'string') {
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
  const path = fullPath.split('/').slice(-3, -1).join('/');

  let scenariosToUse = scenarios;
  const defaultOptions = {
    thresholds: {
      goto: 0.00002,  // 7 pixels
      next: 0.00002,  // 7 pixels
      prev: 0.00002,  // 7 pixels
    },
    viewPort: {
      width: 600,
      height: 400,
      scrollTo: 180,
    },
    pages: {},
  };
  let optionsToUse = defaultOptions;
  if (Array.isArray(optionsOrScenario) || typeof optionsOrScenario === 'string') {
    scenariosToUse = [optionsOrScenario, ...scenarios];
  } else {
    optionsToUse = joinObjects({}, defaultOptions, optionsOrScenario);
  }
  scenariosToUse.forEach((scenario) => {
    if (typeof scenario === 'string') {
      const topicName = scenario;
      const numPages = contentSectionCount(fullPath, topicName);
      for (let i = 1; i <= numPages; i += 1) {
        allTests.push([topicName, i, [i], optionsToUse]);
      }
      allTests.push([topicName, 1, [numPages, 1], optionsToUse]);
    } else {
      scenario.forEach((extraScenario) => {
        allTests.push([...extraScenario, optionsToUse]);
      });
    }
  });

  describe(`${path}`, () => {
    test.each(allTests)(
      '%s - from: %i, to: %s',
      async (topicName, fromPage, toPages, options) => {
        jest.setTimeout(120000);
        const fullpath =
          `${sitePath}/Lessons/Math/Geometry_1/${path}/${topicName}?page=${fromPage}`;
        await page.goto(fullpath);

        await page.setViewport({
          width: options.viewPort.width,
          height: options.viewPort.height,
        });

        await page.evaluate((y) => {
          window.scrollTo(0, y);
        }, options.viewPort.scrollTo);

        let currentPage = fromPage;
        const next = 'lesson__button-next';
        const prev = 'lesson__button-previous';
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
          await page.waitForFunction('window.presentationLessonTransitionStatus === "steady"');

          // Take screenshot
          // eslint-disable-next-line no-await-in-loop
          let image = await page.screenshot();
          const gotoThreshold = getThreshold(currentPage, options, 'goto');
          expect(image).toMatchImageSnapshot({
            failureThreshold: gotoThreshold,             // 480 pixels
            failureThresholdType: 'percent',
            customSnapshotIdentifier: `${topicName} page ${currentPage}`,
          });
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
            await page.waitForFunction('window.presentationLessonTransitionStatus === "steady"');

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
            // Take screenshot
            // eslint-disable-next-line no-await-in-loop
            image = await page.screenshot();
            expect(image).toMatchImageSnapshot({
              failureThreshold: threshold,             // 480 pixels
              failureThresholdType: 'percent',
              customSnapshotIdentifier: `${topicName} page ${currentPage}`,
            });
          }
        }
      },
    );
  });
}
