// @flow
// import Fig from 'figureone';
import baseLayout from '../../../../../common/layout';
import './style.scss';

// const {
//   // Point,
//   // Transform,
//   // Line,
// } = Fig.tools.g2;

// const { joinObjects } = Fig.tools.misc;
// const { round } = Fig.tools.math;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = baseLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;

  layout.addElements = [
  ];
  return layout;
}
