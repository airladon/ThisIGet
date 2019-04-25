// @flow
import Fig from 'figureone';
import commonLessonLayout from '../common/layout';

const { Point, Transform, Line, Rect } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  const { colors } = layout;

  layout.bounds = new Rect(-2.5, -1.5, 5, 2.5);
  layout.minSide = 0.5;
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
        text: null,
        location,
        offset: 0.1,
      },
      position,
      move: {
        type: 'translation',
      },
    },
  });
  // const pad = (name, position) => ({
  //   name,
  //   method: 'polygon',
  //   options: {
  //     radius: 0.1,
  //     color: [1, 0, 0, 1],
  //     fill: true,
  //     position,
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
    line('bottom', 0, [-1, -0.5], 'bottom'),
    // pad('bottomLeft', [-1, -0.5]),
  ];

  return layout;
}
