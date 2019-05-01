// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  // Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;


  const angle = text => ({
    color: colors.angles,
    label: {
      text,
      radius: 0.4,
    },
    curve: {
      radius: 0.4,
      width: 0.02,
      sides: 200,
    },
  });

  const points = [[-2, -1], [0.7, 1], [1.5, -1]];
  const tri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      points,
      width: 0.03,
      color: colors.sides,
      close: true,
      angle: [
        angle('a'),
        angle('b'),
        angle('c'),
      ],
    },
  };

  const line = {
    name: 'line',
    method: 'line',
    options: {
      vertextSpaceStart: 'start',
      position: points[2],
      length: 1,
      dashStyle: {
        style: [0.05, 0.02],
      },
      width: 0.03,
      color: colors.sides,
    },
  };

  const externalAngle = {
    name: 'externalAngle',
    method: 'angle',
    options: {
      label: {
        text: 'e',
        radius: 0.4,
      },
      curve: {
        radius: 0.4,
        width: 0.02,
        sides: 200,
      },
      position: points[2],
      p1: [points[2][0] + 1, points[2][1]],
      p2: points[2],
      p3: points[1],
    },
  };

  layout.addElements = [
    externalAngle,
    tri,
    line,
  ];
  return layout;
}
