// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// $FlowFixMe
import content from './content.md';
// import { multichoice, shuffle } from '../../../../../../js/tools/misc';

const { round, rand, removeRandElem } = Fig.tools.math;

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
      const q1Options = [
        ['a full', 360],
        ['a half', 180],
        ['a third of a', 120],
        ['a quarter', 90],
        ['a fifth of a', 72],
        ['a sixth of a', 60],
        ['an eighth of a', 45],
        ['a ninth of a', 40],
        ['a tenth of a', 36],
        ['a twelfth of a', 30],
      ];
      const q1 = removeRandElem(q1Options);
      // eslint-disable-next-line prefer-destructuring
      variables.q1_portion = q1[0];
      // eslint-disable-next-line prefer-destructuring
      variables.q1_answer = q1[1];

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
