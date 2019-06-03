/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import joinObjects from './tools';

const sitePath = process.env.TIG_ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function tester(optionsOrScenario, ...scenarios) {
  const fullPath = module.parent.filename.split('/').slice(0, -1).join('/');
  const versionPath = fullPath.split('/').slice(4, -1).join('/');
  let scenariosToUse = scenarios;
  const defaultOptions = {
    prePath: '',
  };
  let optionsToUse = defaultOptions;
  if ('prePath' in optionsOrScenario) {
    optionsToUse = joinObjects({}, defaultOptions, optionsOrScenario);
  } else {
    scenariosToUse = [optionsOrScenario, ...scenarios];
  }
  const { prePath } = optionsToUse;

  const allTests = [];
  scenariosToUse.forEach((scenario) => {
    let { includeQRs } = scenario;
    if (includeQRs == null) {
      includeQRs = false;
    }
    allTests.push([scenario.width, scenario.height, scenario.scrollTo, includeQRs]);
  });

  describe(`${fullPath}`, () => {
    test.each(allTests)(
      '%i %i, scroll: %i, QRs: %b',
      async (width, height, scrollTo, includeQRs) => {
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
        if (includeQRs) {
          // Find all links on page that go to QR popups
          // eslint-disable-next-line no-await-in-loop, no-loop-func
          const qrLinks = await page.$$('.lesson__qr_action_word');
          let index = 0;
          // eslint-disable-next-line no-restricted-syntax
          for (const link of qrLinks) {
            // eslint-disable-next-line no-await-in-loop
            await link.click();
            await sleep(200);
            // eslint-disable-next-line no-await-in-loop
            await page.evaluate(() => {
              window.scrollTo(0, 0);
            });
            // const linconsole.log(await link.boundingBox())
            const linkBox = await link.boundingBox();
            // eslint-disable-next-line no-await-in-loop
            await page.evaluate((y) => {
              window.scrollTo(0, y);
            }, linkBox.y);
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
