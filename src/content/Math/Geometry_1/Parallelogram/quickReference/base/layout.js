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
  colors.dim = colors.get('grey', 'dark').rgb;
  colors.diagonal = colors.get('grey').rgb;

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

  // eslint-disable-next-line max-len
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
        width: 0.02,
        num,
        step: 0.04,
      },
      autoRightAngle: true,
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
      width: 0.02,
      step: 0.05,
      length: 0.15,
      num,
      rotation,
      position,
    },
  });

  const lMarks = (name, position, num, rotation) => ({
    name,
    method: 'marks',
    options: {
      color: colors.diagonal,
      width: 0.02,
      step: 0.05,
      length: 0.15,
      num,
      rotation,
      position,
    },
    mods: {
      pulseDefault: {
        scale: 3,
      },
    },
  });

  const dashed = (name, p1, p2) => ({
    name,
    method: 'line',
    options: {
      color: colors.diagonal,
      width: 0.02,
      p1,
      p2,
      dashStyle: {
        style: [0.05, 0.02],
      },
    },
  });

  const dim = (name, p1, p2, text) => ({
    name,
    method: 'line',
    options: {
      color: colors.dim,
      width: 0.02,
      p1,
      p2,
      arrows: {
        width: 0.08,
        height: 0.08,
      },
      label: {
        text,
        location: 'outside',
        offset: 0.05,
        scale: 1.2,
      },
      dashStyle: {
        style: [0.05, 0.02],
      },
      offset: 0.2,
    },
  });

  const label = (name, p1, p2, text) => ({
    name,
    method: 'line',
    options: {
      // showLine: false,
      width: 0.02,
      p1,
      p2,
      color: colors.sides,
      label: {
        text,
        location: 'outside',
        offset: 0.15,
        scale: 1.2,
      },
    },
  });

  const w = 0.03;
  const parallelogram = {
    name: 'pgram',
    method: 'collection',
    addElements: [
      {
        name: 'line',
        method: 'polyLine',
        options: {
          points,
          width: w * 1.5,
          close: true,
          color: colors.sides,
        },
      },
      angle('a1', points[1], points[0], points[3], ''),
      angle('a2', points[3], points[2], points[1], ''),
      angle('b1', points[2], points[1], points[0], '', 2, 0.3, colors.angles, 0.35),
      angle('b2', points[0], points[3], points[2], '', 2, 0.3, colors.angles, 0.35),
      pMarks('pMarkLeft', lineLeft.midPoint(), 2, angleA),
      pMarks('pMarkRight', lineRight.midPoint(), 2, angleA),
      pMarks('pMarkTop', lineTop.midPoint(), 1, 0),
      pMarks('pMarkBottom', lineBottom.midPoint(), 1, 0),
      lMarks('lMarkUp1', lineD1.pointAtPercent(0.25), 1, lineD1.angle()),
      lMarks('lMarkUp2', lineD1.pointAtPercent(0.75), 1, lineD1.angle()),
      lMarks('lMark21', lineD2.pointAtPercent(0.25), 2, lineD2.angle()),
      lMarks('lMark22', lineD2.pointAtPercent(0.75), 2, lineD2.angle()),
      dashed('diag1', lineD1.p1, lineD1.p2),
      dashed('diag2', lineD2.p2, lineD2.p1),
      label('labelA1', points[1], points[0], 'A'),
      label('labelA2', points[3], points[2], 'A'),
      label('labelB1', points[2], points[1], 'B'),
      label('labelB2', points[0], points[3], 'B'),
      dim('h', points[2], new Point(points[2].x, points[1].y), 'H'),
    ],
    options: {
      color: colors.sides,
    },
    mods: {
      scenarios: {
        default: { position: [0, -0.1], scale: 0.8 },
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
