// @flow
import Fig from 'figureone';
// import {
//   Point, Line, Transform,
// } from '../../../../../js/diagram/tools/g2';
// import getCssColors from '../../../../../js/tools/getCssColors';
import baseLayout from '../../../../LessonsCommon/layout';

const { Point, Transform, Line } = Fig.tools.g2;

const cssColorNames = [
  'equilLines',
  'equilAngles',
  'equalLength',
  'points',
  'construction',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  layout.colors.lines = layout.colors.equilLines;
  layout.colors.angles = layout.colors.equilAngles;

  // **********************************************************************
  // **********************************************************************
  // **********************************************************************
  // **********************************************************************
  // **********************************************************************
  // **********************************************************************
  const equilPoints = [
    new Point(-1, -1).add(0, 1 - Math.tan(Math.PI / 6)),
    new Point(1, -1).add(0, 1 - Math.tan(Math.PI / 6)),
    new Point(0, 0.732050).add(0, 1 - Math.tan(Math.PI / 6)),
  ];

  layout.equil = {
    position: new Point(0, 0),
    scenario: {
      center: { position: new Point(0, -(1 - Math.tan(Math.PI / 6))) },
    },
    tri: {
      points: equilPoints,
      width: 0.015,
      close: true,
      borderToPoint: 'alwaysOn',
      position: new Point(0, 0),
      color: layout.colors.lines,
    },
    sideLength: {
      color: layout.colors.lines,
      offset: 0.15,
      label: {
        text: 'A',
        location: 'outside',
        orientation: 'horizontal',
      },
      showLine: false,
    },
    side12: {
      p1: equilPoints[1],
      p2: equilPoints[0],
      color: layout.colors.lines,
    },
    side23: {
      p1: equilPoints[2],
      p2: equilPoints[1],
      color: layout.colors.lines,
    },
    side31: {
      p1: equilPoints[0],
      p2: equilPoints[2],
      color: layout.colors.lines,
    },
    angle: {
      curve: {
        radius: 0.2,
        sides: 150,
        width: 0.02,
      },
      label: {
        text: 'a',
        radius: 0.18,
      },
      color: layout.colors.angles,
    },
    angle1: {
      p1: equilPoints[1],
      p2: equilPoints[0],
      p3: equilPoints[2],
      // label: { text: ['a', '60º'] },
    },
    angle2: {
      p1: equilPoints[2],
      p2: equilPoints[1],
      p3: equilPoints[0],
    },
    angle3: {
      p1: equilPoints[0],
      p2: equilPoints[2],
      p3: equilPoints[1],
    },
    isoLines: {
      close: false,
      color: layout.colors.equalLength,
      width: 0.03,
      borderToPoint: 'never',
      transform: new Transform('iso').rotate(0).translate(0, 0),
    },
  };

  const { equil } = layout;
  layout.addEquilateralElements = [
    {
      name: 'tri',
      method: 'collection',
      options: {
        transform: new Transform('equil').translate(0, 0),
      },
      addElements: [
        ['', 'line', 'polyLine', equil.tri],
        ['', 'side12', 'line', [equil.sideLength, equil.side12]],
        ['', 'side23', 'line', [equil.sideLength, equil.side23]],
        ['', 'side31', 'line', [equil.sideLength, equil.side31]],
        ['', 'angle1', 'angle', [equil.angle, equil.angle1]],
        ['', 'angle2', 'angle', [equil.angle, equil.angle2]],
        ['', 'angle3', 'angle', [equil.angle, equil.angle3]],
        ['', 'isoLines', 'polyLine', [equil.tri, equil.isoLines]],
      ],
    },
  ];

  return layout;
}
