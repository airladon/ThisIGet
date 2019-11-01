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

  const side = text => ({
    label: {
      text,
      offset: 0.05,
      location: 'outside',
    },
  });

  const angle = text => ({
    label: {
      text,
      offset: 0.01,
      scale: 0.6,
      // location: 'outside',
    },
    curve: {
      radius: 0.2,
      width: 0.01,
      color: colors.angles,
    },
    color: colors.angles,
    sides: 100,
  });

  const tri = (name, p, sideA, sideB, color, defaultP, onP) => ({
    name,
    method: 'polyLine',
    options: {
      points: p,
      color,
      close: true,
      width: 0.02,
      side: [
        side(sideA),
        side(sideB),
        side(''),
      ],
      angle: [
        angle(''),
        angle(''),
        angle(''),
      ],
    },
    mods: {
      scenarios: {
        default: { scale: 1, position: defaultP },
        on: { scale: 1, position: onP },
      },
      touchInBoundingRect: true,
    },
  });


  layout.addElements = [
    tri('tri1', points, 'A', 'B', colors.sides, [-1, 0], [0, 0]),
    tri('tri2', pointsSmall, 'A', 'B', colors.small, [1, 0], [0, 0]),
  ];

  return layout;
}
