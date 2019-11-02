// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  Point,
//   // Transform,
//   // Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue', 'base').rgb;
  colors.angles = colors.get('red').rgb;

  const points1 = [
    new Point(-1.7, 0),
    new Point(-0.2, 0.8),
    new Point(0.3, 0),
  ];
  // const points2 = [
  //   new Point(-0.72, -0.48).add(0.3, 0),
  //   new Point(0, 0.48).add(0.3, 0),
  //   new Point(0.18, -0.48).add(0.3, 0),
  // ];
  const s = 1.5;
  const points2 = points1.map(p => new Point(p.x * s, p.y * s));

  const side = text => ({
    label: {
      text,
      offset: 0.05,
      location: 'outside',
      scale: 0.9,
    },
  });

  const angle = (text, radius = 0.2) => ({
    label: {
      text,
      offset: 0.01,
      scale: 0.9,
      // location: 'outside',
    },
    curve: {
      radius,
      width: 0.01,
      color: colors.angles,
      sides: 100,
    },
    color: colors.angles,
  });

  const tri = (name, p, a, b, c, defaultPos) => ({
    name,
    method: 'polyLine',
    options: {
      points: p,
      color: colors.sides,
      close: true,
      width: 0.02,
      side: [
        side(a),
        side(c),
        side(b),
      ],
      angle: [
        angle('c', 0.5),
        angle('b', 0.2),
        angle('a', 0.2),
      ],
      // position: defaultPos,
    },
    mods: {
      scenarios: {
        default: { scale: 1, position: defaultPos },
      },
    },
  });

  layout.addElements = [
    tri('tri1', points1, 'A', 'B', 'C', [-0.9, -0.6]),
    tri('tri2', points2, 'sA', 'sB', 'sC', [1.7, -1.5]),
  ];

  return layout;
}
