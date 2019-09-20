// @flow
// import Fig from 'figureone';
import commonLessonLayout from '../../explanation/base/layout';

// const { Point, Transform, Line } = Fig.tools.g2;

// const cssColorNames = [
//   'latin',
//   'line',
// ];

/* eslint-disable key-spacing, comma-spacing, no-multi-spaces, space-in-parens */
export default function diagramLayout() {
  const layout: Object = commonLessonLayout();
  const { colors } = layout;
  const width = 0.02;
  const points = [
    [-1, -1],
    [0, 1],
    [1, -1],
  ];

  const angle = () => ({
    curve: {
      radius: 0.3,
      width,
      sides: 200,
    },
    autoRightAngle: false,
    color: colors.angles,
    label: {
      text: '',
      // precision: 0,
    },
  });

  const side = () => ({
    label: {
      text: '',
      offset: 0.1,
      location: 'outside',
      // precision: 1,
    },
  });

  layout.quizTriangle = {
    name: 'triangle',
    method: 'polyLine',
    options: {
      width,
      points,
      close: true,
      angle: [angle(), angle(), angle()],
      side: [side(), side(), side()],
      pad: {
        color: colors.diagram.background,
        isMovable: true,
      },
      color: colors.sides,
    },
    mods: {
      scenarios: {
        center: { position: [0, 0], scale: 1 },
        summary: { position: [0, 0], scale: 1 },
      },
    },
  };
  layout.addElementsQuiz = [
    layout.quizTriangle,
  ];
  return layout;
}
