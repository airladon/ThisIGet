// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  // Transform,
  // Line,
} = Fig.tools.g2;

const cssColorNames = [
  'lines', 'angles', 'arc', 'marks',
];

const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  layout.position = new Point(0, 0);
  const radius = 1.4;
  const width = 0.03;

  layout.line1 = {
    name: 'line1',
    method: 'line',
    options: {
      length: radius,
      width,
      color: colors.lines,
      move: {
        type: 'rotation',
        middleLengthPercent: 0,
      },
    },
    mods: {
      interactiveLocation: new Point(radius * 0.8, 0),
    },
  };
  layout.line2 = {
    name: 'line2',
    method: 'line',
    options: {
      length: radius,
      width,
      color: colors.lines,
    },
  };
  layout.angle = {
    name: 'angle',
    method: 'angle',
    options: {
      curve: {
        width,
        sides: 400,
        radius: radius / 4,
      },
      color: colors.angles,
    },
  };
  layout.arc = {
    name: 'arc',
    method: 'polygon',
    options: {
      width,
      radius,
      color: colors.arc,
      sides: 400,
    },
  };

  const marks = (numMarks: number, inner: number = radius) => ({
    name: `marks${numMarks}`,
    method: 'radialLines',
    options: {
      innerRadius: inner,
      outerRadius: radius * 1.1,
      color: colors.marks,
      width: width / 2,
      dAngle: Math.PI * 2 / numMarks,
    },
  });
  layout.marks12 = marks(12);
  layout.marks100 = marks(100);
  layout.radians = joinObjects(marks(Math.PI * 2), { name: 'radians' });
  layout.degrees = {
    name: 'degrees',
    method: 'collection',
    addElements: [
      marks(360, radius * 1.05),
      marks(36),
    ],
  };
  layout.circle = {
    name: 'circle',
    method: 'collection',
    addElements: [
      layout.angle,
      layout.arc,
      layout.line2,
      layout.line1,
      layout.degrees,
    ],
  };

  layout.addElements = [
    layout.circle,
  ];
  return layout;
}
