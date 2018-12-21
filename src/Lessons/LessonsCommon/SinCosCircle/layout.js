// @flow
import Fig from 'figureone';
import angleCircleLayout from '../AngleCircle/layout';

const { Point, Rect } = Fig;
const cssColorNames = [
  'disabled',
  'quadrant',
  'axes',
  'sine',
  'cosine',
  'quadAngles',
  'arcLight',
  'angleDark',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function sinCosCircleLayout() {
  const colors = Fig.tools.color.getCSSColors(cssColorNames);
  const layout: Object = angleCircleLayout();
  layout.colors = Object.assign(colors, layout.colors);
  layout.circle.right = new Point(1.4, -0.2);
  layout.circle.bottomRight = new Point(1.4, 0);
  layout.angleEqualsText.bottomRight = new Point(1.42, -1.7);
  // layout.angleEqualsText.bottomRight2 = new Point(1, -1.5);
  layout.axes = {
    length: 1.3,
  };

  layout.sine = {
    lineWidth: 0.01,
  };
  layout.cosine = {
    lineWidth: 0.01,
  };
  layout.quadAngles = {
    lineWidth: 0.01,
    radius: 0.4,
  };
  layout.textYLimit = 0.07;
  layout.textXLimit = 0.07;
  layout.mainAngle = {
    radius: 0.2,
    lineWidth: 0.02,
    textOffset: 0.07,
  };
  layout.unitsSelector = {
    position: new Point(0, -1.9),
  };
  layout.circumference.lineWidth = 0.01;

  layout.grid = {
    width: layout.radius * 2,
    height: layout.radius * 2,
    range: new Rect(-1, -1, 2, 2),
    step: 0.2,
    position: new Point(-layout.radius, -layout.radius),
  };

  layout.quadEqn = {
    position: new Point(-1.3, -1.35),
  };

  layout.bow = {
    lineWidth: 0.05,
    angle: Math.PI / 2,
  };
  return layout;
}
