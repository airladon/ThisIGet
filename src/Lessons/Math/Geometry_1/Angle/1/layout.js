// @flow
import Fig from 'figureone';

const {
  Point, Rect,
} = Fig;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
const cssColorNames = [
  'lines',
  'corners',
  'moreSharp',
  'lessSharp',
  'anchor',
  'radius',
  'reference',
  'background',
  'arrow',
  'angle',
  'angleText',
  'latin',
  'arc',
  'circle',
  'dimensions',
];

export default function lessonLayout() {
  const colors = Fig.tools.color.getCSSColors(cssColorNames);

  return {
    // Diagram
    limits: new Rect(-3, -2, 6, 4),

    // General
    linewidth: 0.03,

    // ------ Circle Colleciton --------
    radius: 1.3,

    // Arrow
    arrow: {
      x: 1.1,
      width: 0.1,
      legWidth: 0.04,
      height: 0.1,
      legHeight: 0.04,
    },

    cornerLength: 0.5,
    angleRadius: 0.5,
    anchorPoints: 50,
    anglePoints: 400,

    circle: {
      center: new Point(0, -0.5),
    },

    // ------ Shapes Collection --------
    square: {
      center: new Point(-1.8, -0.8  + 0.8),
      radius: 0.5,
    },
    tri: {
      center: new Point(0, -0.98 + 0.8),
      radius: 0.65,
    },
    pent: {
      center: new Point(2, -0.8  + 0.8),
      vertices: [
        new Point(-0.5, -0.5),
        new Point(0.5, -0.2),
        new Point(0.3, 0.1),
        new Point(0.5, 0.5),
        new Point(-0.2, 0.4),
      ],
    },

    colors,
  };
}
