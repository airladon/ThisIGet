// @flow
import Fig from 'figureone';
import commonLayout from '../../explanation/base/layout';

const { Point, Rect } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = commonLayout();
  const { colors } = layout;

  layout.bounds = new Rect(-2.5, -1.3, 5, 2.2);
  layout.minSide = 0.2;
  layout.width = 0.03;

  const line = (name, angle, position, location) => ({
    name,
    method: 'line',
    options: {
      color: colors.sides,
      width: layout.width,
      length: 1,
      vertexSpaceStart: 'start',
      angle,
      label: {
        text: '',
        location,
        offset: 0.1,
      },
      position,
      move: {
        type: 'translation',
      },
    },
    mods: {
      scenarios: {
        newProblem: { position },
      },
    },
  });

  layout.question = {
    name: 'question',
    method: 'text',
    options: {
      size: 0.18,
      style: 'normal',
      family: 'helvetica',
      xAlign: 'left',
      yAlign: 'baseline',
      text: '',
      color: colors.diagram.text.base,
      position: new Point(-2.7, 1.5),
    },
  };
  // const pad = name => ({
  //   name,
  //   method: 'polygon',
  //   options: {
  //     radius: 0.1,
  //     color: [1, 0, 0, 0],
  //     fill: true,
  //   },
  //   mods: {
  //     isTouchable: true,
  //     isMovable: true,
  //   },
  // });

  layout.addElementsQuiz = [
    line('left', Math.PI / 2, [-1, -0.5], 'left'),
    line('right', Math.PI / 2, [1, -0.5], 'right'),
    line('top', 0, [-1, 0.5], 'top'),
    line('bottom', 0, [-1 - layout.width / 2, -0.5], 'bottom'),
    layout.question,
  ];

  return layout;
}
