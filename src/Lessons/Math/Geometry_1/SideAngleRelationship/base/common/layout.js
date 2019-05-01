// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  Line,
} = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'sides',
  'angles',
  'equalSide',
  'isosceles',
  'fill',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  const triPoints = [
    new Point(-2, -1),
    new Point(-1.5, 0.6),
    new Point(0.7, -1),
  ];

  const leftLine = new Line(triPoints[0], triPoints[1]);
  const rightLine = new Line(triPoints[1], triPoints[2]);
  const isoscelesPoint = new Point(
    triPoints[1].x + leftLine.distance * Math.cos(rightLine.angle()),
    triPoints[1].y + leftLine.distance * Math.sin(rightLine.angle()),
  );
  const isoscelesBase = new Line(triPoints[0], isoscelesPoint);

  const width = 0.04;
  const angle = (text, radius = 0.3) => ({
    color: colors.angles,
    curve: {
      radius,
      width: 0.015,
    },
    label: {
      text,
      radius: radius - 0.05,
    },
  });
  const side = text => ({
    label: {
      text,
      location: 'outside',
      offset: 0.05,
    },
  });

  const sideDash = text => ({
    label: {
      text,
      // location: 'outside',
      offset: 0,
      orientation: 'baseToLine',
    },
  });

  const tri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      color: colors.sides,
      width,
      close: true,
      points: triPoints,
      angle: [
        angle('b'),
        angle('c'),
        angle('a'),
      ],
      side: [
        side('A'),
        side('B'),
        side('C'),
      ],
    },
  };

  // const isoscelesEqualSide = {
  //   name: 'isoscelesEqualSide',
  //   method: 'line',
  //   options: {
  //     color: colors.equalSide,
  //     position: triPoints[1],
  //     angle: rightLine.angle(),
  //     length: leftLine.distance,
  //     width,
  //   },
  // };

  const isosceles = {
    name: 'isosceles',
    method: 'polyLine',
    options: {
      color: colors.isosceles,
      width: width / 3,
      close: true,
      points: [
        triPoints[0],
        triPoints[1],
        isoscelesPoint,
      ],
      angle: [
        angle('m', 0.55),
        angle('', 0),
        angle('n', 0.3),
      ],
      side: [
        sideDash('|'),
        sideDash('|'),
        sideDash(''),
      ],
    },
    mods: {
      scenarios: {
        default: { position: [-0.045, -0.017], scale: 0.96 },
      },
    },
  };

  const lowerAngle = {
    name: 'lowerAngle',
    method: 'angle',
    options: {
      curve: {
        radius: 0.57,
        width: 0.014,
        sides: 200,
      },
      label: {
        text: 'o',
      },
      color: colors.angle,
      position: triPoints[0],
      angle: isoscelesBase.angle(),
    },
  };

  const lowerTriangle = {
    name: 'lowerTriangle',
    method: 'fan',
    options: {
      fill: true,
      color: colors.fill,
      points: [triPoints[0], isoscelesPoint, triPoints[2]],
    },
  };

  const fig = {
    name: 'fig',
    method: 'collection',
    addElements: [
      lowerTriangle,
      lowerAngle,
      tri,
      isosceles,
    ],
  };

  layout.addElements = [
    fig,
  ];
  return layout;
}
