/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import joinObjects from './tools';

// const lessonUID = require.resolve('../../../details').split('/').slice(-2, -1)[0];
// const versionUID = require.resolve('../version').split('/').slice(-2, -1)[0];
// const topic = require.resolve('../version').split('/').slice(-3, -2)[0];

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

export default function tester(optionsOrScenario, ...scenarios) {
  const fullPath = module.parent.filename.split('/').slice(0, -1).join('/');
  const versionPath = fullPath.split('/').slice(4, -1).join('/');
  let scenariosToUse = scenarios;
  const defaultOptions = {
    // viewPort: {
    //   width: 600,
    //   height: 320,
    //   scrollTo: 200,
    // },
    prePath: '',
  };
  let optionsToUse = defaultOptions;
  if (Array.isArray(optionsOrScenario) || typeof optionsOrScenario === 'string' || typeof optionsOrScenario === 'number') {
    scenariosToUse = [optionsOrScenario, ...scenarios];
  } else {
    optionsToUse = joinObjects({}, defaultOptions, optionsOrScenario);
  }
  const { prePath } = optionsToUse;

  const allTests = [];
  scenariosToUse.forEach((scenario) => {
    allTests.push([scenario.width, scenario.height, scenario.scrollTo]);
  });

  describe(`${fullPath}`, () => {
    test.each(allTests)(
      '%i %i, %i',
      async (width, height, scrollTo) => {
        const fullpath = `${sitePath}${prePath}/${versionPath}`;
        await page.goto(fullpath);
        await page.setViewport({ width, height });
        await page.evaluate((y) => {
          window.scrollTo(0, y);
        }, scrollTo);
        let image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
          customSnapshotIdentifier: `${width}-${height}-${scrollTo}`,
        });

        // Find all links on page that go to QR popups
        // eslint-disable-next-line no-await-in-loop, no-loop-func
        const qrLinks = await page.$$('.lesson__qr_action_word');
        let index = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const link of qrLinks) {
          // eslint-disable-next-line no-await-in-loop
          await link.click();
          // eslint-disable-next-line no-await-in-loop
          // await page.evaluate((y) => {
          //   window.scrollTo(0, y);
          // }, scrollTo);
          // eslint-disable-next-line no-await-in-loop
          image = await page.screenshot();
          expect(image).toMatchImageSnapshot({
            // failureThreshold: gotoThreshold,             // 480 pixels
            // failureThresholdType: 'percent',
            customSnapshotIdentifier: `${width}-${height}-${scrollTo}-QR-${index}`,
          });
          index += 1;
          // eslint-disable-next-line no-await-in-loop
          const closeButtons = await page.$$('.lesson__qr__title_close');
          // eslint-disable-next-line no-restricted-syntax
          for (const closeButton of closeButtons) {
            const box = await closeButton.boundingBox();
            if (box != null && box.x > 0) {
              await closeButton.click();
              break;
            }
          }
          // // eslint-disable-next-line no-await-in-loop
          // await page.evaluate((y) => {
          //   window.scrollTo(0, y);
          // }, options.viewPort.scrollTo);
        }
      },
    );
    // test('All', async () => {
    //   const fullpath = `${sitePath}${prePath}/${versionPath}`;
    //   await page.goto(fullpath);
    //   await page.setViewport({ width: 400, height: 1000 });
    //   await page.evaluate(() => {
    //     window.scrollTo(0, 220);
    //   });
    //   const image = await page.screenshot();
    //   expect(image).toMatchImageSnapshot({
    //     customSnapshotIdentifier: 'All',
    //   });
    // });
  });
}
