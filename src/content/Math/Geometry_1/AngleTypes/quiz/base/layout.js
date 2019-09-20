// @flow
import Fig from 'figureone';
import commonLessonLayout from '../../explanation/base/layout';

const { Point } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = commonLessonLayout();

  layout.question = {
    name: 'question',
    method: 'text',
    options: {
      size: 0.2,
      style: 'normal',
      family: 'helvetica',
      hAlign: 'left',
      vAlign: 'baseline',
      text: '',
      color: layout.colors.diagram.text.base,
      position: new Point(-2, 1.5),
    },
  };
  layout.line2.options.color = layout.colors.axes;
  layout.fig.mods.scenarios.quiz = { position: new Point(0, 0), scale: 1.1 };
  layout.addQuestion = [
    layout.question,
  ];
  return layout;
}
