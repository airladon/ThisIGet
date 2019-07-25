// @flow
// import Fig from 'figureone';
import * as React from 'react';
import SimpleLessonContent from '../../../../../../js/Lesson/SimpleLessonContent';
// import imgLink from '../../tile.png';
// import imgLinkGrey from '../../tile-grey.png';
import details from '../../details';
// $FlowFixMe
import content from './content.md';
// import {
//   multichoice,
//   shuffle,
// } from '../../../../../../js/tools/misc';

// const {
//   round,
//   rand,
//   randElement,
//   removeRandElement,
// } = Fig.tools.math;

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
