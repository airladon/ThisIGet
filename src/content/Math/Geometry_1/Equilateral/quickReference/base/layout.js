// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'qrEquilateral_sides',
  'qrEquilateral_angles',
  'highlight',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout(cssColorNames);
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
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
      color: colors.qrEquilateral_sides,
      close: true,
      points,
      side: {
        label: { text: 'A', offset: 0.1, location: 'outside' },
      },
      angle: {
        color: colors.qrEquilateral_angles,
        label: { text: 'a', radius: 0.29 },
        curve: { radius: 0.3, sides: 100, width },
      },
    },
    mods: {
      scenarios: {
        summary: { position: [0, -0.3] },
      },
    },
  };
  layout.addElements = [
    triangle,
  ];
  return layout;
}
