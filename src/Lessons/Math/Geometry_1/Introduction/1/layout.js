// @flow
import Fig from 'figureone';

const {
  Rect, Point,
} = Fig;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const colors = Fig.tools.color.getCSSColors(['circle', 'dimensions']);

  return {
    // Diagram
    limits: new Rect(-3, -2, 6, 4),

    // General
    linewidth: 0.03,

    wheelSize: 0.8,
    wheelPoints: 400,

    position: new Point(0, -0.6),

    colors,
  };
}
