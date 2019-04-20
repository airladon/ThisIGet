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
  'sides', 'angles', 'disabled',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const width = 0.02;
  const points = [
    [-1, -1],
    [0, 1],
    [1, -1],
  ];
  const midPoint = [0, -1];
  const angle = text => ({
    curve: {
      radius: 0.3,
      width,
      sides: 200,
    },
    autoRightAngle: false,
    color: colors.angles,
    label: {
      text,
    },
  });
  const side = text => ({
    label: { text, offset: 0.1, location: 'outside' },
  });
  layout.left = {
    name: 'left',
    method: 'polyLine',
    options: {
      width,
      points: [points[0], points[1], midPoint],
      close: true,
      angle: [angle('a'), angle('b'), angle('c')],
      side: [side('A'), side('h'), side('B')],
      color: colors.sides,
    },
    mods: {
      scenarios: {
        combined: { position: [0, 0], scale: 1 },
        separate: { position: [-0.5, 0], scale: 1 },
      },
    },
  };
  layout.right = {
    name: 'right',
    method: 'polyLine',
    options: {
      width,
      points: [points[2], midPoint, points[1]],
      close: true,
      angle: [angle('a'), angle('c'), angle('b')],
      side: [side('B'), side('h'), side('A')],
      color: colors.sides,
    },
    mods: {
      scenarios: {
        combined: { position: [0, 0], scale: 1 },
        separate: { position: [0.5, 0], scale: 1 },
      },
    },
  };
  layout.triangle = {
    name: 'triangle',
    method: 'polyLine',
    options: {
      width,
      points,
      close: true,
      angle: [angle('a'), angle(''), angle('a')],
      side: [side('A'), side('A'), side('2B')],
      color: colors.sides,
    },
    mods: {
      scenarios: {
        center: { position: [0, 0], scale: 1 },
      },
    },
  };
  layout.split = {
    name: 'split',
    method: 'line',
    options: {
      width,
      vertexSpaceStart: 'start',
      position: midPoint,
      length: points[1][1] - midPoint[1],
      angle: Math.PI / 2,
      label: {
        text: 'h',
        offset: 0.1,
      },
      // angle: [angle('a'), angle(''), angle('a')],
      // side: [side('C'), side('C'), side('2B')],
      color: colors.sides,
    },
    mods: {
      scenarios: {
        center: { position: [0, 0], scale: 1 },
      },
    },
  };
  layout.addElements = [
    layout.left,
    layout.right,
    layout.triangle,
    layout.split,
  ];
  return layout;
}
