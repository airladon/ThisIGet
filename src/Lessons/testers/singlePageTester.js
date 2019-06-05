/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import joinObjects from './tools';

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// tester(
//   {
//     prePath: 'dev'
//     thresholds: 0.0001,
//   },
//   {
//    width: 300,
//    height: 600,
//    includeQRs: true,
//    threshold: 0.001,
//   },
//   {
//    width: 300,
//    height: 'full',
//   },
//   {
//    width: 300,
//   },
// );

export default function tester(optionsOrScenario, ...scenarios) {
  const fullPath = module.parent.filename.split('/').slice(0, -1).join('/');
  const versionPath = fullPath.split('/').slice(4, -1).join('/');
  let scenariosToUse = scenarios;
  const defaultOptions = {
    prePath: '',
    threshold: 0.00001,
  };
  let optionsToUse = defaultOptions;
  if ('prePath' in optionsOrScenario || 'threshold' in optionsOrScenario) {
    optionsToUse = joinObjects({}, defaultOptions, optionsOrScenario);
  } else {
    scenariosToUse = [optionsOrScenario, ...scenarios];
  }
  const { prePath } = optionsToUse;

  const allTests = [];
  scenariosToUse.forEach((scenarioIn) => {
    const defaultScenario = {
      threshold: optionsToUse.threshold,
      height: 'full',
      includeQRs: false,
    };
    const scenario = joinObjects({}, defaultScenario, scenarioIn);
    allTests.push([
      scenario.width, scenario.height, scenario.includeQRs, scenario.threshold,
    ]);
  });

  describe(`${fullPath}`, () => {
    test.each(allTests)(
      'width: %i height: %p, QRs: %p, Threshold: %f',
      async (width, height, includeQRs, threshold) => {
        jest.setTimeout(120000);
        const fullpath = `${sitePath}${prePath}/${versionPath}`;
        await page.goto(fullpath);
        await page.evaluate(() => {
          window.scrollTo(0, 0);
        });
        if (height === 'full') {
          await page.setViewport({ width, height: 1000 });
          const lessonContainerTemp = await page.$('#lesson__content');
          const lessonBoxTemp = await lessonContainerTemp.boundingBox();
          await page.setViewport({ width, height: Math.floor(lessonBoxTemp.height) });
        } else {
          await page.setViewport({ width, height });
        }
        const lessonContainer = await page.$('#lesson__content');
        const lessonBox = await lessonContainer.boundingBox();
        await page.evaluate((y) => {
          window.scrollTo(0, y);
        }, Math.floor(lessonBox.y));
        let image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
          failureThreshold: threshold,             // 480 pixels
          failureThresholdType: 'percent',
          customSnapshotIdentifier: `${width}-${height}`,
        });
        if (includeQRs) {
          // Find all links on page that go to QR popups
          // eslint-disable-next-line no-await-in-loop, no-loop-func
          const qrLinks = await page.$$('.lesson__qr_action_word');
          let index = 0;
          // eslint-disable-next-line no-restricted-syntax
          for (const link of qrLinks) {
            // eslint-disable-next-line no-await-in-loop
            await link.click();
            // eslint-disable-next-line no-await-in-loop
            await page.mouse.move(0, 0);
            // eslint-disable-next-line no-await-in-loop
            await sleep(500);
            // eslint-disable-next-line no-await-in-loop
            await page.evaluate(() => {
              window.scrollTo(0, 0);
            });
            // eslint-disable-next-line no-await-in-loop
            const linkBox = await link.boundingBox();
            // eslint-disable-next-line no-await-in-loop
            await page.evaluate((y) => {
              window.scrollTo(0, y);
            }, linkBox.y);
            // eslint-disable-next-line no-await-in-loop
            image = await page.screenshot();
            expect(image).toMatchImageSnapshot({
              failureThreshold: threshold,             // 480 pixels
              failureThresholdType: 'percent',
              customSnapshotIdentifier: `${width}-${height}-QR-${index}`,
            });
            index += 1;
            // eslint-disable-next-line no-await-in-loop
            const closeButtons = await page.$$('.lesson__qr__title_close');
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
          }
        }
      },
    );
  });
}
