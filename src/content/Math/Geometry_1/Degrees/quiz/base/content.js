// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleFormatContent from '../../../../../../js/TopicFormat/SimpleFormatContent';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// $FlowFixMe
import content from './content.md';
import { multichoice, shuffle } from '../../../../../../js/tools/misc';

const { round, rand, removeRandElement } = Fig.tools.math;

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
      variables.q1_answer = q1[1];

      variables.q2_a1 = round(rand(1, 120), 0);
      variables.q2_a2 = round(rand(1, 120), 0);
      variables.q2_answer = round(variables.q2_a1 + variables.q2_a2, 0);


      const q3Options = [
        [360, 'full'],
        [180, 'half'],
        [120, 'third'],
        [90, 'quarter'],
        [72, 'fifth'],
        [60, 'sixth'],
        [45, 'eighth'],
        [40, 'nineth'],
        [36, 'tenth'],
        [30, 'twelfth'],
      ];
      const choice = removeRandElement(q3Options);
      // eslint-disable-next-line prefer-destructuring
      variables.q3_angle = choice[0];
      const correct = `+ ${choice[1]}`;
      const wrong = q3Options.map(a => `- ${a[1]}`);
      const answers = shuffle(correct, wrong, 4);
      variables.q3Multichoice = multichoice(answers, 'q3');

      return variables;
    };
  }
}

export default Content;
