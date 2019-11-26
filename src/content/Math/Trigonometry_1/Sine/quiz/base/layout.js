// @flow
// import Fig from 'figureone';
import commonLayout from '../../explanation/base/layout';

// const {
//   // Point, Transform, Line
//   Rect,
// } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = commonLayout();
  const { colors } = layout;
  layout.addElementsQuiz = [
  ];

  return layout;
}
