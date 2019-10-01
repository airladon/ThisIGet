/* eslint-disable import/no-extraneous-dependencies, no-await-in-loop, no-restricted-syntax */
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
//     thresholds: 10,      // 10 pixels allowed to be different
//     element: '#topic__content',
//     prefix: ''           // filename prefix
//
//   },
//   {
//    width: 300,
//    height: 600,
//    includeQRs: true,
//    threshold: 10,
//   },
//   {
//    width: 300,
//    height: 'full',
//   },
//   {
//    width: 300,
//   },
// );

async function removeRatings(page) {
  await page.evaluate(() => {
    (document.querySelectorAll(
      '.rating__container, .approach__links_table__small_screen__value',
    ) || []).forEach(
      (el) => {
        // eslint-disable-next-line no-param-reassign
        el.style.visibility = 'hidden';
      },
    );
  });
}

async function removeTopicVariables(page) {
  await page.evaluate(() => {
    (document.querySelectorAll(
      '.topic__variable',
    ) || []).forEach(
      (el) => {
        // eslint-disable-next-line no-param-reassign
        el.style.visibility = 'hidden';
      },
    );
  });
}

// eslint-disable no-await-in-loop
export default function tester(optionsOrScenario, ...scenarios) {
  const fullPath = module.parent.filename.split('/').slice(0, -1).join('/');
  const defEndpoint = fullPath.split('/').slice(4, -1).join('/');
  let scenariosToUse = scenarios;
  const defaultOptions = {
    height: 'auto',
    includeQRs: false,
    prePath: '',
    threshold: 10,
    element: '#topic__content',
    prefix: '',
    endpoint: defEndpoint,
  };
  let optionsToUse = defaultOptions;
  if (!('width' in optionsOrScenario)) {
    optionsToUse = joinObjects({}, defaultOptions, optionsOrScenario);
  } else {
    scenariosToUse = [optionsOrScenario, ...scenarios];
  }
  const allTests = [];
  scenariosToUse.forEach((scenarioIn) => {
    const scenario = joinObjects({}, optionsToUse, scenarioIn);
    const scenarioOptions = {
      element: scenario.element,
      prefix: scenario.prefix,
      endpoint: scenario.endpoint,
      threshold: scenario.threshold,
      prePath: scenario.prePath,
    };

    allTests.push([
      scenario.width, scenario.height, scenario.includeQRs, scenario.endpoint, scenarioOptions,
    ]);
  });

  describe(`${fullPath}`, () => {
    test.each(allTests)(
      'width: %i height: %p, QRs: %p, endpoint: %s',
      async (width, height, includeQRs, endpoint, options) => {
        jest.setTimeout(120000);
        const fullpath = `${sitePath}${options.prePath}/${options.endpoint}`;
        await page.goto(fullpath, { waitUntil: 'networkidle0' });
        // await sleep(1000);

        // Open all hints on a page
        let hints = await page.$$('.simple__hint_label');
        for (const hint of hints) {
          await hint.click();
        }

        hints = await page.$$('.simple__hint_label_low');
        for (const hint of hints) {
          await hint.click();
        }

        await page.evaluate(() => {
          window.scrollTo(0, 0);
        });

        // const contentBox = await (await page.$('#topic__content'))
        //   .boundingBox();
        const pageBox = await (await page.$('body'))
          .boundingBox();

        if (height === 'auto') {
          await page.setViewport({ width, height: 1000 });
          await page.setViewport({ width, height: Math.floor(pageBox.height) });
        } else {
          await page.setViewport({ width, height });
        }

        // await page.evaluate((y) => {
        //   window.scrollTo(0, y);
        // }, Math.floor(pageBox.y));
        let clippingBox = await (await page.$(options.element)).boundingBox();
        await removeRatings(page);
        await removeTopicVariables(page);
        let image = await page.screenshot({ clip: clippingBox });
        expect(image).toMatchImageSnapshot({
          failureThreshold: options.threshold,
          customSnapshotIdentifier: `${options.prefix}${width}-${height}`,
        });
        if (includeQRs) {
          // Find all links on page that go to QR popups
          // eslint-disable-next-line no-loop-func
          const qrLinks = await page.$$('.topic__qr_action_word');
          let index = 0;
          // eslint-disable-next-line no-restricted-syntax
          for (const link of qrLinks) {
            await link.click();
            await page.mouse.move(0, 0);
            await sleep(1000);
            clippingBox = await (await page.$('.topic__qr__container')).boundingBox();

            await page.evaluate(() => {
              window.scrollTo(0, 0);
            });
            // const linkBox = await link.boundingBox();
            // await page.evaluate((y) => {
            //   window.scrollTo(0, y);
            // }, linkBox.y);
            image = await page.screenshot({ clip: clippingBox });
            expect(image).toMatchImageSnapshot({
              failureThreshold: options.threshold,
              customSnapshotIdentifier: `${options.prefix}${width}-${height}-QR-${index}`,
            });
            index += 1;
            const closeButtons = await page.$$('.topic__qr__title_close');
            // eslint-disable-next-line no-restricted-syntax
            for (const closeButton of closeButtons) {
              const box = await closeButton.boundingBox();
              if (box != null && box.x > 0) {
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
