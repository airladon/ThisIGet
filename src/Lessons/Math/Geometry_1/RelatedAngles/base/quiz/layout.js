// @flow
// import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

// const { Point } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  layout.minSeparation = 0.6;
  layout.maxSeparation = 1.5;

  return layout;
}
