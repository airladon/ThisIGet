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
  randElement,
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
      const possibleSides = [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
      ];

      const possibleRegularSides = [
        3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45,
      ];

      const q1 = (qnum: number) => {
        const q1Sides = removeRandElement(possibleSides);
        const q1Angle = (q1Sides - 2) * 180;
        variables[`q${qnum}q`] = `What is the sum of the internal angles in degrees of a ${q1Sides.toFixed(0)} sided shape?`;
        variables[`q${qnum}a`] = q1Angle.toFixed(0);
      };

      const q2 = (qnum: number) => {
        const q2Sides = removeRandElement(possibleSides);
        const q2Angle = (q2Sides - 2) * 180;
        variables[`q${qnum}a`] = q2Sides.toFixed(0);
        variables[`q${qnum}q`] = `What is the number of sides of a shape with an internal angle sum of ${q2Angle.toFixed(0)}º?`;
      };

      const q3 = (qnum: number) => {
        const q3Sides = removeRandElement(possibleRegularSides);
        const q3Angle = 180 - 360 / q3Sides;
        variables[`q${qnum}q`] = `What is the measure of each angle of a ${q3Sides.toFixed(0)} sided regular polygon?`;
        variables[`q${qnum}a`] = q3Angle.toFixed(0);
      };

      const q4 = (qnum: number) => {
        const q4Sides = removeRandElement(possibleRegularSides);
        const q4Angle = 180 - 360 / q4Sides;
        variables[`q${qnum}a`] = q4Sides.toFixed(0);
        variables[`q${qnum}q`] = `A regular polygon's corner has an internal angle of ${q4Angle.toFixed(0)}. What number of sides does the polygon have?`;
      }

      const questions = [1, 2, 3, 4];
      q1(removeRandElement(questions));
      q2(removeRandElement(questions));
      q3(removeRandElement(questions));
      q4(removeRandElement(questions));

      // //; q1
      // const q1Sides = removeRandElement(possibleSides);
      // const q1Angle = (q1Sides - 2) * 180;
      // variables.q1q = q1Sides.toFixed(0);
      // variables.q1a = q1Angle.toFixed(0);


      // // q2
      // const q2Sides = removeRandElement(possibleSides);
      // const q2Angle = (q2Sides - 2) * 180;
      // variables.q2a = q2Sides.toFixed(0);
      // variables.q2q = q2Angle.toFixed(0);

      // // q3
      // const q3Sides = removeRandElement(possibleRegularSides);
      // const q3Angle = 180 - 360 / q3Sides;
      // variables.q3q = q3Sides.toFixed(0);
      // variables.q3a = q3Angle.toFixed(0);

      // // q4
      // const q4Sides = removeRandElement(possibleRegularSides);
      // const q4Angle = 180 - 360 / q4Sides;
      // variables.q4a = q4Sides.toFixed(0);
      // variables.q4q = q4Angle.toFixed(0);
      // variables.q4D = round(rand(1, 20), 1);
      // const answers = shuffle(
      //   `+ ${round(variables.q4D * Math.PI, 2)}`,
      //   [
      //     `- ${round(variables.q4D * 2, 2)}`,
      //     `- ${round(variables.q4D / 2, 2)}`,
      //     `- ${round(variables.q4D * Math.PI - rand(0.5, 1), 2)}`,
      //     `- ${round(variables.q4D * Math.PI + rand(0.5, 2), 2)}`,
      //   ],
      //   4,
      // );
      // variables.q4m = multichoice(answers, 'q4');

      return variables;
    };
  }
}

export default Content;
