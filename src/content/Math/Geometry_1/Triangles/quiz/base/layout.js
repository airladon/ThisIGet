// @flow
// import Fig from 'figureone';
import commonLayout from '../../explanation/base/layout';

// const { Point, Transform, Line } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = commonLayout();
  layout.angleA.options.label.scale = 0.8;
  layout.angleB.options.label.scale = 0.8;
  layout.angleC.options.label.scale = 0.8;
  return layout;
}
