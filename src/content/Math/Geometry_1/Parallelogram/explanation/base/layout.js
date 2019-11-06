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
  colors.angles2 = colors.get('green').rgb;
  colors.dim = colors.get('grey', 'dark').rgb;

  const points = [
    new Point(-2, -1),
    new Point(1.3, -1),
    new Point(2, 1),
    new Point(-1.3, 1),
  ];

  const angleA = Math.atan2(points[2] - points[1], points[2] - points[1]);
  const angleB = Math.PI - angleA;

  const angle = (name, p1, p2, p3, text, num = 1, radius = 0.3, color = colors.angles) => ({
    name,
    method: 'angle',
    options: {
      p1,
      p2,
      p3,
      curve: {
        radius,
        sides: 100,
        width: 0.01,
        num,
        step: 0.05,
      },
      color,
      label: {
        text,
        radius: radius + 0.05 * (num - 1),
      },
    },
  });

  const w = 0.02;
  const parallelogram = {
    name: 'pgram',
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'polyLine',
        options: {
          points,
          width: w,
          close: true,
          color: colors.sides,
        },
      },
      angle('a1', points[1], points[0], points[3], 'a'),
      angle('a2', points[3], points[2], points[1], 'a'),
      angle('b1', points[2], points[1], points[0], '180º-a', 2),
      angle('b2', points[0], points[3], points[2], '180º-a', 2),
    ],
  };
  layout.addElements = [
    parallelogram,
  ];
  return layout;
}
