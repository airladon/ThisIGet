// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';

const {
  Point,
  // Transform,
  Line,
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

  const angleA = Math.atan2(points[2].y - points[1].y, points[2].x - points[1].x);
  // const angleB = Math.PI - angleA;
  const lineLeft = new Line(points[0], points[3]);
  const lineRight = new Line(points[1], points[2]);
  const lineTop = new Line(points[2], points[3]);
  const lineBottom = new Line(points[0], points[1]);

  const lineD1 = new Line(points[0], points[2]);
  const lineD2 = new Line(points[1], points[3]);
  const center = lineD1.midPoint();

  const angle = (name, p1, p2, p3, text, num = 1, radius = 0.3, color = colors.angles, textRadius = radius * 0.9) => ({
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
        step: 0.03,
      },
      color,
      label: {
        text,
        radius: textRadius,
      },
    },
  });

  const pMarks = (name, position, num, rotation) => ({
    name,
    method: 'parallelMarks',
    options: {
      color: colors.sides,
      width: 0.01,
      step: 0.04,
      length: 0.1,
      num,
      rotation,
      position,
    },
  });

  const lMarks = (name, position, num, rotation) => ({
    name,
    method: 'marks',
    options: {
      color: colors.sides,
      width: 0.01,
      step: 0.04,
      length: 0.12,
      num,
      rotation,
      position,
    },
  });

  const dashed = (name, p1, p2) => ({
    name,
    method: 'line',
    options: {
      color: colors.sides,
      width: 0.01,
      p1,
      p2,
      dashStyle: {
        style: [0.05, 0.02],
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
      angle('b1', points[2], points[1], points[0], '180º-a', 2, 0.3, colors.angles, 0.35),
      angle('b2', points[0], points[3], points[2], '180º-a', 2, 0.3, colors.angles, 0.35),
      pMarks('pMarkLeft', lineLeft.midPoint(), 2, angleA),
      pMarks('pMarkRight', lineRight.midPoint(), 2, angleA),
      pMarks('pMarkTop', lineTop.midPoint(), 1, 0),
      pMarks('pMarkBottom', lineBottom.midPoint(), 1, 0),
      lMarks('lMarkUp1', lineD1.pointAtPercent(0.25), 1, lineD1.angle()),
      lMarks('lMarkUp2', lineD1.pointAtPercent(0.75), 1, lineD1.angle()),
      lMarks('lMark21', lineD2.pointAtPercent(0.25), 2, lineD2.angle()),
      lMarks('lMark22', lineD2.pointAtPercent(0.75), 2, lineD2.angle()),
      dashed('diag1', lineD1.p1, lineD1.p2),
      dashed('diag2', lineD2.p1, lineD2.p2),
      angle('c1', points[1], points[0], points[2], 'c', 3, 0.5, colors.angles2),
      angle('c2', points[3], points[2], points[0], 'c', 3, 0.5, colors.angles2),
      angle('d1', points[3], points[1], points[0], 'd', 4, 0.5, colors.angles2),
      angle('d2', points[1], points[3], points[2], 'd', 4, 0.5, colors.angles2),
    ],
    options: {
      color: colors.sides,
    },
    mods: {
      scenarios: {
        default: { position: [0, 0], scale: 1 },
      },
      pulseDefault: {
        scale: 1.1,
      },
    },
  };
  layout.addElements = [
    parallelogram,
  ];
  return layout;
}
