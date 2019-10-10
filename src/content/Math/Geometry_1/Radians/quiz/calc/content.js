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
  round,
  rand,
  removeRandElement,
  randElement,
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
      const units = ['radians', 'degrees'];
      const q1Options = [
        ['a', 360],
        ['a half', 180],
        ['a third of a', 120],
        ['a quarter or a', 90],
        ['a fifth of a', 72],
        ['a sixth of a', 60],
        ['an eighth of a', 45],
        ['a ninth of a', 40],
        ['a tenth of a', 36],
        ['a twelfth of a', 30],
      ];
      const q1 = removeRandElement(q1Options);
      // eslint-disable-next-line prefer-destructuring
      variables.q1_portion = q1[0];
      // eslint-disable-next-line prefer-destructuring
      variables.q1_answer = round(q1[1] * Math.PI / 180, 2);

      const q2Options = units.slice();
      variables.q2_wanted_units = removeRandElement(q2Options);
      // eslint-disable-next-line prefer-destructuring
      variables.q2_given_units = q2Options[0];

      if (variables.q2_given_units === 'degrees') {
        variables.q2_value = round(rand(0, 360), 0);
        variables.q2_answer = round(variables.q2_value * Math.PI / 180, 2);
      } else {
        variables.q2_value = round(rand(0, Math.PI * 2), 2);
        variables.q2_answer = round(variables.q2_value / Math.PI * 180, 2);
      }

      variables.q3_radius = round(rand(0.5, 5), 1);
      variables.q3_arc = round(variables.q3_radius * rand(0.1, Math.PI * 1.9), 1);
      variables.q3_units = randElement(units);
      let q3Angle = variables.q3_arc / variables.q3_radius;
      if (variables.q3_units === 'degrees') {
        q3Angle = q3Angle * 180 / Math.PI;
      }
      variables.q3_answer = round(q3Angle, 2);


      const q4Units = randElement(units);
      variables.q4_radius = round(rand(0.5, 10), 1);
      let q4Angle = round(rand(0.1, Math.PI * 1.9), 1);
      if (q4Units === 'degrees') {
        q4Angle = round(q4Angle * 180 / Math.PI, 0);
        variables.q4_answer = round(q4Angle * Math.PI / 180 * variables.q4_radius, 2);
        variables.q4_angle = `${q4Angle}º`;
      } else {
        variables.q4_angle = `${q4Angle} radians`;
        variables.q4_answer = round(q4Angle * variables.q4_radius, 2);
      }

      return variables;
    };
  }
}

export default Content;
