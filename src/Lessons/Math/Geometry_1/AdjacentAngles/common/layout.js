// @flow
import Fig from 'figureone';
import baseLayout from '../../../../LessonsCommon/layout';

const { Point } = Fig;
const cssColorNames = [
  'latin',
  'angleA',
  'angleB',
  'angleC',
  'line',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function commonLessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  // layout.position = new Point(0, -0.6);
  layout.equationPosition = new Point(-0.2, 0.85);
  layout.equationScale = 1;
  layout.units = {
    position: new Point(2, -1.6),
  };
  layout.lines = {
    position: new Point(0, -0.6),
    rotation: 0,
  };
  layout.line = {
    width: 0.03,
    length: 1.25,
  };
  layout.angle = {
    radius: 0.3,
    labelRadiusOffset: 0.07,
    width: 0.03,
    sides: 300,
  };
  layout.largerAngle = {
    radius: 1.0,
    labelRadiusOffset: 0.05,
    width: 0.015,
    sides: 400,
  };
  layout.line1 = {
    adjacent: {
      rotation: 0,
    },
    adjacentAdd: {
      rotation: 0,
    },
    supplementary: {
      rotation: 0,
    },
    complementary: {
      rotation: 0,
    },
    explementary: {
      rotation: 0,
    },
  };
  layout.line2 = {
    adjacent: {
      rotation: 1,
    },
    adjacentAdd: {
      rotation: 1,
    },
    supplementary: {
      rotation: 1,
    },
    complementary: {
      rotation: Math.PI / 6,
    },
    explementary: {
      rotation: 2,
    },
  };
  layout.line3 = {
    adjacent: {
      rotation: 2,
    },
    adjacentAdd: {
      rotation: 2.5,
    },
    supplementary: {
      rotation: Math.PI,
    },
    complementary: {
      rotation: Math.PI / 2,
    },
    explementary: {
      rotation: Math.PI * 2 * 0.9999,
    },
  };
  return layout;
}
