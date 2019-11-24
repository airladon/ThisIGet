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
  // colors.dim = colors.get('grey', 'dark').rgb;
  // colors.working = colors.get('grey', 'dark').rgb;

  const side = 2.3;
  const height = side / Math.sqrt(2);
  const points = [
    new Point(-0.5 * side * Math.sqrt(2), -height / 3),
    new Point(0, height * 2 / 3),
    new Point(0.5 * side * Math.sqrt(2), -height / 3),
  ];

  const eqnD = ({
    elements: {
      A: { text: 'A', color: colors.sides },
      _2: { text: '2', color: colors.sides },
      r: { symbol: 'radical', color: colors.sides },
    },
    forms: {
      '0': {
        content: [{ root: ['_2', 'r'] }, 'A'],
        scale: 1,
        alignment: { alignV: -0.01, alignH: 0.2 },
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
      lineLabel('A1', '1A', points[0], points[1], 'top', 'left'),
      lineLabel('A2', '1A', points[1], points[2], 'top', 'right'),
      lineLabel('r2', eqnD, points[0], points[2], 'bottom', 'left', 0.2),
      angle('451', null, points[2], points[0], points[1], 0.3),
      angle('452', null, points[1], points[2], points[0], 0.3),
      angle('right', '', points[0], points[1], points[2], 0.3),
      {
        name: 'line',
        method: 'polyLine',
        options: {
          points,
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
