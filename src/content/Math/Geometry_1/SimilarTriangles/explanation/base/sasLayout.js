// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
//   Transform,
//   // Line,
} = Fig;

// const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  colors.small = colors.get('green').rgb;
  layout.width = 0.02;

  const points = [
    new Point(-1.2, -0.8).add(0.3, 0),
    new Point(0, 0.8).add(0.3, 0),
    new Point(0.3, -0.8).add(0.3, 0),
  ];
  const pointsSmall = [
    new Point(-0.72, -0.48).add(0.3, 0),
    new Point(0, 0.48).add(0.3, 0),
    new Point(0.18, -0.48).add(0.3, 0),
  ];

  const w = 0.06;
  const arrow = (name, p, color = colors.sides) => ({
    name,
    method: 'collection',
    addElements: [
      {
        name: '1',
        method: 'line',
        options: {
          // p1: [p[0] - w, p[1] - w], p2: p, width: 0.01, color,
          p1: [-w, -w], p2: [0, 0], width: 0.01, color,
        },
      },
      {
        name: '2',
        method: 'line',
        options: {
          // p1: [p[0] - w, p[1] + w], p2: p, width: 0.01, color,
          p1: [-w, w], p2: [0, 0], width: 0.01, color,
        },
      },
    ],
    options: {
      position: p,
    },
  });

  const side = text => ({
    label: {
      text,
      offset: 0.05,
      location: 'outside',
    },
  });

  const angle = (text, s = 1) => ({
    label: {
      text,
      offset: 0.01,
      scale: 0.6,
      // location: 'outside',
    },
    curve: {
      radius: 0.3 * s,
      width: 0.01,
      color: colors.angles,
    },
    color: colors.angles,
    sides: 100,
  });

  const tri = (name, p, sideA, sideB, sideC, color, defaultP, onP, s) => ({
    name,
    method: 'polyline',
    options: {
      points: p,
      color,
      close: true,
      width: 0.02,
      side: [
        side(sideA),
        side(sideB),
        side(sideC),
      ],
      angle: [
        angle(''),
        angle('', s),
        angle(''),
      ],
    },
    mods: {
      scenarios: {
        default: { scale: 1, position: defaultP },
        on: { scale: s, position: onP },
      },
      touchInBoundingRect: true,
    },
  });


  layout.addElements = [
    tri('tri2', points, 'sA', 'sB', 'sC', colors.sides, [1, 0], [0, 0], 1),
    tri('tri1', pointsSmall, 'A', 'B', 'C', colors.small, [-1, 0], [0.013, 0.315], 0.92),
    arrow('arrow2', [0.1, -0.8], colors.sides),
    arrow('arrow1', [0.1, -0.48 + 0.315 + 0.04], colors.small),
  ];

  return layout;
}
