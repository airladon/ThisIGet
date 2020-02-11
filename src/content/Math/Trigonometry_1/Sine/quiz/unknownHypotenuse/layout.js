// @flow
import Fig from 'figureone';
import commonLayout from '../../explanation/base/layout';

const {
  // Point, Transform, Line
  // Rect,
  Point,
} = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = commonLayout();
  const { colors } = layout;
  colors.sides = colors.get('blue').rgb;
  colors.angles = colors.get('red').rgb;
  layout.quiz.choice = new Point(2.02, -0.6);

  const angle = (text, radius) => ({
    color: colors.angles,
    curve: {
      radius,
      width: 0.015,
    },
    autoRightAngle: true,
    label: {
      text,
      // precision: 0,
      scale: 0.7,
    },
  });
  const tri = {
    name: 'tri',
    method: 'polyLine',
    options: {
      points: [
        [0, 0],
        [0, 1],
        [1, 1],
      ],
      color: colors.sides,
      width: 0.03,
      close: true,
      pad: {
        color: [0, 0, 0, 0.001],
        isMovable: true,
        sides: 4,
        radius: 0.1,
      },
      angle: [
        angle(null, 0.3),
        angle(null, 0.3),
        angle('', 0.3),
      ],
      // makeValid: { shape: 'triangle' },
      side: {
        label: {
          text: null,
          location: 'outside',
        },
      },
    },
  };

  layout.addElementsQuiz = [
    tri,
  ];
  return layout;
}
