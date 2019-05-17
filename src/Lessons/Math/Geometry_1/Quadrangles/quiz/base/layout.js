// @flow
import Fig from 'figureone';
import commonLessonLayout from '../../explanation/base/layout';

const { Rect } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function lessonLayout() {
  const layout: Object = commonLessonLayout();
  const { colors } = layout;
  layout.quizQuad = {
    name: 'quad',
    method: 'polyLine',
    options: {
      points: [[-1, -1], [-1, 1], [1, 1], [1, -1]],
      close: true,
      color: colors.sides,
      width: 0.02,
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: 0.01,
          sides: 100,
        },
        autoRightAngle: false,
        label: {
          radius: 0.27,
          text: null,
          scale: 0.7,
          precision: 0,
        },
      },
      pad: {
        color: colors.diagram.background,
        isMovable: true,
      },
    },
  };
  const min = 0.4;
  const width = 1.6;
  const height = 0.8;
  layout.quadrants = {
    quad1: new Rect(0, 0, width, height),
    quad2: new Rect(-min - width, min + height / 2, width, height / 2),
    quad3: new Rect(-min - width, -min - height, width, height),
    quad4: new Rect(min + width / 2, -min - height, width / 2, height),
  };
  layout.addElementsQuiz = [
    layout.quizQuad,
  ];
  return layout;
}
