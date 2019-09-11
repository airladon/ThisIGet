// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../LessonsCommon/layout';
import './style.scss';

const {
  Point,
  // Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

const cssColorNames = [
  'qrTriangles_lines',
  'qrTriangles_angle1',
  'qrTriangles_angle2',
  'qrTriangles_angle3',
  'qrTriangles_angles',
  'qrTriangles_disabled',
  'qrTriangles_parallel',
  'qrTriangles_pads',
  'qrTriangles_sideLengths',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = baseLayout(cssColorNames);
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;

  layout.width = 0.03;
  layout.defaultTri = [
    [2, -1.1],
    [-2, -1.1],
    [-1, 0.7],
  ];

  layout.fixedTriangle = {
    name: 'fixedTriangle',
    method: 'polyLine',
    options: {
      points: layout.defaultTri,
      close: true,
      color: colors.qrTriangles_lines,
      width: layout.width,
    },
  };

  // layout.fixedTriangleWindow = new Rect(-2.5, -1.7, 5, 3);
  layout.fixedTriangleCenter = new Point(0, -0.2);

  const angles = {
    method: 'angle',
    options: {
      curve: {
        width: layout.width,
        radius: 0.4,
        sides: 400,
      },
      label: {
        radius: 0.4,
        scale: 1,
      },
    },
  };

  layout.angleA = joinObjects({}, angles, {
    name: 'angleA',
    options: { color: colors.qrTriangles_angle1, label: { text: 'a' } },
  });

  layout.angleB = joinObjects({}, angles, {
    name: 'angleB',
    options: { color: colors.qrTriangles_angle2, label: { text: 'b' } },
  });

  layout.angleC = joinObjects({}, angles, {
    name: 'angleC',
    options: { color: colors.qrTriangles_angle3, label: { text: 'c' } },
  });

  layout.totalAngle = {
    name: 'totalAngle',
    method: 'collection',
    addElements: [
      layout.angleA,
      layout.angleB,
      layout.angleC,
      layout.fixedTriangle,
    ],
  };

  layout.addElements = [
    // triangleExamples,
    // layout.customTriangle,
    layout.totalAngle,
  ];
  return layout;
}
