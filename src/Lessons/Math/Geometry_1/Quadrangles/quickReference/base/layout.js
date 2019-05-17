// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';
import './style.scss';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'qrQuadrangles_sides',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  const width = 0.03;
  const quad1 = {
    points: [
      new Point(-0.5, -0.4),
      new Point(-0.2, 0.7),
      new Point(0.6, 0.1),
      new Point(0.3, -0.6),
    ],
    position: new Point(-1.6, -0.2),
  };
  const quad2 = {
    points: [
      new Point(0.2, -0.6),
      new Point(0.6, 0.7),
      new Point(0.1, 0.1),
      new Point(-0.6, 0.4),
    ],
    position: new Point(0, -0.2),
  };
  const quad3 = {
    points: [
      new Point(-0.7, 0),
      new Point(0, -0.7),
      new Point(0.7, 0),
      new Point(0, 0.7),
    ],
    position: new Point(1.6, -0.2),
  };
  const quad = {
    method: 'polyLine',
    options: {
      width,
      close: true,
      color: colors.qrQuadrangles_sides,
    },
  };
  layout.quad1 = joinObjects({}, quad, {
    name: 'quad1',
    options: { points: quad1.points, position: quad1.position },
  });
  layout.quad2 = joinObjects({}, quad, {
    name: 'quad2',
    options: { points: quad2.points, position: quad2.position },
  });
  layout.quad3 = joinObjects({}, quad, {
    name: 'quad3',
    options: { points: quad3.points, position: quad3.position },
  });
  // const line = {
  //   method: 'line',
  //   options: {
  //     width: width / 2,
  //     color: colors.qrQuadrangles_sides,
  //   },
  // };
  // layout.line1 = joinObjects({}, line, {
  //   name: 'line1',
  //   options: {
  //     p1: quad1.points[1].add(quad1.position),
  //     p2: quad1.points[3].add(quad1.position),
  //   },
  // });
  // layout.line2 = joinObjects({}, line, {
  //   name: 'line2',
  //   options: {
  //     p1: quad2.points[2].add(quad2.position),
  //     p2: quad2.points[0].add(quad2.position),
  //   },
  // });
  // layout.line3 = joinObjects({}, line, {
  //   name: 'line3',
  //   options: {
  //     p1: quad3.points[3].add(quad3.position),
  //     p2: quad3.points[1].add(quad3.position),
  //   },
  // });
  layout.addElements = [
    layout.quad1,
    layout.quad2,
    layout.quad3,
    // layout.line1,
    // layout.line2,
    // layout.line3,
  ];
  return layout;
}
