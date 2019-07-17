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
      const expText = angleType === 'explementary' ? '+ explementary' : '- explementary';
      const suppText = angleType === 'supplementary' ? '+ supplementary' : '- supplementary';
      const compText = angleType === 'complementary' ? '+ complementary' : '- complementary';
      const otherText = angleType === 'other' ? '+ None of the above' : '- None of the above';
      const answers = shuffle([
        expText, suppText, compText,
      ]);
      answers.push(otherText);
      variables.q1_multichoice = multichoice(answers, 'q1');

      const yes = () => ['+ Yes', '- No'];
      const no = () => ['- Yes', '+ No'];

      const q2Options = [
        ['AOB and BOC supplementary', yes()],
        ['AOB and BOC complementary', no()],
        ['AOB and BOC explementary', no()],
        ['BOC, COD, and DOE supplementary', yes()],
        ['BOC, COD, and DOA supplementary', no()],
        ['BOC, COD, and DOA explementary', yes()],
        ['COD and AOB supplementary', no()],
        ['COD and AOB explementary', no()],
        ['COD and AOB complementary', no()],
        ['COD, DOE, and EOA supplementary', yes()],
        ['COD, DOE, and EOA complementary', no()],
        ['COD, DOE, and EOA explementary', no()],
        ['COD and DOE complementary', yes()],
        ['COD and DOE explementary', no()],
        ['COD and DOE supplementary', no()],
      ];

      const q2Answer = removeRandElement(q2Options);
      // eslint-disable-next-line prefer-destructuring
      variables.q2_angles = q2Answer[0];
      variables.q2_multichoice = multichoice(q2Answer[1], 'q2');

      const q3Answer = removeRandElement(q2Options);
      // eslint-disable-next-line prefer-destructuring
      variables.q3_angles = q3Answer[0];
      variables.q3_multichoice = multichoice(q3Answer[1], 'q3');

      const q4Answer = removeRandElement(q2Options);
      // eslint-disable-next-line prefer-destructuring
      variables.q4_angles = q4Answer[0];
      variables.q4_multichoice = multichoice(q4Answer[1], 'q4');
      return variables;
    };
  }
}

export default Content;
