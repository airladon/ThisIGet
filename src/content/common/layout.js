// @flow
import Fig from 'figureone';
import { Colors } from '../../js/tools/colors';
// import { Rect, Point } from '../../js/diagram/tools/g2';
// import getCssColors from '../../js/tools/getCssColors';
// import angleCircleLayout from '../../../common/AngleCircle/layout';
// import { DiagramFont } from '../../js/diagram/DrawingObjects/TextObject/TextObject';

const { Rect, Point, DiagramFont } = Fig;
// const cssColorNames = [
//   'latin',
//   'line',
//   'angleA',
//   'angleB',
//   'disabled',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function baseLayout(cssColorNames: Array<string> = []) {
  // const colors = Fig.tools.color.getCSSColors(cssColorNames);
  const colors = new Colors();
  // if (colors.diagram == null) {
  //   colors.diagram = { text: { base: [1, 1, 1, 1] } };
  // } else if (colors.diagram.text == null) {
  //   colors.diagram.text = { base: [1, 1, 1, 1] };
  // } else if (colors.diagram.text.base == null) {
  //   colors.diagram.text.base = [1, 1, 1, 1];
  // }
  // console.log(colors)

  // let textColor = [1, 1, 1, 1];
  // if (colors.diagram.text != null) {
  //   textColor = colors.diagram.text.base;
  // }

  const layout = {
    limits: new Rect(-3, -2, 6, 4),
    linewidth: 0.03,
    position: new Point(0, 0),

    selector: {
      y: 1.7,
    },
    quiz: {
      check: new Point( 2.4, -1.7),
      input: new Point(2.4, -1.3),
      newProblem: new Point(2.4, -1.7),
      // check: new Point(0, -1.7),
      position: new Point(0, 0),
      answer: new Point(0, -1.7),
      nextSteps: new Point(0, -1.9),
      // newProblem: new Point(0, -1.7),
      showAnotherAnswer: new Point(1.1, -1.7),
      choice: new Point(2.02, -1.1),
    },

    defaultFont: new DiagramFont(
      'helvetica, sans-serif',
      'normal',
      0.2,
      '400',
      'center',
      'middle',
      colors.diagram.text.base.slice(),
    ),

    colors,
  };
  return layout;
}
