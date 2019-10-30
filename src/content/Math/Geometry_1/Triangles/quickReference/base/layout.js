// @flow
import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

const {
  Point,
  // Rect,
  // Transform,
  // Line,
} = Fig.tools.g2;

const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  // layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const { colors } = layout;
  colors.qrTriangles_lines = colors.get('blue').rgb;
  colors.qrTriangles_sideLengths = colors.get('yellow').rgb;
  colors.qrTriangles_angles = colors.get('green').rgb;
  colors.qrTriangles_angle1 = colors.get('green').rgb;
  colors.qrTriangles_angle2 = colors.get('red').rgb;
  colors.qrTriangles_angle3 = colors.get('yellow').rgb;
  colors.qrTriangles_disabled = colors.get('grey', 'darker').rgb;
  colors.qrTriangles_parallel = colors.get('red').rgb;
  colors.qrTriangles_pads = colors.get('red', 'lighter').rgb;
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

  const eqn = {
    name: 'eqn',
    method: 'addEquation',
    options: {
      elements: {
        a: { color: colors.qrTriangles_angle1 },
        b: { color: colors.qrTriangles_angle2 },
        c: { color: colors.qrTriangles_angle3 },
        plus1: { text: ' + ' },
        plus2: { text: ' + ' },
        equals: { text: ' = ' },
        _180: { text: '180º' },
      },
      color: colors.diagram.text.base,
      scale: 1.4,
      forms: {
        '0': ['a', 'plus1', 'b', 'plus2', 'c', 'equals', '_180'],
      },
    },
    mods: {
      scenarios: {
        default: { position: [0.5, 0.5] },
      },
    },
  };

  layout.addElements = [
    // triangleExamples,
    // layout.customTriangle,
    layout.totalAngle,
    eqn,
  ];
  return layout;
}
