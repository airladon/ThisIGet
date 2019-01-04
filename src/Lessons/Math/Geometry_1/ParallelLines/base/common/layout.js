// @flow
import Fig from 'figureone';
import baseLayout from '../../../../LessonsCommon/layout';

const { Rect, Point } = Fig;

const cssColorNames = [
  'latin',
  'line',
  'angleA',
  'angleB',
  'angleC',
  'angleD',
  'disabled',
  'supplementary',
  'intersectingLine',
  'quizLine',
];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function commonLessonLayout() {
  const layout: Object = baseLayout();
  layout.colors = Fig.tools.color.getCSSColors(cssColorNames);
  const len = 1.7;
  layout.position = new Point(0, 0);
  layout.line = {
    length: {
      full: len,
      end: len / 3,
      middle: len / 3,
    },
    width: 0.02,
    boundary: new Rect(-3, -2, 6, 3.2),
  };
  layout.line1 = {
    position: new Point(0, 0.2),
    rotation: 0,
    scale: new Point(1, 1),
  };
  layout.line2 = {
    position: new Point(0, -0.4),
    rotation: 0,
    scale: new Point(1, 1),
  };
  layout.scale = {
    long: 2,
    short: 0.5,
  };
  return layout;
}
