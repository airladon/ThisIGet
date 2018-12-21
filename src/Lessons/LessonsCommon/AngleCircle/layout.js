// @flow
import Fig from 'figureone';

const { Rect, Point } = Fig;
const cssColorNames = [
  'anchor',
  'radius',
  'reference',
  'angle',
  'angleText',
  'circle',
  'arc',
  'radialLines',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function angleCircleLayout() {
  const colors = Fig.tools.color.getCSSColors(cssColorNames);

  return {
    // Diagram
    limits: new Rect(-3, -2, 6, 4),

    // General
    linewidth: 0.03,
    radialLineWidth: 0.01,

    // ------ Circle Colleciton --------
    radius: 1.2,
    angle: {
      radius: 0.5,
      arrow: {
        width: 0.1,
        height: 0.1,
      },
      lineWidth: 0.03,
    },
    axes: {
      length: 1.2,
    },
    circle: {
      angle: {
        small: 0.8,
        large: Math.PI * 1.4,
      },
      center: new Point(0, 0),
    },
    arc: {
      lineWidth: 0.03,
    },
    circumference: {
      lineWidth: 0.03,
    },
    angleRadius: 0.5,
    anchorPoints: 50,
    anglePoints: 400,
    circlePoints: 400,
    radialLineMajorOuter: 1.3,
    radialLineMajorInner: 1.1,
    radialLineMinorOuter: 1.3 ,
    radialLineMinorInner: 1.25,

    angleEqualsText: {
      left: new Point(0, 0),
      units: {
        deg: 0.45,
        text: 0.48,
      },
    },
    angleAnnotation: {
      arc: {
        lineWidth: 0.02,
        radius: 0.3,
        sides: 200,
      },
      label: {
        radiusOffset: 0.07,
        hideAngle: 0.15,
      },
    },
    colors,
  };
}
