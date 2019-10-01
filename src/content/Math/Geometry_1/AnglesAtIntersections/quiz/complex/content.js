// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleFormatContent from '../../../../../../js/TopicFormat/SimpleFormatContent';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// $FlowFixMe
import content from './content.md';
// import {
//   multichoice,
//   shuffle,
// } from '../../../../../../js/tools/misc';

const {
//   round,
//   rand,
//   randElement,
  removeRandElement,
  randInt,
} = Fig.tools.math;

class Content extends SimpleFormatContent {
  setTitle() {
    this.title = details.title;
    // this.iconLink = imgLink;
    // this.iconLinkGrey = imgLinkGrey;
    this.loadQRs([
      // 'Math/Geometry_1/Triangles/base',
    ]);
  }

  setContent() {
    this.sections = [
      <div key={0}>
      <div className="markdown" dangerouslySetInnerHTML={ { __html: content } }/>
      </div>,
    ];

    this.setVariables = () => {
      const variables = {};

      const answer = (a2, a1) => {
        const small = randInt(45, 75);
        const large = 180 - small;
        let a1Value = small;
        if (a1 === 'b' || a1 === 'f' || a1 === 'd') {
          a1Value = large;
        }
        let a2Value = small;
        if (a2 === 'b' || a2 === 'f' || a2 === 'd') {
          a2Value = large;
        }
        return [`${a2} when ${a1} = ${a1Value}º`, a2Value];
      };
      const q1Options = [
        answer('c', 'a'),
        answer('e', 'a'),
        answer('g', 'a'),
        answer('d', 'a'),
        answer('f', 'a'),
        answer('c', 'b'),
        answer('e', 'b'),
        answer('g', 'b'),
        answer('d', 'b'),
        answer('f', 'b'),
        answer('e', 'b'),
        answer('e', 'a'),
        answer('e', 'c'),
        answer('e', 'g'),
        answer('g', 'a'),
        answer('g', 'c'),
        answer('g', 'e'),
        answer('d', 'g'),
        answer('d', 'a'),
        answer('f', 'g'),
        answer('f', 'a'),
        answer('f', 'b'),
        answer('d', 'b'),
      ];
      const [q1, a1] = removeRandElement(q1Options);
      variables.q1_question = q1;
      variables.q1_answer = a1;

      const [q2, a2] = removeRandElement(q1Options);
      variables.q2_question = q2;
      variables.q2_answer = a2;

      const calcB = () => randInt(15, 35);
      const calcC = () => randInt(95, 115);
      const calcD = () => randInt(40, 55);
      const calcM = () => randInt(70, 85);
      const calcK = () => randInt(35, 50);
      const calcA = calcD;
      const calcF = calcM;

      const triangleOptions = [
        () => {
          // 'a from b, c'
          const [b, c] = [calcB(), calcC()];
          const a = 180 - b - c;
          return [`a when b = ${b}º and c = ${c}º`, a];
        },
        () => {
          // 'a from d',
          const d = calcD();
          const a = d;
          return [`a when d = ${d}º`, a];
        },
        () => {
          // 'a from b, m',
          const [b, m] = [calcB(), calcM()];
          const a = 180 - b - (180 - m);
          return [`a when b = ${b}º and m = ${m}º`, a];
        },
        () => {
          // 'a from b, f',
          const [b, f] = [calcB(), calcF()];
          const a = 180 - b - (180 - f);
          return [`a when b = ${b}º and f = ${f}º`, a];
        },
        () => {
          // 'c from b, a',
          const [b, a] = [calcB(), calcA()];
          const c = 180 - b - a;
          return [`c when a = ${a}º and b = ${b}º`, c];
        },
        () => {
          // 'm from b, a',
          const [b, a] = [calcB(), calcA()];
          const m = 180 - (180 - (b + a));
          return [`m when a = ${a}º and b = ${b}º`, m];
        },
        () => {
          // 'g from a, b, k',
          const [b, a, k] = [calcB(), calcA(), calcK()];
          const m = 180 - (180 - (b + a));
          const g = 180 - m - k;
          return [`g when a = ${a}º, b = ${b}º and k=${k}º`, g];
        },
        () => {
          // 'g from m, k',
          const [m, k] = [calcM(), calcK()];
          const g = 180 - m - k;
          return [`g when m = ${m}º and k=${k}º`, g];
        },
        () => {
          // 'g from c, k',
          const [c, k] = [calcC(), calcK()];
          const m = 180 - c;
          const g = 180 - m - k;
          return [`g when c = ${c}º and k=${k}º`, g];
        },
        () => {
          // 'g from h, k',
          const [h, k] = [calcC(), calcK()];
          const m = 180 - h;
          const g = 180 - m - k;
          return [`g when h = ${h}º and k=${k}º`, g];
        },
      ];

      const [q3, a3] = removeRandElement(triangleOptions)();
      variables.q3_question = q3;
      variables.q3_answer = a3;

      const [q4, a4] = removeRandElement(triangleOptions)();
      variables.q4_question = q4;
      variables.q4_answer = a4;
      return variables;
    };
  }
}

export default Content;
