// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;
// const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;

  const side = 1.8;
  const equilHeight = side;
  const equilPoints = [
    new Point(-0.5 * side * Math.sqrt(3), -1 / 3 * equilHeight),
    new Point(0.5 * side * Math.sqrt(3), 2 / 3 * equilHeight),
    new Point(0.5 * side * Math.sqrt(3), -1 / 3 * equilHeight),
  ];

  const root3Aon2 = ({
    elements: {
      _3: { text: '3', color: colors.sides },
      r: { symbol: 'radical', color: colors.sides },
      A: 'A',
    },
    forms: {
      '0': {
        content: [{ root: ['_3', 'r'] }, 'A'],
        scale: 1,
      },
    },
  });

  const root3on2 = ({
    elements: {
      _3: { text: '3', color: colors.sides },
      r: { symbol: 'radical', color: colors.sides },
    },
    forms: {
      '0': {
        content: { root: ['_3', 'r'] },
        scale: 1,
      },
    },
  });

  const lineLabel = (name, text, p1, p2, location = 'below', subLocation = 'left', offset = 0.05) => ({
    name,
    method: 'line',
    options: {
      p1,
      p2,
      label: {
        text,
        offset,
        scale: 1,
        location,
        subLocation,
      },
      showLine: false,
      color: colors.sides,
    },
  });

  const angle = (name, text, p1, p2, p3, radius = 0.25) => ({
    name,
    method: 'angle',
    options: {
      p1,
      p2,
      p3,
      curve: {
        radius,
        width: 0.015,
        sides: 100,
      },
      label: {
        text,
        radius: radius * 0.9,
      },
      color: colors.angles,
      autoRightAngle: true,
    },
  });
  const tri = {
    name: 'tri',
    method: 'collection',
    addElements: [
      lineLabel('1A', '1A', equilPoints[1], equilPoints[2], 'right'),
      lineLabel('2A', '2A', equilPoints[0], equilPoints[1], 'top', 'left', 0.1),
      lineLabel('r3A', root3Aon2, equilPoints[0], equilPoints[2], 'left', 'bottom', 0.15),
      lineLabel('1', '1', equilPoints[1], equilPoints[2], 'right'),
      lineLabel('2', '2', equilPoints[0], equilPoints[1], 'top', 'left', 0.1),
      lineLabel('r3', root3on2, equilPoints[0], equilPoints[2], 'left', 'bottom', 0.15),
      angle('a30', null, equilPoints[2], equilPoints[0], equilPoints[1], 0.5),
      angle('a60', null, equilPoints[0], equilPoints[1], equilPoints[2], 0.3),
      angle('a90', '', equilPoints[1], equilPoints[2], equilPoints[0], 0.4),
      {
        name: 'equil',
        method: 'polyLine',
        options: {
          points: equilPoints,
          width: 0.03,
          color: colors.sides,
          close: true,
        },
      },
    ],
    mods: {
      scenarios: {
        default: { position: [0, -0.6], rotation: 0, scale: 1 },
      },
    },
  };

  layout.addElements = [
    tri,
  ];
  return layout;
}
