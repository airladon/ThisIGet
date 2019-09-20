// @flow
import Fig from 'figureone';
import * as React from 'react';
import SimpleFormatContent from '../../../../../../js/Lesson/SimpleFormatContent';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// $FlowFixMe
import content from './content.md';
import { multichoice, shuffle } from '../../../../../../js/tools/misc';

const { round, rand } = Fig.tools.math;

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
      variables.q1C = round(rand(1, 20), 1);
      variables.q1R = round(variables.q1C / 2 / Math.PI, 2);

      variables.q2R = round(rand(0.1, 20), 1);
      variables.q2C = round(variables.q2R * Math.PI * 2, 2);

      variables.q3C = round(rand(1, 20), 1);
      variables.q3D = round(variables.q3C / Math.PI, 2);

      variables.q5D = round(rand(1, 20), 1);
      variables.q5R = round(variables.q4D / 2, 2);

      variables.q4D = round(rand(1, 20), 1);
      const answers = shuffle(
        `+ ${round(variables.q4D * Math.PI, 2)}`,
        [
          `- ${round(variables.q4D * 2, 2)}`,
          `- ${round(variables.q4D / 2, 2)}`,
          `- ${round(variables.q4D * Math.PI / 2, 2)}`,
          `- ${round(variables.q4D * Math.PI + 0.1, 2)}`,
          `- ${round(variables.q4D * Math.PI - rand(0.5, 1), 2)}`,
          `- ${round(variables.q4D * Math.PI + rand(0.5, 2), 2)}`,
        ],
        4,
      );
      variables.q4m = multichoice(answers, 'q4');

      return variables;
    };
  }
}

export default Content;
