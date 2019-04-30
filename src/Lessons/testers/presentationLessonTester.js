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

export default function tester(...scenarios) {
  const allTests = [];
  const fullPath = module.parent.filename.split('/').slice(0, -1).join('/');
  const path = fullPath.split('/').slice(-3, -1).join('/');
  // console.log()
  scenarios.forEach((scenario) => {
    if (typeof scenario === 'string') {
      const topicName = scenario;
      const numPages = contentSectionCount(fullPath, topicName);
      for (let i = 1; i <= numPages; i += 1) {
        allTests.push([topicName, i, [i]]);
      }
      allTests.push([topicName, 1, [numPages, 1]]);
    } else {
      scenario.forEach((extraScenario) => {
        allTests.push(extraScenario);
      });
    }
  });

  describe(`${path}`, () => {
    test.each(allTests)(
      '%s - from: %i, to: %s',
      async (topicName, fromPage, toPages) => {
        jest.setTimeout(120000);
        const fullpath =
          `${sitePath}/Lessons/Math/Geometry_1/${path}/${topicName}?page=${fromPage}`;
        await page.goto(fullpath);
        await page.setViewport({ width: 600, height: 400 });
        await page.evaluate(() => {
          window.scrollTo(0, 180);
        });

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
          expect(image).toMatchImageSnapshot({
            failureThreshold: '0.005',             // 480 pixels
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

            // Take screenshot
            // eslint-disable-next-line no-await-in-loop
            image = await page.screenshot();
            expect(image).toMatchImageSnapshot({
              failureThreshold: '0.005',             // 480 pixels
              failureThresholdType: 'percent',
              customSnapshotIdentifier: `${topicName} page ${currentPage}`,
            });
          }
        }
      },
    );
  });
}
