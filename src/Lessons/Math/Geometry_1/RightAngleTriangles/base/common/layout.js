// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'rightAngle',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const leftSide = 3;
  const p0 = new Point(-2, -1);
  const p1 = new Point(-2, -1)
    .add(leftSide * Math.cos(Math.PI / 6), leftSide * Math.sin(Math.PI / 6));
  const height = p1.y - p0.y;
  const p2 = new Point(
    p1.x + height / Math.tan(Math.PI / 3),
    p0.y,
  );
  const triPoints = [p0, p1, p2];

  const angle = (color = colors.angles, radius = 0.3) => ({
    curve: {
      radius,
      sides: 100,
    },
    autoRightAngle: true,
    color,
  });

  const tri = name => ({
    name,
    method: 'polyLine',
    options: {
      color: colors.sides,
      close: true,
      width: 0.03,
      points: triPoints,
      side: [
        { label: { text: 'A', location: 'outside', offset: 0.05 } },
        { label: { text: 'B', location: 'outside', offset: 0.05 } },
        { label: { text: 'C', location: 'outside', offset: 0.05 } },
      ],
      angle: [
        angle(colors.angles, 0.4),
        angle(colors.rightAngle, 0.4),
        angle(),
      ],
    },
    mods: {
      scenarios: {
        default: { position: [0, 0], rotation: 0, scale: 1 },
        bDown: { position: [0, 0], rotation: Math.PI / 6 * 5, scale: 1 },
      },
    },
  });

  const heightLine = {
    name: 'height',
    method: 'collection',
    addElements: [
      {
        name: 'angle',
        method: 'angle',
        options: {
          color: colors.sides,
          autoRightAngle: true,
          curve: {
            radius: 0.2,
          },
          position: [p1.x, p0.y],
          rotation: 0,
          angle: Math.PI / 2,
        },
      },
      {
        name: 'line',
        method: 'line',
        options: {
          color: colors.sides,
          position: [p1.x, p0.y],
          angle: Math.PI / 2,
          vertexSpaceStart: 'start',
          width: 0.01,
          dashStyle: {
            style: [0.05],
          },
          length: height,
          label: {
            text: 'height',
            orientation: 'horizontal',
            location: 'left',
            offset: 0.06,
          },
        },
      },
    ],
  };

  const base = {
    name: 'base',
    method: 'line',
    options: {
      color: colors.sides,
      p1: p0,
      p2,
      width: 0.01,
      label: {
        text: 'base',
        location: 'bottom',
        offset: 0.06,
      },
    },
  };

  const baseA = {
    name: 'baseA',
    method: 'line',
    options: {
      color: colors.sides,
      p1: p0,
      p2: p1,
      width: 0.01,
      label: {
        text: 'base',
        location: 'outside',
        offset: 0.06,
      },
    },
  };

  const heightB = {
    name: 'heightB',
    method: 'line',
    options: {
      color: colors.sides,
      p1,
      p2,
      width: 0.01,
      label: {
        text: 'height',
        location: 'outside',
        offset: 0.06,
      },
    },
  };

  const mainTri = {
    name: 'main',
    method: 'collection',
    addElements: [
      tri('tri'),
      heightLine,
      heightB,
      base,
      baseA,
    ],
    mods: {
      scenarios: {
        default: { position: [0, 0], rotation: 0, scale: 1 },
        aDown: { position: [0, 0], rotation: Math.PI / 6 * 5, scale: 1 },
      },
    },
  };

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      mainTri,
    ],
    mods: {
      scenarios: {
        default: { position: [0, 0], scale: 1 },
      },
    },
  };

  layout.addElements = [
    fig,
  ];
  return layout;
}
