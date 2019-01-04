// @flow
import Fig from 'figureone';
import baseLayout from '../../../../LessonsCommon/layout';

const { Point } = Fig;
const cssColorNames = [
  'lines',
  'angles',
  'construction',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function commonLessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  layout.position = new Point(0, 0);
  layout.lineWidth = 0.02;
  layout.angleRadius = 0.4;
  layout.angleLabelRadiusOffset = 0.03;
  layout.angleSides = 200;
  layout.rectEqnPosition = new Point(0, 0.8);
  layout.adEqnPosition = new Point(0, 0.8);
  layout.bcEqnPosition = new Point(0, 0.8);
  layout.quads = {
    quad1: {
      points: [
        new Point(-0.5, -0.4),
        new Point(-0.2, 0.7),
        new Point(0.6, 0.1),
        new Point(0.3, -0.6),
      ],
      position: new Point(-1.6, -0.2),
    },
    quad2: {
      points: [
        new Point(0.2, -0.6),
        new Point(0.6, 0.7),
        new Point(0.1, 0.1),
        new Point(-0.6, 0.4),
      ],
      position: new Point(0, -0.2),
    },
    quad3: {
      points: [
        new Point(-0.7, 0),
        new Point(0, -0.7),
        new Point(0.7, 0),
        new Point(0, 0.7),
      ],
      position: new Point(1.6, -0.2),
    },
  };

  layout.rect = {
    points: [
      new Point(-1.5, 0.75),
      new Point(-1.5, -0.75),
      new Point(1.5, -0.75),
      new Point(1.5, 0.75),
    ],
    scenarios: {
      start: { position: new Point( 0, -0.2) },
      analysis: { position: new Point( 0, -0.8) },
    },
  };

  layout.square = {
    points: [
      new Point(-0.75, 0.75),
      new Point(-0.75, -0.75),
      new Point(0.75, -0.75),
      new Point(0.75, 0.75),
    ],
    scenarios: {
      start: { position: new Point( 0, -0.2) },
    },
  };
  return layout;
}
