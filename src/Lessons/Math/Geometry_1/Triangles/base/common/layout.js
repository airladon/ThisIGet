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
  'angles',
  'disabled',
  'parallel',
  'pads',
  'sideLengths',
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
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: layout.width,
        },
        autoRightAngle: false,
      },
      side: {
        offset: 0.3,
        color: colors.sideLengths,
        showLine: true,
        width: layout.width / 2,
        vertexSpaceStart: 'center',
        arrows: {
          width: 0.08,
          height: 0.08,
        },
      },
    },
    mods: {
      _pad0: { scenarios: { props: { position: [2, -1.3] } } },
      _pad1: { scenarios: { props: { position: [-2, -1.3] } } },
      _pad2: { scenarios: { props: { position: [-1, 0.5] } } },
    },
  };

  layout.addElements = [
    triangleExamples,
    layout.customTriangle,
  ];
  return layout;
}
