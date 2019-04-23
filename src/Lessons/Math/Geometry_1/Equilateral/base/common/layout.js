// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'highlight',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  const points = [
    new Point(-1, -1).add(0, 1 - Math.tan(Math.PI / 6)),
    new Point(0, 0.732050).add(0, 1 - Math.tan(Math.PI / 6)),
    new Point(1, -1).add(0, 1 - Math.tan(Math.PI / 6)),
  ];
  layout.position = [0, -0.2];
  const width = 0.02;
  const triangle = {
    name: 'triangle',
    method: 'polyLine',
    options: {
      width,
      color: colors.sides,
      close: true,
      points,
      side: {
        label: { text: 'A', offset: 0.1, location: 'outside' },
      },
      angle: {
        color: colors.angles,
        label: { text: 'a', radius: 0.29 },
        curve: { radius: 0.3, sides: 100, width },
      },
    },
  };
  const angle = {
    name: 'angle',
    method: 'polyLine',
    options: {
      points,
      close: false,
      color: colors.highlight,
      width: width * 2,
    },
  };
  layout.addElements = [
    triangle,
    angle,
  ];
  return layout;
}
