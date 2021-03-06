// @flow
import Fig from 'figureone';
import commonLayout from '../../explanation/base/layout';

// const { Point, Transform, Line } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];
const { joinObjects } = Fig.tools.misc;

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = commonLayout();
  const { colors } = layout;
  const quizTri = {
    method: 'polyline',
    options: {
      points: [
        [0, 0],
        [0, 1.5],
        [1.5, 0],
      ],
      color: colors.sides,
      width: layout.width,
      close: true,
      pad: {
        color: [0, 0, 0, 0.001],
        // color: colors.angles,
        isMovable: true,
        sides: 4,
        radius: 0.1,
      },
      angle: {
        color: colors.angles,
        curve: {
          radius: 0.3,
          width: layout.width,
        },
        autoRightAngle: false,
        label: {
          text: null,
          precision: 0,
        },
      },
      side: {
        label: {
          text: null,
          location: 'outside',
        },
      },
    },
  };

  const tri1 = joinObjects({}, quizTri, { name: 'tri1' });
  const tri2 = joinObjects({}, quizTri, { name: 'tri2' });

  layout.addElementsQuiz = [
    tri1,
    tri2,
  ];

  return layout;
}
