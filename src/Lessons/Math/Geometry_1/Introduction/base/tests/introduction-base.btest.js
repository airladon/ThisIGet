/* eslint-disable import/no-extraneous-dependencies */
import 'babel-polyfill';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const sitePath = process.env.TIG__ADDRESS || 'http://host.docker.internal:5003';
expect.extend({ toMatchImageSnapshot });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const path = require('path');
// const sprintf = require('sprintf-js').sprintf;
// const defaultDuration = 5;
// const defaultFPS = 60;

// const overwriteTime = function (page, animationFrameDuration) {
//   return page.evaluateOnNewDocument(function (animationFrameDuration) {
//     (function (exports1) {
//       var __virtualTime = (new Date()).getTime();
//       var __startTime = __virtualTime;
//       var __oldDate = Date;
//       // a block is a segment of blocking code, wrapped in a function
//       // to be run at a certain virtual time. They're created by
//       // window.requestAnimationFrame, window.setTimeout, and window.setInterval
//       var __pendingBlocks = [];
//       var __intervals = {};
//       var __idCount = 1;
//       var __sortPendingBlocks = function () {
//         __pendingBlocks = __pendingBlocks.sort(function (a, b) {
//           if (a.time !== b.time) {
//             return a.time - b.time;
//           }
//           return a.id - b.id;
//         });
//       };
//       var __processNextBlock = function () {
//         if (!__pendingBlocks.length) {
//           return null;
//         }
//         __sortPendingBlocks();
//         var block = __pendingBlocks.shift();
//         __virtualTime = block.time;
//         block.fn1.apply(exports1, block.args);
//       };
//       var __processUntilTime = function (ms) {
//         __sortPendingBlocks();
//         while (__pendingBlocks.length && __pendingBlocks[0].time <= __startTime + ms) {
//           __processNextBlock();
//           __sortPendingBlocks();
//         }
//         // TODO: maybe wait a little while for possible promises to resolve?
//         __virtualTime = __startTime + ms;
//       };
//       var __setTimeout = function (fn1, timeout, ...args) {
//         var id = __idCount;
//         if (!timeout || isNaN(timeout)) {
//           // If timeout is 0, there may be an infinite loop
//           // Changing it to 1 shouldn't disrupt code, because
//           // setTimeout doesn't usually execute code immediately
//           timeout = 1;
//         }
//         __pendingBlocks.push({
//           time: timeout + __virtualTime,
//           id: id,
//           fn1: fn1,
//           args: args
//         });
//         __idCount++;
//         return id;
//       };
//       var __clearTimeout = function (id) {
//         // according to https://developer.mozilla.org/en-US-docs/Web/API/WindowOrWorkerGlobalScope/setInterval,
//         // setInterval and setTimeout share
//         // the same pool of IDs, and clearInterval and clearTimeout
//         // can technically be used interchangeably
//         var i = 0;
//         if (__intervals[id]) {
//           __intervals[id].clear();
//         }
//         while (i < __pendingBlocks.length) {
//           if (__pendingBlocks[i].id === id) {
//             __pendingBlocks.splice(i, 1);
//           } else {
//             i++;
//           }
//         }
//       };

//       // overwriting built-in functions...
//       exports1.Date = class Date extends __oldDate {
//         constructor() {
//           if (!arguments.length) {
//             super(__virtualTime);
//           } else {
//             super(...arguments);
//           }
//         }
//       };
//       exports1.Date.now = exports1.performance.now = function () {
//         return __virtualTime;
//       };
//       exports1.setTimeout = __setTimeout;
//       exports1.requestAnimationFrame = function (fn1) {
//         return __setTimeout(fn1, animationFrameDuration);
//       };
//       exports1.setInterval = function (fn1, interval, ...args) {
//         var lastCallId;
//         var id = __idCount;
//         var running = true;
//         var intervalfn1 = function () {
//           fn1.apply(exports1, args);
//           if (running) {
//             lastCallId = __setTimeout(intervalfn1, interval);
//           }
//         };
//         __intervals[id] = {
//           clear: function () {
//             __clearTimeout(lastCallId);
//             running = false;
//           }
//         };
//         __idCount++;
//         lastCallId = __setTimeout(intervalfn1, interval);
//         // according to https://developer.mozilla.org/en-US-docs/Web/API/WindowOrWorkerGlobalScope/setInterval,
//         // setInterval and setTimeout share
//         // the same pool of IDs, and clearInterval and clearTimeout
//         // can technically be used interchangeably
//         return id;
//       };
//       exports1.cancelAnimationFrame = __clearTimeout;
//       exports1.clearTimeout = __clearTimeout;
//       exports1.clearInterval = __clearTimeout;
//       // exported custom functions
//       exports1.__processNextBlock = __processNextBlock;
//       exports1.__processUntilTime  = __processUntilTime;
//     })(this);
//   }, animationFrameDuration);
// };
// const promiseLoop = function (condition, body) {
//   var loop = function () {
//     if (condition()) {
//       return body().then(loop);
//     }
//   };
//   return Promise.resolve().then(loop);
// };

// const getBrowserFrames = function (frame) {
//   return [frame].concat(...frame.childFrames().map(getBrowserFrames));
// };

// const goToTime = function (browserFrames, time) {
//   // Goes to a certain time. Can't go backwards
//   return Promise.all(browserFrames.map(function (frame) {
//     return frame.evaluate(function (ms) {
//       window.__processUntilTime(ms);
//     }, time);
//   }));
// };

// const getSelectorDimensions = function (page, selector) {
//   return page.evaluate(function (selector) {
//     var el = document.querySelector(selector);
//     var dim = el.getBoundingClientRect();
//     if (el) {
//       return {
//         left: dim.left,
//         top: dim.top,
//         right: dim.right,
//         bottom: dim.bottom,
//         scrollX: window.scrollX,
//         scrollY: window.scrollY,
//         x: dim.x,
//         y: dim.y,
//         width: dim.width,
//         height: dim.height
//       };
//     }
//   }, selector);
// };
// const overwriteTime = () => {};

describe('Introduction Base Lesson', () => {
  test('Page 1', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=1`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    const image = await page.screenshot({ path: 'introduction.png' });
    expect(image).toMatchImageSnapshot();
  });
  test('Page 9 - drawing', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=9`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await sleep(1000);

    const image = await page.screenshot({ path: 'page8.png' });
    expect(image).toMatchImageSnapshot();
  });

  test('Page 12 - textures', async () => {
    const anglesPath =
      `${sitePath}/Lessons/Math/Geometry_1/Introduction/base/explanation?page=12`;
    await page.goto(anglesPath);
    await page.setViewport({ width: 600, height: 800 });

    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await sleep(1000);
    const image = await page.screenshot({ path: 'page12.png' });
    expect(image).toMatchImageSnapshot();
  });
});
