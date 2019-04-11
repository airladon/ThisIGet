// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';

const {
  Point,
  Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'lines',
  'angle1',
  'angle2',
  'angle3',
  'disabled',
  'parallel',
  'pads',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.width = 0.03;
  const exampleTri = {
    method: 'polyLine',
    options: {
      width: layout.width,
      color: colors.lines,
      close: true,
    },
  };

  const tri1 = joinObjects({}, exampleTri, {
    name: 'tri1',
    options: {
      points: [
        [-0.5, -0.5],
        [0, 0.5],
        [0.5, -0.5],
      ],
      position: new Point(-1.7, 0),
    },
  });

  const tri2 = joinObjects({}, exampleTri, {
    name: 'tri2',
    options: {
      points: [
        [-0.5, -0.5],
        [0.5, 0.5],
        [0.5, -0.5],
      ],
      position: new Point(-0.15, 0),
    },
  });

  const tri3 = joinObjects({}, exampleTri, {
    name: 'tri3',
    options: {
      points: [
        [-0.3, -0.5],
        [-0.8, 0.5],
        [0.5, -0.5],
      ],
      position: new Point(1.7, 0),
    },
  });

  const triangleExamples = {
    name: 'examples',
    method: 'collection',
    addElements: [
      tri1,
      tri2,
      tri3,
    ],
  };

  // ////////////////////////////////////////////////////////
  //   Variable Triangle
  // ////////////////////////////////////////////////////////

  layout.customTriangle = {
    name: 'customTriangle',
    method: 'polyLine',
    options: {
      points: [
        [-1, -1],
        [0, 1],
        [1, -1],
      ],
      close: true,
      color: colors.lines,
      width: layout.width,
      pad: {
        color: colors.pads,
        radius: 0.2,
        sides: 30,
        fill: true,
        isMovable: true,
        touchRadius: 0.4,
        boundary: [-2.9, -1.9, 5.8, 3.3],
      },
      position: new Point(0, 0),
    },
  };

  layout.addElements = [
    triangleExamples,
    layout.customTriangle,
  ];


  return layout;
}
