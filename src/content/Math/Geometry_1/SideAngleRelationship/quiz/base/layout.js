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
  const { colors } = layout;

  layout.quiz.choice = new Point(2.12, -0.85);

  layout.addElementsQuiz = [
    {
      name: 'fig',
      method: 'collection',
      addElements: [
        {
          name: 'tri',
          method: 'polyLine',
          options: {
            width: 0.03,
            color: colors.sides,
            close: true,
            points: [[-1, -1], [0, 1], [1, -1]],
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
            side: {
              label: {
                text: '',
              },
            },
            pad: {
              color: [0, 0, 0, 0.01],
              isMovable: true,
            },
          },
        },
      ],
    },
  ];

  return layout;
}
