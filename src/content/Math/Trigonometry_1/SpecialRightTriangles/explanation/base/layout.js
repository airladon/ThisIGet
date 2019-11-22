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
  colors.dim = colors.get('grey', 'dark').rgb;

  const side = 2.5;
  const equilHeight = side * Math.sqrt(3) * 0.5;
  const equilPoints = [
    new Point(-0.5 * side, -1 / 3 * equilHeight),
    new Point(0, 2 / 3 * equilHeight),
    new Point(0.5 * side, -1 / 3 * equilHeight),
  ];
  const midPoint = new Point(0, equilPoints[0].y);

  const Aon2 = ({
    elements: {
      A: { text: 'A', color: colors.sides },
      _2: { text: '2', color: colors.sides },
      v: { symbol: 'vinculum', color: colors.sides },
    },
    forms: {
      '0': { frac: ['A', '_2', 'v'] },
    },
  });

  const root3A = ({
    elements: {
      A: { text: 'A', color: colors.sides },
      _3: { text: '3', color: colors.sides },
      r: { symbol: 'radical', color: colors.sides },
    },
    forms: {
      '0': [{ root: ['_3', 'r'] }, 'A'],
    },
  });

  const root3Aon2 = ({
    elements: {
      A: { text: 'A', color: colors.sides },
      _3: { text: '3', color: colors.sides },
      _2: { text: '2', color: colors.sides },
      v: { symbol: 'vinculum', color: colors.sides },
      r: { symbol: 'radical', color: colors.sides },
    },
    forms: {
      '0': { frac: [[{ root: ['_3', 'r'] }, 'A'], '2', 'v' ]},
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
        scale: 1.2,
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
  const equil = {
    name: 'equil',
    method: 'collection',
    addElements: [
      lineLabel('Aon2Left', Aon2, midPoint, equilPoints[0], 'bottom', 'right'),
      lineLabel('Aon2', Aon2, equilPoints[2], midPoint, 'bottom'),
      lineLabel('H', 'H', midPoint, equilPoints[1], 'left', 'bottom'),
      lineLabel('r3', root3A, midPoint, equilPoints[1], 'left', 'bottom', 0.15),
      lineLabel('A', 'A', equilPoints[1], equilPoints[2], 'right', 'top'),
      lineLabel('ALeft', 'A', equilPoints[0], equilPoints[1], 'left', 'top'),
      lineLabel('ABottom', 'A', equilPoints[0], equilPoints[2], 'left', 'bottom'),
      angle('a30', null, midPoint, equilPoints[1], equilPoints[2], 0.5),
      angle('a30Left', null, equilPoints[0], equilPoints[1], midPoint, 0.5),
      angle('a60', null, equilPoints[1], equilPoints[2], equilPoints[0]),
      angle('a60Left', null, equilPoints[2], equilPoints[0], equilPoints[1]),
      angle('a60Top', null, equilPoints[0], equilPoints[1], equilPoints[2]),
      angle('a90Left', '', equilPoints[1], midPoint, equilPoints[0]),
      angle('a90', '', equilPoints[2], midPoint, equilPoints[1]),
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
      {
        name: 'split',
        method: 'line',
        options: {
          p2: midPoint,
          p1: equilPoints[1],
          width: 0.03,
          color: colors.sides,
        },
      },
      {
        name: 'tri',
        method: 'polyLine',
        options: {
          points: [midPoint, equilPoints[1], equilPoints[2]],
          width: 0.03,
          color: colors.sides,
          close: true,
        },
      },
    ],
    mods: {
      scenarios: {
        default: { position: [0, -0.6], rotation: 0 },
        side: { position: [0.5, -1.2], rotation: Math.PI / 2 },
      },
    },
  };

  layout.addElements = [
    equil,
    // eqn2,
  ];
  return layout;
}
