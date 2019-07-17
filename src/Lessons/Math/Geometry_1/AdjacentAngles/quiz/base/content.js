// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// $FlowFixMe
import content from './content.md';
import {
  multichoice,
  shuffle,
} from '../../../../../../js/tools/misc';

const {
  round,
  // rand,
  randElement,
  randInt,
  removeRandElement,
} = Fig.tools.math;

class Content extends SimpleLessonContent {
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
      const options = [
        'complementary', 'explementary', 'supplementary',
        'other', 'other',
      ];

      const angleType = randElement(options);
      const numAngles = randInt(2, 4);
      let totalAngle = 90;
      if (angleType === 'explementary') {
        totalAngle = 360;
      } else if (angleType === 'supplementary') {
        totalAngle = 180;
      } else if (angleType === 'other') {
        while (totalAngle === 90 || totalAngle === 180 || totalAngle === 360) {
          totalAngle = randInt(10, 350);
        }
      }
      const angles = [];
      while (angles.length < numAngles - 1) {
        const sum = angles.reduce((a, b) => a + b, 0);
        angles.push(randInt(1, round((totalAngle - sum) * 0.8, 0)));
      }
      angles.push(totalAngle - angles.reduce((a, b) => a + b, 0));

      const anglesText = `${angles.slice(0, -1).join('º, ')}º and ${angles.slice(-1)[0]}º`;

      variables.q1_angles = anglesText;
      variables.q1_angle_num = numAngles;
      const expText = angleType === 'explementary' ? '+ explementary' : '- Explementary';
      const suppText = angleType === 'supplementary' ? '+ supplementary' : '- Supplementary';
      const compText = angleType === 'complementary' ? '+ complementary' : '- Complementary';
      const otherText = angleType === 'other' ? '+ None of the above' : '- None of the above';
      const answers = shuffle([
        expText, suppText, compText,
      ]);
      answers.push(otherText);
      variables.q1_multichoice = multichoice(answers, 'q1');

      const yes = () => ['+ Yes', '- No'];
      const no = () => ['- Yes', '+ No'];

      const q2Options = [
        ['a and b supplementary', yes()],
        ['a and b complementary', no()],
        ['a and b explementary', no()],
        ['b, c, and d supplementary', yes()],
        ['b, c, and d complementary', no()],
        ['d, e and f supplementary', no()],
        ['c, d and e explementary', no()],
        ['a, b and c complementary', no()],
        ['c and d complementary', yes()],
        ['e and f complementary', yes()],
        ['d and e complementary', no()],
        ['e, f, and a supplementary', yes()],
        ['e, f, and a explementary', no()],
        ['a, b, c, d, e and f explementary', yes()],
      ];

      const q2Answer = removeRandElement(q2Options);
      // eslint-disable-next-line prefer-destructuring
      variables.q2_angles = q2Answer[0];
      variables.q2_multichoice = multichoice(q2Answer[1], 'q2');

      const q3Answer = removeRandElement(q2Options);
      // eslint-disable-next-line prefer-destructuring
      variables.q3_angles = q3Answer[0];
      variables.q3_multichoice = multichoice(q3Answer[1], 'q3');

      variables.q4_A = randInt(1, 80);
      variables.q4_B = randInt((90 - variables.q4_A) * 0.8);
      variables.q4_C = 90 - variables.q4_A - variables.q4_B;

      variables.q5_A = randInt(1, 140);
      variables.q5_B = randInt((180 - variables.q5_A) * 0.8);
      variables.q5_C = 180 - variables.q5_A - variables.q5_B;

      variables.q6_A = randInt(1, 300);
      variables.q6_B = randInt((360 - variables.q6_A) * 0.8);
      variables.q6_C = 360 - variables.q6_A - variables.q6_B;

      variables.q7_A = randInt(50, 70);
      variables.q7_B = randInt(80, 110);
      variables.q7_C = 180 - variables.q7_A - variables.q7_B;

      variables.q8_A = randInt(20, 40);
      variables.q8_B = randInt(20, 40);
      variables.q8_C = 90 - variables.q8_A - variables.q8_B;

      variables.q9_a = randInt(120, 95);
      variables.q9_b = variables.q9_a;
      return variables;
    };
  }
}

export default Content;
