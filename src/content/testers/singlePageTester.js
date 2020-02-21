/* eslint-disable import/no-extraneous-dependencies, no-await-in-loop, no-restricted-syntax */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { joinObjects, writeImage, getReplacementsFolder } from './tools';
// import { getReplacementsFolder } from '../../../tests/browser/common';

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
        el.style.display = 'none';
      },
    );
  });
}

// eslint-disable no-await-in-loop
export default function tester(optionsOrScenario, ...scenarios) {
  const fullPath = module.parent.filename.split('/').slice(0, -1).join('/');
  const defEndpoint = fullPath.split('/').slice(4, -1).join('/');
  let scenariosToUse = scenarios;
  const replacementsPath = getReplacementsFolder(fullPath);
  const defaultOptions = {
    viewHeight: 'auto',
    height: 'auto',
    includeQRs: false,
    prePath: '',
    threshold: 50,
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
      scenario.width, scenario.height, scenario.viewHeight,
      scenario.includeQRs, scenario.endpoint, scenarioOptions,
    ]);
  });

  // eslint-disable-next-line jest/valid-describe
  describe(`${fullPath}`, () => {
    test.each(allTests)(
      'width: %i height: %p, viewHeight: %p, QRs: %p, endpoint: %s',
      async (width, height, viewHeight, includeQRs, endpoint, options) => {
        let errorFlag = false;
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
        // const pageBox = await (await page.$('body'))
        //   .boundingBox();
        // console.log(pageBox)
        // const bb = await (await page.$('#topic__content')).boundingBox();
        // console.log(bb)

        if (viewHeight === 'auto') {
          await page.setViewport({ width, height: 1000 });
          const pageBox = await (await page.$('body'))
            .boundingBox();
          console.log(pageBox)
          const bb = await (await page.$('#topic__content')).boundingBox();
          console.log(bb)
          await page.setViewport({ width, height: Math.floor(pageBox.height) });
        } else {
          await page.setViewport({ width, height: viewHeight });
        }

        // await page.evaluate((y) => {
        //   window.scrollTo(0, y);
        // }, Math.floor(pageBox.y));
        await removeRatings(page);
        await removeTopicVariables(page);

        let clippingBox = await (await page.$(options.element)).boundingBox();
        if (height !== 'auto') {
          clippingBox.height = height;
        }

        let image = await page.screenshot({ clip: clippingBox });
        let fileName = `${options.prefix}${width}-${height}`;
        // expect(image).toMatchImageSnapshot({
        //   failureThreshold: options.threshold,
        //   customSnapshotIdentifier: fileName,
        // });
        try {
          expect(image).toMatchImageSnapshot({
            failureThreshold: options.threshold,
            customSnapshotIdentifier: fileName,
          });
        } catch (error) {
          // eslint-disable-next-line
          console.log(error);
          writeImage(image, `${replacementsPath}/${fileName}-snap.png`);
          errorFlag = true;
        }
        if (includeQRs) {
          // Find all links on page that go to QR popups
          // eslint-disable-next-line no-loop-func
          const qrLinks = await page.$$('.topic__qr_action_word');
          let index = 0;
          // eslint-disable-next-line no-restricted-syntax
          for (const link of qrLinks) {
            await link.click();
            await page.mouse.move(0, 0);
            await page.evaluate(() => {
              window.scrollTo(0, 0);
            });
            await sleep(1000);
            clippingBox = await (await page.$('#id_topic__qr__static_container')).boundingBox();
            if (clippingBox == null) {
              clippingBox = await (await page.$('#id_topic__qr__pres_container')).boundingBox();
            }
            // const linkBox = await link.boundingBox();
            // await page.evaluate((y) => {
            //   window.scrollTo(0, y);
            // }, linkBox.y);
            image = await page.screenshot({ clip: clippingBox });
            fileName = `${options.prefix}${width}-${height}-QR-${index}`;
            // expect(image).toMatchImageSnapshot({
            //   failureThreshold: options.threshold,
            //   customSnapshotIdentifier: fileName,
            // });
            try {
              expect(image).toMatchImageSnapshot({
                failureThreshold: options.threshold,
                customSnapshotIdentifier: fileName,
              });
            } catch (error) {
              // eslint-disable-next-line
              console.log(error);
              writeImage(image, `${replacementsPath}/${fileName}-snap.png`);
              errorFlag = true;
            }
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
        if (errorFlag) {
          expect(true).toBe(false);
        }
      },
    );
  });
}
